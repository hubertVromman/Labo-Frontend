import { inject, Pipe, PipeTransform } from '@angular/core';
import { LivreService } from '../services/livre.service';
import { map, Observable } from 'rxjs';
import { Livre } from '../models/livre.model';

@Pipe({
  name: 'titreFromLivreId',
  standalone: true
})
export class TitreFromLivreIdPipe implements PipeTransform {

  ls = inject(LivreService);

  transform(value: number, ...args: unknown[]): Observable<string> {
    return this.ls.get(value).pipe(map((l: Livre) => l.titre));
  }

}
