import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Clinic } from '../interfaces/clinic.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicSharedService {
  private clinicSource = new BehaviorSubject<Clinic | null>(null);
  currentClinic = this.clinicSource.asObservable();

  setClinic(clinic: Clinic) {
    this.clinicSource.next(clinic);
  }

  getClinic(): Clinic | null {
    return this.clinicSource.getValue();
  }
}
