import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bibliotheque, StockLivre } from '../../../models/bibliotheque.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { BibliothequeService } from '../../../services/bibliotheque.service';
import { StockForm } from '../../../models/stock-form';
import { Livre } from '../../../models/livre.model';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-bibliotheque-admin',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, ButtonModule, DropdownModule],
  templateUrl: './bibliotheque-admin.component.html',
  styleUrl: './bibliotheque-admin.component.scss'
})
export class BibliothequeAdminComponent {

  bibliotheque: Bibliotheque;
  livres: Livre[];
  allLivres: Livre[];
  // livreNames: string[];

  stockForms: FormGroup[] = [];
  newStockForm: FormGroup;

  constructor(private _ar: ActivatedRoute, private fb: FormBuilder, private _bs: BibliothequeService) {
    this.bibliotheque = this._ar.snapshot.data['bibliotheque'];
    this.allLivres = this._ar.snapshot.data['livres']
    this.livres = this.allLivres.filter((l: Livre) => {
      return !this.bibliotheque.stockLivre.map(sl => sl.livre.livreId).includes(l.livreId);
    });

    this.newStockForm = this.fb.group({
      livre: [null, []],
      stockLocation: [null, []],
      stockAchat: [null, []],
    });

    this.stockForms = this.bibliotheque.stockLivre.map(sl => 
      this.addControl(sl)
    );
  }

  addControl(sl: StockLivre) {
    return new FormGroup({
      [sl.livre.livreId]: new FormGroup({
        livreId: new FormControl(sl.livre.livreId, []),
        bibliothequeId: new FormControl(this.bibliotheque.bibliothequeId, []),
        stockAchat: new FormControl(sl.stockAchat, []),
        stockLocation: new FormControl(sl.stockLocation, []),
      })
    })
  }

  onModifySubmit(index: number) {
    let form = this.stockForms[index];

    if (form.invalid)
      console.error(form.errors);
    else {
      this._bs.setStock(Object.values(form.value)[0] as StockForm).subscribe({
        next: data => alert("ok"),
        error: error => {
          console.log(error)
          alert(error.error.title)
        }
      });
    }
  }

  onAddSubmit() {
    let form = this.newStockForm;

    if (form.invalid)
      console.error(form.errors);
    else {
      form.value.livreId = form.value.livre.livreId;
      form.value.bibliothequeId = this.bibliotheque.bibliothequeId;
      
      this._bs.setStock(form.value).subscribe({
        next: data => this.updateList(),
        error: error => {
          console.log(error)
          alert(error.error.title)
        }
      });
    }
  }

  updateList(): void {
    this._ar.params.subscribe({
      next: data => this._bs.getWithStock(+data['id']).subscribe({
        next: data => {
          this.bibliotheque = data;
          this.livres = this.allLivres.filter((l: Livre) => {
            return !this.bibliotheque.stockLivre.map(sl => sl.livre.livreId).includes(l.livreId);
          });
          this.stockForms = this.bibliotheque.stockLivre.map(sl => 
            this.addControl(sl)
          );
        }
      })
    });
  }
}
