import { Component, OnInit } from '@angular/core';
import { ClinicSharedService } from '../_services/clinic-shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClinicService } from '../_services/clinic.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SpecialtiesService } from '../_services/specialties.service';
import { RegionService } from '../_services/region.service';

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.css']
})
export class EditClinicComponent implements OnInit {
  formData: FormGroup;
  specialtiesList: string[] = [];
  regions: { value: string; label: string }[] = [];

  constructor(
    private clinicSharedService: ClinicSharedService, 
    private clinicService: ClinicService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private specialtiesService: SpecialtiesService,
    private regionService: RegionService,) {
    this.formData = new FormGroup({
      id: new FormControl<number>(0),
      name: new FormControl<string>('', [Validators.required, Validators.maxLength(10)]),
      socialReason: new FormControl<string>('', [Validators.required]),
      cnpj: new FormControl<string[]>([]),
      specialties: new FormControl<string[]>([]),
      region: new FormControl<string>(''),
      inaugurationDate: new FormControl<string>(''),
      active: new FormControl<boolean>(false),
    });
  }

  ngOnInit() {
    this.regions = this.regionService.regions;
    this.specialtiesList = this.specialtiesService.specialtiesList;
    this.clinicSharedService.currentClinic.subscribe(clinic => {
      if (clinic) {
        this.formData.patchValue({
          id: clinic.id,
          name: clinic.name,
          socialReason: clinic.socialReason,
          cnpj: clinic.cnpj,
          specialties: clinic.specialties,
          region: clinic.region,
          inaugurationDate: clinic.inaugurationDate,
          active: clinic.active,
        });
      }
    });

    this.setDefaultSelectedSpecialties();
  }

  submitForm() {
    const formData = this.formData.value;

    this.clinicService.editClinic(formData).subscribe(
      (_) => {
        this.openSnackBar('Entity editada com sucesso', 'OK', 'success-snackbar');
        this.clinicSharedService.setClinic(formData);
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
        title: 'Erro ao salvar/editar',
        tooltip: 'Detalhes do erro',
        status: error.status || 'N/A',
        errorMessage: error.error.message || 'Ocorreu um erro inesperado.',
      },
    });
  }

  cancel() {
    this.router.navigate(['/list-clinic']);
  }

  private setDefaultSelectedSpecialties() {
    const selectedSpecialties = this.formData.get('specialties')?.value || [];
    this.specialtiesService.specialtiesList.forEach(specialty => {
      if (selectedSpecialties.includes(specialty)) {
        this.formData.get('specialties')?.setValue([...selectedSpecialties, specialty]);
      }
    });
  }  

  getSelectedSpecialtiesText(): string {
    const selectedSpecialties = this.formData.get('specialties')?.value || [];
    if (selectedSpecialties.length <= 2) {
      return selectedSpecialties.join(', ');
    } else {
      return selectedSpecialties.slice(0, 2).join(', ') + ` +${selectedSpecialties.length - 2}`;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Confirmação', message: 'Deseja realmente excluir esta clínica?' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = this.formData.value;
  
        this.clinicService.deleteClinic(formData).subscribe(
          (_) => {
            this.openSnackBar('Entity excluída com sucesso', 'OK', 'success-snackbar');
            this.router.navigate(['/list-clinic']);
          },
          (error) => {
            this.openErrorDialog(error);
          }
        );
      }
    });
  }
}