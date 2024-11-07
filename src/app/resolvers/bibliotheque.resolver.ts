import { ResolveFn } from '@angular/router';
import { Bibliotheque } from '../models/bibliotheque.model';
import { BibliothequeService } from '../services/bibliotheque.service';
import { inject } from '@angular/core';

export const bibliothequeResolver: ResolveFn<Bibliotheque> = (route, state) => {
  let bs : BibliothequeService = inject(BibliothequeService)
  let id : number = route.params['id']
  return bs.getWithStock(id)
};
