import { Bibliotheque } from "./bibliotheque.model"
import { Livre } from "./livre.model"
import { User } from "./user.model"

export interface Achat {
  venteId: number
  dateVente: string
  venteLivre: VenteLivre[]
  acheteur: User
  bibliotheque: Bibliotheque
}

interface VenteLivre {
  livre: Livre
  quantite: number
  prixVente: number
}