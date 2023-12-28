import { Component } from '@angular/core';
import { Clinic } from '../interfaces/clinic.model';
import { ClinicSharedService } from '../_services/clinic-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-clinic',
  templateUrl: './view-clinic.component.html',
  styleUrl: './view-clinic.component.css'
})
export class ViewClinicComponent {
  clinic: Clinic = { 
    name: '',
    cnpj: '',
    socialReason: '',
    specialties: '',
    region: '',
    inaugurationDate: '',
    active: false
  };

  constructor(private clinicSharedService: ClinicSharedService, private router: Router) { }

  ngOnInit() {
    this.clinicSharedService.currentClinic.subscribe(clinic => {
      this.clinic = clinic || this.clinic;
    });
  }

  
getSpecialtiesDisplay(specialties: string | string[]): string {
  if (Array.isArray(specialties)) {
    return specialties.slice(0, 3).join(', ') + (specialties.length > 3 ? ` +${specialties.length - 3}` : '');
  } else {
    return specialties;
  }
}

back():void{
  this.router.navigate(['/list-clinic']);
}


  editClinic(): void {
    this.clinicSharedService.setClinic(this.clinic);
    this.router.navigate(['/edit-clinic']);
  }
}

 
