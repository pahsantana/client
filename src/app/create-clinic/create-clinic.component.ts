import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from '../_services/clinic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clinic } from '../interfaces/clinic.model';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClinicSharedService } from '../_services/clinic-shared.service';
import { SpecialtiesService } from '../_services/specialties.service';
import { RegionService } from '../_services/region.service';

@Component({
  selector: 'app-create-clinic',
  templateUrl: './create-clinic.component.html',
  styleUrl: './create-clinic.component.css'
})
export class CreateClinicComponent {

  constructor(
    private clinicService: ClinicService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private clinicSharedService: ClinicSharedService,
    private specialtiesService: SpecialtiesService,
    private regionService: RegionService
  ) { } 

  formData = new FormGroup({
    name: new FormControl<string>('', [Validators.required,Validators.maxLength(10)]),
    socialReason: new FormControl<string>('', [Validators.required]),
    cnpj: new FormControl<string>(''),
    specialties: new FormControl<string>(''),
    region: new FormControl<string>(''),
    inaugurationDate: new FormControl<string>(''),
    isActive: new FormControl<boolean>(false),
  });
  specialtiesList: string[] = [];
  regions: { value: string; label: string }[] = [];

  ngOnInit() {
    this.regions = this.regionService.regions;
    this.specialtiesList = this.specialtiesService.specialtiesList;
  }
  submitForm() {
    const clinicData: Clinic = {
    name: this.formData.value.name || '', 
    cnpj: this.formData.value.cnpj || '',
    socialReason: this.formData.value.socialReason || '', 
    specialties: this.formData.value.specialties || '', 
    region: this.formData.value.region || '', 
    inaugurationDate: this.formData.value.inaugurationDate || '', 
    active: this.formData.value.isActive || false,
    };

    this.clinicService.createClinic(clinicData).subscribe(
      (_) => {
        this.openSnackBar('Entity criada com sucesso', 'OK', 'success-snackbar');
        this.clinicSharedService.setClinic(clinicData);
        setTimeout(() => {
          this.router.navigate(['/view-clinic']);
        }, 2000);
      },
      (error) => {
        this.openErrorDialog(error);
      }
    );
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [className]
    });
  }

  openErrorDialog(error: any) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'Erro ao salvar',
        tooltip: 'Detalhes do erro',
        status: error.status || 'N/A',
        errorMessage: error.error.message || 'Ocorreu um erro inesperado.',
      },
    });
  }

  cancel() {
    this.router.navigate(['/list-clinic']);
  }

  getSpecialtiesControl() {
    return this.formData.get('specialties') as FormControl;
  }
  
  getSpecialtiesValue() {
    const control = this.getSpecialtiesControl();
    return control ? control.value : null;
  }
}
