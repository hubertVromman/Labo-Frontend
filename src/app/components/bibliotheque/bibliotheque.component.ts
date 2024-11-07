import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bibliotheque } from '../../models/bibliotheque.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { LivreService } from '../../services/livre.service';
import { Livre } from '../../models/livre.model';
import { CardModule } from 'primeng/card';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-bibliotheque',
  standalone: true,
  imports: [TableModule, ButtonModule, NavbarComponent, CardModule],
  templateUrl: './bibliotheque.component.html',
  styleUrl: './bibliotheque.component.scss'
})
export class BibliothequeComponent {

  bibliotheque: Bibliotheque;
  livreDetails: Livre | undefined;
  auteurs: string | undefined;

  @HostListener('document:click', ['$event'])
  click(event: any) {
    let node = event.target;
    while (node) {
      if (node.nodeName == "p-card".toUpperCase()) {
        return
      }
      if (node.nodeName == "p-button".toUpperCase()) {
        return
      }
      node = node.parentElement;
    }
    this.hideDetails();
  }

  constructor(private _ar : ActivatedRoute, private _ls: LivreService, private _ps: PanierService) {
    this.bibliotheque = this._ar.snapshot.data['bibliotheque']
  }

  showDetails(livreId: any) {
    this._ls.get(livreId).subscribe({
      next: data => {
        this.livreDetails = data;
        this.auteurs = this.livreDetails.auteurs.map(a => a.nom + ' ' + a.prenom).join(', ');
      }
    })
  }
  
  hideDetails() {
    this.livreDetails = undefined;
    this.auteurs = undefined;
  }

  ajouterAuPanier(livreId: number, type: string) {
    this._ps.ajouterArticle(this.bibliotheque.bibliothequeId, livreId, type);
  }
}
