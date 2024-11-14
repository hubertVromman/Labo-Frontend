import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { FormErrorComponent } from "../form-error/form-error.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, DialogModule, ButtonModule, InputTextModule, FormErrorComponent, FloatLabelModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  visible: boolean = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
    this.registerForm = this.fb.group({
      prenom: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      motDePasse: [null, [Validators.required]],
      motDePasse2: [null, [Validators.required]],
    }, {
      validator: [passwordMatchValidator]
    });

    this._auth.mustOpenRegister.subscribe({
      next: () => this.visible = true
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this._auth.register(this.registerForm.value);

    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }

  checkPasswordMatch() {
    this.registerForm.get('motDePasse2')?.updateValueAndValidity();
  }

  ouvrirLogin() {
    this.visible = false;
    this._auth.openLogin();
  }
}

function passwordMatchValidator (control: AbstractControl): ValidationErrors | null {

  const password = control.get('motDePasse');
  const confirmPassword = control.get('motDePasse2');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
      // Appliquer l'erreur sur le champ spécifique
      confirmPassword.setErrors({ 'passwordMatch': true });

      // Erreur sur le formulaire entier
      return { 'passwordMatch': true };
  }
  return null;
}
