import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { LivreForm } from '../models/livre-form.model';
import { Livre } from '../models/livre.model';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }

  getAll() : Observable<Livre[]> {
    return this._client.get<Livre[]>(`${this.url}/Livre`)
  }

  get(id: number): Observable<Livre> {
    return this._client.get<Livre>(`${this.url}/Livre/${id}`)
  }

  create(l: LivreForm): Observable<number> {
    return this._client.post<number>(`${this.url}/Livre`, l);
  }
}
