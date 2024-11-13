import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achat } from '../models/achat.model';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }

  getByUser() : Observable<Achat[]> {
    return this._client.get<Achat[]>(`${this.url}/Vente/ParUtilisateur`);
  }
}
