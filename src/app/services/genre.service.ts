import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url: string = environment.apiUrl;

  constructor(private _client: HttpClient) { }

  getAll(): Observable<Genre[]> {
    return this._client.get<Genre[]>(`${this.url}/Genre`)
  }

  get(id: number): Observable<Genre> {
    return this._client.get<Genre>(`${this.url}/Genre/${id}`)
  }
}
