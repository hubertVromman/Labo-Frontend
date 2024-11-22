import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';
import { Auteur } from '../../../models/auteur.model';
import { GenreForm } from '../../../models/genre-form.model';
import { Genre } from '../../../models/genre.model';
import { LivreForm } from '../../../models/livre-form.model';
import { Livre } from '../../../models/livre.model';
import { AuteurService } from '../../../services/auteur.service';
import { GenreService } from '../../../services/genre.service';
import { LivreService } from '../../../services/livre.service';
import { validDateValidator } from '../../../validators/date.validator';
import { validISBNValidator } from '../../../validators/isbn.validator';
import { validPriceValidator } from '../../../validators/number.validator';
import { FormErrorComponent } from "../../form-error/form-error.component";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [ReactiveFormsModule, AutoCompleteModule, ButtonModule, CardModule, FloatLabelModule, CommonModule, InputTextModule, InputNumberModule, InputMaskModule, FormErrorComponent, DialogModule],
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.scss'
})
export class LivreComponent {

  livreForm: FormGroup;

  livres: Livre[];
  auteurs: Auteur[];
  genres: Genre[];

  prenomSuggestions: string[];
  nomSuggestions : string[];
  genreSuggestions : string[];

  nomGenres : string[];
  genreStatut = '';
  auteurStatut: any = {};

  AuteurNumber: number = 0;
  auteurInputs: string[] = []

  constructor(private fb: FormBuilder, private _ar: ActivatedRoute, private _as: AuteurService, private _gs: GenreService, private _ls: LivreService, private router: Router) {
    this.livres = this._ar.snapshot.data['livres'];
    this.auteurs = this._ar.snapshot.data['auteurs'];
    this.genres = this._ar.snapshot.data['genres'];

    this.nomGenres = this.genres.map(g => g.nomGenre);

    this.prenomSuggestions = this.auteurs.map(a => a.prenom);
    this.nomSuggestions = this.auteurs.map(a => a.nom);
    this.genreSuggestions = this.genres.map(g => g.nomGenre);

    this.livreForm = this.fb.group({
      titre: [null, [Validators.required]],
      isbn: [null, [validISBNValidator()]],
      dateParution: [null, [Validators.required, validDateValidator()]],
      prixVente: [null, [validPriceValidator()]],
      genre: [null, [Validators.required]],
      auteurs : this.fb.group({}),
    });
    this.createAuteurFormGroup(true);
  }

  addInput() {
    this.createAuteurFormGroup();
  }

  updateList() {
    this._ls.getAll().subscribe({
      next: data => this.livres = data
    });
  }

  async onSubmit() {
    if (this.livreForm.invalid) return;

    let auteurIds: number[] = [];
    let genreId;
    let promises: Promise<number>[] = [];
    Object.entries(this.livreForm.value.auteurs).forEach(async (kvp) => {
      let key = kvp[0];
      let value = kvp[1] as Auteur;
      if (this.auteurStatut[key] == 'toAddInDB') {
        promises.push(firstValueFrom(this._as.create({
          nom: value.nom,
          prenom: value.prenom,
        } as Auteur)));
      } else {
        auteurIds.push(this.auteurs.find(a => a.prenom == value.prenom && a.nom == value.nom)!.auteurId);
      }
    });
    if (this.genreStatut == 'toAddInDB') {
      genreId = await firstValueFrom(this._gs.create({
        nomGenre: this.livreForm.value.genre,
      } as GenreForm));
    } else {
      genreId = this.genres.find(g => g.nomGenre == this.livreForm.value.genre)!.genreId;
    }
    auteurIds.push(...await Promise.all(promises));
    this.livreForm.value.isbn = this.livreForm.value.isbn?.replaceAll('-', '').trim();

    this._ls.create({
      titre: this.livreForm.value.titre,
      isbn: this.livreForm.value.isbn,
      dateParution: this.convertDate(this.livreForm.value.dateParution),
      prixVente: this.livreForm.value.prixVente,
      genreId,
      auteursId: auteurIds
    } as LivreForm).subscribe({
      next: () => this.updateList()
    })
  }

  getControl(ctrl: string[]): FormControl {
    return this.livreForm.get(ctrl) as FormControl;
  }

  createAuteurFormGroup(isRequired = false) {
    this.AuteurNumber++;
    const label = "Auteur " + this.AuteurNumber
    this.auteurInputs.push(label);
    (<FormGroup>this.livreForm.get('auteurs')).addControl(label,
      new FormGroup({
        nom: new FormControl(null, [Validators.required]),
        prenom: new FormControl(null, [Validators.required]),
      })
    );
  }

  filterPrenom(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.auteurs.length; i++) {
        let auteur = this.auteurs[i];
        if (auteur.prenom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(auteur.prenom + '  ' + auteur.nom);
        }
    }

    this.prenomSuggestions = filtered;
  }

  filterNom(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.auteurs.length; i++) {
        let auteur = this.auteurs[i];
        if (auteur.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(auteur.prenom + '  ' + auteur.nom);
        }
    }

    this.nomSuggestions = filtered;
  }

  filterGenre(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.genres.length; i++) {
        let genre = this.genres[i];
        if (genre.nomGenre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(genre.nomGenre);
        }
    }

    this.genreSuggestions = filtered;
  }

  checkGenre() {

    if (this.livreForm.get('genre')?.invalid) {
      this.genreStatut = '';
      return;
    }

    if (!this.nomGenres.includes(this.livreForm.value.genre)) {
      this.genreStatut = 'toAddInDB';
    } else {
      this.genreStatut = 'presentInDB';
    }
  }

  checkAuteur(auteurInput: string) {

    let prenomInput = this.livreForm.get(['auteurs', auteurInput, 'prenom'])!;
    let nomInput = this.livreForm.get(['auteurs', auteurInput, 'nom'])!;

    if (prenomInput.invalid ||nomInput.invalid) {
      this.auteurStatut[auteurInput] = '';
      return;
    }

    if (!this.auteurs.map(a => a.prenom + ' ' + a.nom).includes(prenomInput.value + ' ' + nomInput.value)) {
      this.auteurStatut[auteurInput] = 'toAddInDB';
    } else {
      this.auteurStatut[auteurInput] = 'presentInDB';
    }
  }

  onChange(event: string, controlName: string) {
    if (event.includes('  ') && !event.includes('   ') && event.lastIndexOf(' ') != event.length - 1) {
      this.livreForm.get(['auteurs', controlName, 'prenom'])?.setValue(event.split('  ')[0]);
      this.livreForm.get(['auteurs', controlName, 'nom'])?.setValue(event.split('  ')[1]);
    }
  }

  deleteAuteurField(auteur: string) {
    const index = this.auteurInputs.findIndex(a => a == auteur);
    if (index != -1) {
      this.auteurInputs.splice(index, 1);
      (<FormGroup>this.livreForm.get('auteurs')).removeControl(auteur);
    }
  }

  convertDate(dateAConvertir: string) {
    let dateArray = dateAConvertir.split("/");
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }
}
