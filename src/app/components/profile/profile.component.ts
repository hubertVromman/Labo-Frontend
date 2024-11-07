import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;

  constructor(private _auth: AuthService) {
    this.user$ = this._auth.getProfile();
  }

  ngOnInit(): void {
  }

  handleClick() {
    this.user$ = this._auth.getProfile();
  }

}
