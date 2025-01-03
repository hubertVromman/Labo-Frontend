import { Bibliotheque } from "./bibliotheque.model"
import { Livre } from "./livre.model"
import { User } from "./user.model"

export interface Pret {
  pretId: number
  dateDebut: Date
  dateFin: Date
  pretLivre: PretLivre[]
  estRendu: boolean
  emprunteur: User
  bibliotheque: Bibliotheque
}

interface PretLivre {
  livre: Livre
  quantite: number
}
