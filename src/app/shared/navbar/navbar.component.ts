import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { LoginComponent } from "../../components/login/login.component";
import { RegisterComponent } from "../../components/register/register.component";
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isConnected: boolean = false;
  numberOfItem: number = 0;

  user$: Observable<User>;

  constructor(private _auth: AuthService, private _router: Router, private _ps: PanierService) {
    this.user$ = this._auth.getProfile();

    this._auth.isConnectedSubject.subscribe({
      next: (data) => {
        this.isConnected = data;
        if (this.isConnected)
          this.user$ = this._auth.getProfile();
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

  goTo(pageName: string, includeReturn = false) {
    if (includeReturn)
      this._router.navigate([pageName], { queryParams: { 'redirectURL': this._router.url.substring(1) } });
    else
      this._router.navigate([pageName]);
  }
}
