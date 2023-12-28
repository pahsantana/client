import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment.development';
import { Clinic } from '../interfaces/clinic.model';
import { AuthService } from './auth.service';

const CLINIC_API = environment.apiURL + '/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  createClinic(clinic: Clinic): Observable<Clinic> {
    return this.http.post<Clinic>(CLINIC_API, clinic, this.getHttpOptions());
  }

  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(CLINIC_API, this.getHttpOptions());
  }

  editClinic(clinic: Clinic): Observable<Clinic> {
    const editUrl = `${CLINIC_API}/${clinic.id}`;
    return this.http.put<Clinic>(editUrl, clinic, this.getHttpOptions());
  }

  deleteClinic(clinic: Clinic): Observable<Clinic> {
    const deleteUrl = `${CLINIC_API}/${clinic.id}`;
    return this.http.delete<Clinic>(deleteUrl, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return httpOptions;
  }
}
