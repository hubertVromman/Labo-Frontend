import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { Auteur } from '../../../models/auteur.model';
import { Livre } from '../../../models/livre.model';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [ReactiveFormsModule, AutoCompleteModule, ButtonModule, SplitterModule],
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.scss'
})
export class LivreComponent {

  livreForm: FormGroup;

  livres: Livre[];
  auteurs: Auteur[];

  prenomSuggestions: string[];
  nomSuggestions : string[];

  AuteurNumber: number = 0;
  auteurInputs: string[] = []



  constructor(private fb: FormBuilder, private _ar: ActivatedRoute) {
    this.livres = this._ar.snapshot.data['livres'];
    this.auteurs = this._ar.snapshot.data['auteurs'];

    this.prenomSuggestions = this.auteurs.map(a => a.prenom);
    this.nomSuggestions = this.auteurs.map(a => a.nom);

    this.livreForm = this.fb.group({
      isbn: [null, []],
      titre: [null, []],
      dateParution: [null, []],
      genreId: [null, []],
      prixVente: [null, []],
      auteurs : this.fb.group({
      })
    });
    this.createAuteurFormGroup();
  }

  addInput() {
    this.createAuteurFormGroup();
  }

  onSubmit() {
    console.log(this.livreForm.value);
  }

  createAuteurFormGroup() {
    this.AuteurNumber++;
    const label = "Auteur " + this.AuteurNumber
    this.auteurInputs.push(label);
    (<FormGroup>this.livreForm.get('auteurs')).addControl(label,
      new FormGroup({
        nom: new FormControl(null, []),
        prenom: new FormControl(null, []),
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

  onChange(event: string, controlName: string) {
    if (event.includes('  ') && !event.includes('   ') && event.lastIndexOf(' ') != event.length - 1) {
      this.livreForm.get('auteurs')?.get(controlName)?.get('prenom')?.setValue(event.split('  ')[0]);
      this.livreForm.get('auteurs')?.get(controlName)?.get('nom')?.setValue(event.split('  ')[1]);
    }
  }
}
