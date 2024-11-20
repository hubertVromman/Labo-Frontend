import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validPriceValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (typeof value != 'number') {
          return null;
      }

      console.log(value);

      return value <= 0 ? { priceNegative: true, errorMessage: 'Prix négatif' } : null;
  }
}
