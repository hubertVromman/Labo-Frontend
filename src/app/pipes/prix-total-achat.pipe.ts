import { Pipe, PipeTransform } from '@angular/core';
import { Achat } from '../models/achat.model';

@Pipe({
  name: 'prixTotalAchat',
  standalone: true
})
export class PrixTotalAchatPipe implements PipeTransform {

  transform(achat: Achat, ...args: unknown[]): number {
    return achat.venteLivre.map(vl => vl.livre.prixVente * vl.quantite).reduce((acc, current) => acc + current, 0);
  }

}
