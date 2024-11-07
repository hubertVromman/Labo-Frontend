import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Livre } from '../models/livre.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }
  
  // getAll() : Observable<Bibliotheque[]> {
  //   return this._client.get<Bibliotheque[]>(`${this.url}Bibliotheque`)
  // }

  get(id: number): Observable<Livre> {
    return this._client.get<Livre>(`${this.url}/Livre/${id}`)
  }

}
