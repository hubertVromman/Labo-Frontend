import { Injectable } from '@angular/core';
import { Commande } from '../models/commande.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  url: string = environment.apiUrl;

  commandes: Commande[] = [];
  commandesSubject: BehaviorSubject<Commande[]> = new BehaviorSubject<Commande[]>(this.commandes);

  constructor(private _client: HttpClient) { }

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
      if (this.commandes[index].livreIdQuantite[livreId] < 0)
        this.commandes[index].livreIdQuantite[livreId] = 0;
    }
    this.commandesSubject.next(this.commandes)
  }

  commander(commande: Commande, commandType: string) {
    return this._client.post<number>(`${this.url}/${commandType}`, commande);
  }

  vider(commandType: string) {
    this.commandes = this.commandes.filter(c => c.type != commandType);
    this.commandesSubject.next(this.commandes)
  }

  retirerArticle(bibliothequeId: number, livreId: number, type: string) {
    const index = this.commandes.findIndex(c => c.bibliothequeId == bibliothequeId && c.type == type);
    delete this.commandes[index].livreIdQuantite[livreId];
    this.commandesSubject.next(this.commandes);
  }
}
