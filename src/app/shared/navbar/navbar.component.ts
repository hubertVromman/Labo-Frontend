import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { Commande } from '../../models/commande.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isConnected: boolean = false;
  numberOfItem: number = 0;

  constructor(private _auth: AuthService, private _router: Router, private _ps: PanierService) {
    this._auth.isConnectedSubject.subscribe({
      next: (data) => {
        this.isConnected = data;
      }
    });
    this._ps.commandesSubject.subscribe({
      next: (data) => {
        console.log(data.map(c => c.livreIdQuantite))
        this.numberOfItem = data.map(c => Object.keys(c.livreIdQuantite).length)
          .reduce((accumulator: number, currentValue: any) => accumulator + currentValue, 0);
      }
    });
  }

  logout() {
    this._auth.logout();
  }

  goTo(pageName: string) {
    console.log(pageName)
    this._router.navigate([pageName]);
  }
}
