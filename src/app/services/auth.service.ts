import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../models/login-form.model';
import { Token } from '../models/token.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl;
  get isConnected() {
    return localStorage.getItem("accessToken") != null
  };
  isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isConnected);

  constructor(private _client: HttpClient, private _router: Router) {}

  storeToken(tokens: Token) {
    console.log(tokens);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    this.isConnectedSubject.next(this.isConnected);
  }

  login(loginForm: LoginForm) {
    this._client.post<Token>(`${this.url}/Utilisateur/Login`, loginForm).subscribe({
      next : (data) => {
        this.storeToken(data)
      }
    });
  }

  refreshTokens() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    let tokens = {
      accessToken,
      refreshToken
    }
    return this._client.post<Token>(`${this.url}/Utilisateur/RefreshToken`, tokens).pipe(
      tap((data) => {        
        this.storeToken(data)
      })
    );
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.isConnectedSubject.next(this.isConnected);
    this._router.navigate(["home"]);
  }

  getProfile() : Observable<User> {
      // if (!this.isConnected)
      //   return 
      return this._client.get<User>(`${this.url}/Utilisateur/Profile`)
  }
}
