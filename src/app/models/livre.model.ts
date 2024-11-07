export interface Livre {
  livreId: number
  isbn: number
  titre: string
  dateParution: string
  genre: string
  prixVente: number
  auteurs: Auteur[]
}

interface Auteur {
  auteurId: number
  nom: string
  prenom: string
}
