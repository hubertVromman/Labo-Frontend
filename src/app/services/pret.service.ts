import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Pret } from '../models/pret.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PretService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }

  getByUser() : Observable<Pret[]> {
    return this._client.get<Pret[]>(`${this.url}/Pret/ParUtilisateur`);
  }
}
