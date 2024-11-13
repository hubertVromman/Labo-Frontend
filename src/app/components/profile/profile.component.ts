import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PretService } from '../../services/pret.service';
import { Pret } from '../../models/pret.model';
import { TableModule } from 'primeng/table';
import { StatutFromPretPipe } from "../../pipes/statut-from-pret.pipe";
import { Achat } from '../../models/achat.model';
import { AchatService } from '../../services/achat.service';
import { MultiplyPipe } from "../../pipes/mutliply.pipe";
import { PrixTotalAchatPipe } from '../../pipes/prix-total-achat.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, TableModule, StatutFromPretPipe, DatePipe, MultiplyPipe, PrixTotalAchatPipe, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;
  prets$: Observable<Pret[]>;
  achats$: Observable<Achat[]>;

  expandedRows = {};

  constructor(private _auth: AuthService, private _ps: PretService, private _as: AchatService) {
    this.user$ = this._auth.getProfile();
    this.prets$ = this._ps.getByUser();
    this.achats$ = this._as.getByUser();
  }

  ngOnInit(): void {
  }

  rendre(pretId: number) {
    if (!confirm("Etes-vous sûr de vouloir rendre les livres ?"))
      return
    this._ps.rendre(pretId).subscribe({
      next: () => this.prets$ = this._ps.getByUser()
    });
  }
}
