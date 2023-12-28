import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  specialtiesList: string[] = [
    'Clínica Geral',
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Otorrinolaringologia',
    'Neurologia',
    'Oftalmologia',
  ];
}
