import { Injectable } from '@angular/core';
import { Commande } from '../models/commande.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  commandes: Commande[] = [];
  commandesSubject: BehaviorSubject<Commande[]> = new BehaviorSubject<Commande[]>(this.commandes);

  constructor() { }

  ajouterArticle(bibliothequeId: number, livreId: number, type = 'pret', quantite: number = 1) {
    if (quantite < 1)
      console.log("quantite impossible");
    const index = this.commandes.findIndex(c => c.bibliothequeId == bibliothequeId && c.type == type);
    if (index == -1) {
      this.commandes.push({
        bibliothequeId,
        livreIdQuantite: { [livreId]: quantite },
        type
      })
    } else {
      if (isNaN(this.commandes[index].livreIdQuantite[livreId]))
        this.commandes[index].livreIdQuantite[livreId] = quantite
      else
        this.commandes[index].livreIdQuantite[livreId] += quantite;
    }
    this.commandesSubject.next(this.commandes)
  }
}
