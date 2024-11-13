import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { AuteurDetail } from '../models/auteur-detail.model';
import { Auteur } from '../models/auteur.model';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }

  getAll(): Observable<Auteur[]> {
    return this._client.get<Auteur[]>(`${this.url}/Auteur`)
  }

  get(id: number): Observable<AuteurDetail> {
    return this._client.get<AuteurDetail>(`${this.url}/Auteur/${id}`)
  }
}
