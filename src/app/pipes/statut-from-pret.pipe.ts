import { Pipe, PipeTransform } from '@angular/core';
import { Pret } from '../models/pret.model';

@Pipe({
  name: 'statutFromPret',
  standalone: true
})
export class StatutFromPretPipe implements PipeTransform {

  transform(pret: Pret, ...args: unknown[]): string {
    if (pret.estRendu)
      return 'rendu';
    if (pret.dateFin < new Date())
      return 'en retard';
    return 'pas encore rendu';
  }
}
