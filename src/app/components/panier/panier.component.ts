import { Component } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { PanierService } from '../../services/panier.service';
import { TableModule } from 'primeng/table';
import { LivreFromIdPipe } from "../../pipes/livre-from-id.pipe";
import { TitreFromLivrePipe } from "../../pipes/titre-from-livre.pipe";
import { AsyncPipe } from '@angular/common';
import { TitreFromLivreIdPipe } from "../../pipes/titre-from-livre-id.pipe";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [TableModule, LivreFromIdPipe, TitreFromLivrePipe, AsyncPipe, TitreFromLivreIdPipe],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {

  commandesEmprunt: Commande[] = [];
  commandesAchat: Commande[] = [];
  commandes: Commande[] = [];
  listeAchat: any[] = [];
  listePret: any[] = [];
  
  constructor(private _ps: PanierService) {
    this._ps.commandesSubject.subscribe({
      next: (data) => {
        this.commandesEmprunt = data.filter(c => c.type == 'pret');
        this.commandesAchat = data.filter(c => c.type == 'vente');
        this.commandes = data;
        this.listeAchat = Object.entries(this.commandesAchat[0]?.livreIdQuantite)
        this.listePret = Object.entries(this.commandesEmprunt[0]?.livreIdQuantite)
      }
    });
  }
}
