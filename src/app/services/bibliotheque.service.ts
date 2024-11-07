import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bibliotheque } from '../models/bibliotheque.model';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliothequeService {
  
  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }
  
  getAll() : Observable<Bibliotheque[]> {
    return this._client.get<Bibliotheque[]>(`${this.url}/Bibliotheque`)
  }

  get(id: number): Observable<Bibliotheque> {
    return this._client.get<Bibliotheque>(`${this.url}/Bibliotheque/${id}`)
  }

  getWithStock(id: number): Observable<Bibliotheque> {
    return this._client.get<Bibliotheque>(`${this.url}/Bibliotheque/AvecStock/${id}`)
  }
}
