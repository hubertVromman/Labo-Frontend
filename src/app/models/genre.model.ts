import { Livre } from "./livre.model"

export interface Genre {
  genreId: number
  nomGenre: string
  livres: Livre[]
}
