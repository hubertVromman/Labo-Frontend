import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PretService } from '../../services/pret.service';
import { Pret } from '../../models/pret.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, TableModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;
  prets$: Observable<Pret[]>;

  expandedRows = {};

  constructor(private _auth: AuthService, private _ps: PretService) {
    this.user$ = this._auth.getProfile();
    this.prets$ = this._ps.getByUser();
  }

  ngOnInit(): void {
  }

}
