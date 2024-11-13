import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Bibliotheque } from '../../models/bibliotheque.model';
import { BibliothequeService } from '../../services/bibliotheque.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  bibliothequeList: Bibliotheque[] = [];

  constructor(private _bibliotheque: BibliothequeService) { }

  ngOnInit(): void {
    this._bibliotheque.getAll().subscribe({
      next: data => this.bibliothequeList = data
    })
  }
}
