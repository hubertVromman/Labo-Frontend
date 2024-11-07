import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { LivreService } from '../services/livre.service';
import { Livre } from '../models/livre.model';

@Pipe({
  name: 'livreFromId',
  standalone: true
})
export class LivreFromIdPipe implements PipeTransform {
  
  ls = inject(LivreService);

  transform(value: number, ...args: unknown[]): Observable<Livre> {
    return this.ls.get(value);
  }
}
