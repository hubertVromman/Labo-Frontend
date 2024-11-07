import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { BibliothequeService } from '../../services/bibliotheque.service';
import { Bibliotheque } from '../../models/bibliotheque.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  bibliothequeList: Bibliotheque[] = [];

  constructor(private _bibliotheque: BibliothequeService) {}

  ngOnInit(): void {
    this._bibliotheque.getAll().subscribe({
      next: data => this.bibliothequeList = data
    })
  }
}
