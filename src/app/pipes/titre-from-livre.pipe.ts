import { Pipe, PipeTransform } from '@angular/core';
import { Livre } from '../models/livre.model';

@Pipe({
  name: 'titreFromLivre',
  standalone: true
})
export class TitreFromLivrePipe implements PipeTransform {

  transform(value: Livre | null, ...args: unknown[]): string | undefined {
    return value?.titre;
  }

}
