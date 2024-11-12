import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      motDePasse: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._auth.isConnectedSubject.subscribe({
      next: data => {
        if (data) {
          const params = this._ar.snapshot.queryParams;
          if (params['redirectURL']) {
            this._router.navigate(params['redirectURL'].split('/'));
          } else {
            this._router.navigate(["home"]);
          }
        }
      }
    });
  }

  onSubmit () {
    if (this.loginForm.invalid) return;

    this._auth.login(this.loginForm.value);
  }
}
