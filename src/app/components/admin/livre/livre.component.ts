import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Livre } from '../../../models/livre.model';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './livre.component.html',
  styleUrl: './livre.component.scss'
})
export class LivreComponent {

  livreForm: FormGroup;

  livres: Livre[];

  auteurInputs: string[] = ['auteurId1']

  constructor(private fb: FormBuilder, private _ar: ActivatedRoute) {
    this.livres = this._ar.snapshot.data['livre'];
    this.livreForm = this.fb.group({
      isbn: [null, []],
      titre: [null, []],
      dateParution: [null, []],
      genreId: [null, []],
      prixVente: [null, []],
      auteurId1: [null, []],
    });
  }

  addInput() {
    this.auteurInputs.push("auteurId2");
    this.livreForm.addControl("auteurId2", new FormControl(['test', []]));
  }

  onSubmit() {
    console.log(this.livreForm.value);
  }
}
