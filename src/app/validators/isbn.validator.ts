import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function validISBNValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    let isbnString = control.value;

    if (!isbnString) {
        return null;
    }

    isbnString = isbnString.replaceAll('-', '').trim();

    if (/[^0-9]/.test(isbnString)) {
      return { isbnInvalid: true, errorMessage: "L'isbn ne doit être composé que de chiffres" };
    }

    if (isbnString.length != 13) {
      return { isbnInvalid: true, errorMessage: "L'isbn doit faire 13 chiffres" };
    }

    let numberArray = isbnString.substring(0, 12).split('').map((s: string) => parseInt(s));
    let sumOdd = numberArray.map((nb: number, i: number) => i % 2 == 0 ? nb : 0).reduce((acc: number, current: number) => acc += current, 0);
    let sumEven = numberArray.map((nb: number, i: number) => i % 2 == 1 ? nb : 0).reduce((acc: number, current: number) => acc += current, 0);
    let verif = 10 - ((sumEven * 3 + sumOdd) % 10);

    return verif != isbnString[12] ? { isbnInvalid: true, errorMessage: "isbn non valide" } : null;
  }
}