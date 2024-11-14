import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  visible: boolean = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      motDePasse: [null, [Validators.required]],
    });

    _auth.mustOpenLogin.subscribe({
      next: () => this.visible = true
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this._auth.login(this.loginForm.value);

    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }

  ouvrirRegister() {
    this.visible = false;
    this._auth.mustOpenRegister.next(true);
  }
}
