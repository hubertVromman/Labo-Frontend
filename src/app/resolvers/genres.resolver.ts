import { ResolveFn } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { inject } from '@angular/core';
import { Genre } from '../models/genre.model';

export const genresResolver: ResolveFn<Genre[]> = (route, state) => {
  let gs : GenreService = inject(GenreService);
  return gs.getAll();
};