import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Auteur } from '../../models/auteur.model';
import { Bibliotheque } from '../../models/bibliotheque.model';
import { Genre } from '../../models/genre.model';
import { Livre } from '../../models/livre.model';
import { AuteurService } from '../../services/auteur.service';
import { GenreService } from '../../services/genre.service';
import { LivreService } from '../../services/livre.service';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-bibliotheque',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, DatePipe, AsyncPipe, ReactiveFormsModule, AutoCompleteModule, DropdownModule],
  templateUrl: './bibliotheque.component.html',
  styleUrl: './bibliotheque.component.scss'
})
export class BibliothequeComponent {

  bibliotheque: Bibliotheque;
  livreDetails: Livre | undefined;

  genres$: Observable<Genre[]>;
  auteurs$: Observable<Auteur[]>;
  auteurs: Auteur[] = [];

  filteredAuteurs: string[] = [];

  livresToShow: number[] = [];
  livresToShow2: number[] = [];
  filterForm: FormGroup;

  getFullName = (a: Auteur) => a.prenom + ' ' + a.nom;

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

  constructor(private _ar: ActivatedRoute, private _ls: LivreService, private _ps: PanierService, private _gs: GenreService, private fb: FormBuilder, private _as: AuteurService) {
    this.bibliotheque = this._ar.snapshot.data['bibliotheque'];
    this.genres$ = this._gs.getAll();
    this.auteurs$ = this._as.getAll();
    this.auteurs$.subscribe({
      next: data => this.auteurs = data
    })
    this.filterForm = this.fb.group({
      genre: [null, []],
      auteur: [null, []],
    });
  }

  showDetails(livreId: any) {
    this._ls.get(livreId).subscribe({
      next: data => {
        this.livreDetails = data;
      }
    })
  }

  hideDetails() {
    this.livreDetails = undefined;
  }

  ajouterAuPanier(livreId: number, type: string) {
    this._ps.ajouterArticle(this.bibliotheque.bibliothequeId, livreId, type);
  }

  updateSuggestion(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    if (query == '') {
      this.filteredAuteurs = this.auteurs.map(a => `${a.prenom} ${a.nom}`);
      return
    }

    for (let i = 0; i < this.auteurs.length; i++) {
      let auteur = this.auteurs[i];
      if (auteur.nom.toLowerCase().indexOf(query.toLowerCase()) == 0)
        filtered.push(`${auteur.prenom} ${auteur.nom}`);
      if (auteur.prenom.toLowerCase().indexOf(query.toLowerCase()) == 0)
        filtered.push(`${auteur.prenom} ${auteur.nom}`);
    }

    this.filteredAuteurs = filtered;
  }

  onSubmit() {
    const values = this.filterForm.value;
    console.log(values)
    this.livresToShow = [];
    this.livresToShow2 = [];
    if (values.genre != null && values.genre != '') {
      this._gs.get(values.genre.genreId).subscribe({
        next: data => this.livresToShow = data.livres.map(l => l.livreId)
      });
    }
    if (values.auteur != null && values.auteur != '') {
      const auteur = this.auteurs.find(a => values.auteur.startsWith(a.prenom) && values.auteur.endsWith(a.nom));
      if (!auteur)
        return
      this._as.get(auteur.auteurId).subscribe({
        next: data => {
          this.livresToShow2 = data.livres.map(l => l.livreId);
          console.log(this.livresToShow2);
        }
      });
    }
  }
}
