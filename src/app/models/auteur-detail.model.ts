import { Livre } from "./livre.model"

export interface AuteurDetail {
  auteurId: number
  nom: string
  prenom: string
  livres: Livre[]
}
