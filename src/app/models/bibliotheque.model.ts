export interface Bibliotheque {
  bibliothequeId: number
  nom: string
  adresse: string
  numeroTelephone: string
  stockLivre: StockLivre[]
}

export interface StockLivre {
  livre: Livre
  stockLocation: number
  stockAchat: number
}

interface Livre {
  livreId: number
  isbn: number
  titre: string
  dateParution: string
  genre: string
  prixVente: number
}
