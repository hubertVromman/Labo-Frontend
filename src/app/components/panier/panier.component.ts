import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Commande } from '../../models/commande.model';
import { TitreFromLivreIdPipe } from "../../pipes/titre-from-livre-id.pipe";
import { PanierService } from '../../services/panier.service';
import { PrixFromLivreIdPipe } from "../../pipes/prix-from-livre-id.pipe";
import { MultiplyPipe } from "../../pipes/mutliply.pipe";
import { LivreService } from '../../services/livre.service';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [TableModule, AsyncPipe, TitreFromLivreIdPipe, ButtonModule, PrixFromLivreIdPipe, MultiplyPipe, CurrencyPipe, InputNumberModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {
  commandesEmprunt: Commande[] = [];
  commandesAchat: Commande[] = [];
  commandes: Commande[] = [];
  listeAchat: any[] = [];
  listePret: any[] = [];
  totalPrice: number = 0;
  
  constructor(private _ps: PanierService, private _ls: LivreService) {
    this._ps.commandesSubject.subscribe({
      next: (data) => {
        this.commandesEmprunt = data.filter(c => c.type == 'pret');
        this.commandesAchat = data.filter(c => c.type == 'vente');
        this.commandes = data;
        this.listeAchat = Object.entries(this.commandesAchat[0]?.livreIdQuantite ?? [])
        this.listePret = Object.entries(this.commandesEmprunt[0]?.livreIdQuantite ?? []);
        this.totalPrice = 0;
        this.listeAchat?.forEach(achat => {
          this._ls.get(achat[0]).subscribe({
            next: data => this.totalPrice += data.prixVente * achat[1]
          })
        });
      }
    });
  }

  executeCommand(commandType: string) {
    let result;
    let totalPrice : number | undefined;
    if (commandType == 'pret' && this.commandesEmprunt[0] != undefined) {
      result = this._ps.commander(this.commandesEmprunt[0], commandType);
    } else if (commandType == 'vente' && this.commandesAchat[0] != undefined) {
      totalPrice = this.totalPrice;
      result = this._ps.commander(this.commandesAchat[0], commandType);
    } else {
      alert("Commande vide");
      return
    }
    result.subscribe({
      next: data => {
        this.vider(commandType);
        if (totalPrice) {
          alert(`Veuillez payer ${totalPrice} euro sur le compte BE90 0016 4905 1732 pour valider votre commande.`);
        } else
          alert("Commande effectuée");
      },
      error: error => alert(error.error)
    });
  }

  vider(commandType: string) {
    this._ps.vider(commandType)
  }
 
  diminuerQuantite(bibliothequeId: number, livreId: number, type: string) {
    this._ps.ajouterArticle(bibliothequeId, livreId, type, -1)
  }

  ajouterQuantite(bibliothequeId: number, livreId: number, type: string) {
    this._ps.ajouterArticle(bibliothequeId, livreId, type, 1)
  }

  supprimerDuPanier(bibliothequeId: number, livreId: number, type: string) {
    this._ps.retirerArticle(bibliothequeId, livreId, type);
  }
}
