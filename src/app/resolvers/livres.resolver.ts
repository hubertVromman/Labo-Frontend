import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Livre } from '../models/livre.model';
import { LivreService } from '../services/livre.service';

export const livresResolver: ResolveFn<Livre[]> = (route, state) => {
  let ls : LivreService = inject(LivreService);
  return ls.getAll();
};
