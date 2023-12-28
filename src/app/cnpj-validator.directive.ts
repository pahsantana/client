import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjValidator][ngModel],[appCnpjValidator][formControl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CnpjValidatorDirective),
      multi: true,
    },
  ],
})
export class CnpjValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const cnpj = control.value;

    if (this.isValidCnpj(cnpj)) {
      return null; 
    } else {
      return { 'invalidCnpj': true }; 
    }
  }

  private isValidCnpj(cnpj: string): boolean {
    const regex = /^\d{14}$/;
    return regex.test(cnpj);
  }
}
