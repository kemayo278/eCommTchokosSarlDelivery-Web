export type StatutLivraison = "en_attente" | "en_cours" | "livree" | "annulee";

export type ModePaiement = "a_la_livraison" | "paye_en_ligne" | "mobile_money";
export type ModeLivraison = "domicile" | "point_relais" | "express";

export interface Livreur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  vehicule: string;
  matricule: string;
  note: number;
  initiales: string;
  zones: string[];
}

export interface Article {
  nom: string;
  quantite: number;
  prixUnitaire: number;
}

export interface EvenementSuivi {
  libelle: string;
  lieu: string;
  heure: string;
  date: string;
  atteint: boolean;
}

export interface Livraison {
  id: string;
  numero: string;
  client: {
    nom: string;
    telephone: string;
    adresse: string;
    quartier: string;
  };
  boutique: string;
  nbArticles: number;
  articles: Article[];
  montant: number;
  modePaiement: ModePaiement;
  modeLivraison: ModeLivraison;
  statut: StatutLivraison;
  creeLe: string;
  etaMinutes: number;
  itineraire: { origine: string; destination: string };
  suivi: EvenementSuivi[];
}

export type TypeNotification = "nouvelle_commande" | "rappel" | "systeme";

export interface Notification {
  id: string;
  type: TypeNotification;
  titre: string;
  message: string;
  zone?: string;
  livraisonId?: string;
  date: string;
  heure: string;
  lu: boolean;
}
