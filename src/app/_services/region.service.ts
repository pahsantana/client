import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  regions = [
    { value: 'Alto_tiete', label: 'Alto tietê' },
    { value: 'Interior', label: 'Interior' },
    { value: 'ES', label: 'ES' },
    { value: 'SP_Interior', label: 'SP Interior' },
    { value: 'SP', label: 'SP' },
    { value: 'SP2', label: 'SP2' },
    { value: 'MG', label: 'MG' },
    { value: 'Nacional', label: 'Nacional' },
    { value: 'SP_CAV', label: 'SP CAV' },
    { value: 'RJ', label: 'RJ' },
    { value: 'SP2', label: 'SP2' },
    { value: 'SP1', label: 'SP1' },
    { value: 'NE1', label: 'NE1' },
    { value: 'NE2', label: 'NE2' },
    { value: 'SUL', label: 'SUL' },
    { value: 'Norte', label: 'Norte' },
  ];
}
