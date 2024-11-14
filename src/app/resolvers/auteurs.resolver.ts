import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Auteur } from '../models/auteur.model';
import { AuteurService } from '../services/auteur.service';

export const auteursResolver: ResolveFn<Auteur[]> = (route, state) => {
  let as : AuteurService = inject(AuteurService);
  return as.getAll();
};