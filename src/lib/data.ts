import type {
  Livraison,
  Livreur,
  ModeLivraison,
  ModePaiement,
  Notification,
  StatutLivraison,
} from "./types";

export const livreurDemo: Livreur = {
  id: "lvr_001",
  nom: "Denis Kema",
  email: "livreur@tchokos.cm",
  telephone: "+237 6 90 12 34 56",
  ville: "Douala",
  vehicule: "Moto — Yamaha",
  matricule: "LT-2048-DLA",
  note: 4.8,
  initiales: "DK",
  zones: ["Akwa Nord", "Deido", "Ange Raphaël", "Bonapriso", "Makepe"],
};

export const identifiantsDemo = {
  email: "livreur@tchokos.cm",
  motDePasse: "tchokos",
};

export const livraisons: Livraison[] = [
  {
    id: "8N9",
    numero: "#85894N9",
    client: {
      nom: "Aïcha Ndongo",
      telephone: "+237 6 98 49 53 95",
      adresse: "Rue 1.842, immeuble Palmier",
      quartier: "Bonapriso",
    },
    boutique: "Tchokos Textile Akwa",
    nbArticles: 4,
    articles: [
      { nom: "Sac à main cuir", quantite: 1, prixUnitaire: 18900 },
      { nom: "Foulard en soie", quantite: 1, prixUnitaire: 7500 },
      { nom: "Portefeuille", quantite: 2, prixUnitaire: 4190 },
    ],
    montant: 34780,
    modePaiement: "a_la_livraison",
    modeLivraison: "domicile",
    statut: "en_cours",
    creeLe: "8 juil. 2026",
    etaMinutes: 32,
    itineraire: { origine: "Akwa", destination: "Bonapriso" },
    suivi: [
      { libelle: "Colis récupéré à l'entrepôt", lieu: "Akwa", heure: "08:05", date: "08/07/2026", atteint: true },
      { libelle: "En route vers le client", lieu: "Bonanjo", heure: "08:22", date: "08/07/2026", atteint: true },
      { libelle: "Arrivée prévue chez le client", lieu: "Bonapriso", heure: "08:57", date: "08/07/2026", atteint: false },
    ],
  },
  {
    id: "K21",
    numero: "#77120K21",
    client: {
      nom: "Serge Etoa",
      telephone: "+237 6 77 88 99 00",
      adresse: "Carrefour Ndokotti, en face pharmacie",
      quartier: "Ndokotti",
    },
    boutique: "Tchokos Sarl Douche Akwa",
    nbArticles: 2,
    articles: [
      { nom: "Casque audio Bluetooth", quantite: 1, prixUnitaire: 9500 },
      { nom: "Câble USB-C", quantite: 1, prixUnitaire: 3000 },
    ],
    montant: 12500,
    modePaiement: "mobile_money",
    modeLivraison: "express",
    statut: "en_attente",
    creeLe: "8 juil. 2026",
    etaMinutes: 45,
    itineraire: { origine: "Akwa", destination: "Ndokotti" },
    suivi: [
      { libelle: "Commande assignée", lieu: "Akwa", heure: "08:40", date: "08/07/2026", atteint: true },
      { libelle: "Colis à récupérer", lieu: "Akwa", heure: "—", date: "08/07/2026", atteint: false },
    ],
  },
  {
    id: "B07",
    numero: "#90233B07",
    client: {
      nom: "Chantal Fotso",
      telephone: "+237 6 91 22 11 44",
      adresse: "Cité SIC, bloc C, appt 12",
      quartier: "Deido",
    },
    boutique: "Tchokos Textile Akwa",
    nbArticles: 6,
    articles: [
      { nom: "Baskets running", quantite: 2, prixUnitaire: 21000 },
      { nom: "Chaussettes sport", quantite: 3, prixUnitaire: 2300 },
      { nom: "Gourde inox", quantite: 1, prixUnitaire: 10000 },
    ],
    montant: 58900,
    modePaiement: "paye_en_ligne",
    modeLivraison: "domicile",
    statut: "en_attente",
    creeLe: "8 juil. 2026",
    etaMinutes: 28,
    itineraire: { origine: "Akwa", destination: "Deido" },
    suivi: [
      { libelle: "Commande assignée", lieu: "Akwa", heure: "08:50", date: "08/07/2026", atteint: true },
      { libelle: "Colis à récupérer", lieu: "Akwa", heure: "—", date: "08/07/2026", atteint: false },
    ],
  },
  {
    id: "R55",
    numero: "#61008R55",
    client: {
      nom: "Boris Kamga",
      telephone: "+237 6 70 00 55 11",
      adresse: "Rue des Écoles, villa bleue",
      quartier: "Makepe",
    },
    boutique: "Tchokos Sarl Douche Akwa",
    nbArticles: 3,
    articles: [
      { nom: "T-shirt coton", quantite: 2, prixUnitaire: 6600 },
      { nom: "Casquette", quantite: 1, prixUnitaire: 8000 },
    ],
    montant: 21200,
    modePaiement: "a_la_livraison",
    modeLivraison: "point_relais",
    statut: "livree",
    creeLe: "7 juil. 2026",
    etaMinutes: 0,
    itineraire: { origine: "Akwa", destination: "Makepe" },
    suivi: [
      { libelle: "Colis récupéré à l'entrepôt", lieu: "Akwa", heure: "14:10", date: "07/07/2026", atteint: true },
      { libelle: "En route vers le point relais", lieu: "Ndokoti", heure: "14:35", date: "07/07/2026", atteint: true },
      { libelle: "Colis livré", lieu: "Makepe", heure: "15:02", date: "07/07/2026", atteint: true },
    ],
  },
  {
    id: "T88",
    numero: "#55471T88",
    client: {
      nom: "Nadège Owona",
      telephone: "+237 6 99 33 22 88",
      adresse: "Avenue de Gaulle, résidence Fleur",
      quartier: "Bali",
    },
    boutique: "Tchokos Textile Akwa",
    nbArticles: 1,
    articles: [{ nom: "Crème hydratante", quantite: 1, prixUnitaire: 8900 }],
    montant: 8900,
    modePaiement: "mobile_money",
    modeLivraison: "express",
    statut: "livree",
    creeLe: "7 juil. 2026",
    etaMinutes: 0,
    itineraire: { origine: "Akwa", destination: "Bali" },
    suivi: [
      { libelle: "Colis récupéré à l'entrepôt", lieu: "Akwa", heure: "11:00", date: "07/07/2026", atteint: true },
      { libelle: "Colis livré", lieu: "Bali", heure: "11:26", date: "07/07/2026", atteint: true },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: "ntf_01",
    type: "nouvelle_commande",
    titre: "Nouvelle commande à récupérer",
    message: "Serge Etoa · 2 articles · Ndokotti",
    zone: "Akwa Nord",
    livraisonId: "K21",
    date: "Aujourd'hui",
    heure: "08:40",
    lu: false,
  },
  {
    id: "ntf_02",
    type: "nouvelle_commande",
    titre: "Nouvelle commande à récupérer",
    message: "Chantal Fotso · 6 articles · Cité SIC",
    zone: "Deido",
    livraisonId: "B07",
    date: "Aujourd'hui",
    heure: "08:50",
    lu: false,
  },
  {
    id: "ntf_03",
    type: "rappel",
    titre: "Livraison en cours",
    message: "Aïcha Ndongo attend son colis à Bonapriso.",
    zone: "Bonapriso",
    livraisonId: "8N9",
    date: "Aujourd'hui",
    heure: "08:22",
    lu: false,
  },
  {
    id: "ntf_04",
    type: "systeme",
    titre: "Zone ajoutée",
    message: "La zone Ange Raphaël vous a été affectée.",
    zone: "Ange Raphaël",
    date: "Hier",
    heure: "17:10",
    lu: true,
  },
  {
    id: "ntf_05",
    type: "nouvelle_commande",
    titre: "Commande livrée",
    message: "Boris Kamga · point relais Makepe.",
    zone: "Makepe",
    livraisonId: "R55",
    date: "Hier",
    heure: "15:02",
    lu: true,
  },
];

export function getLivraison(id: string): Livraison | undefined {
  return livraisons.find((l) => l.id === id);
}

const MOIS_FR: Record<string, number> = {
  "janv.": 0,
  "févr.": 1,
  mars: 2,
  "avr.": 3,
  mai: 4,
  juin: 5,
  "juil.": 6,
  "août": 7,
  "sept.": 8,
  "oct.": 9,
  "nov.": 10,
  "déc.": 11,
};

/** Convertit un libellé « 8 juil. 2026 » en Date (minuit local), ou null si illisible. */
export function parseCreeLe(creeLe: string): Date | null {
  const [jour, mois, annee] = creeLe.trim().split(/\s+/);
  const m = MOIS_FR[mois?.toLowerCase()];
  const j = Number(jour);
  const a = Number(annee);
  if (m === undefined || Number.isNaN(j) || Number.isNaN(a)) return null;
  return new Date(a, m, j);
}

export function formatFCFA(montant: number): string {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export const libelleStatut: Record<StatutLivraison, string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  livree: "Livrée",
  annulee: "Annulée",
};

export const libellePaiement: Record<ModePaiement, string> = {
  a_la_livraison: "À la livraison",
  paye_en_ligne: "Payé en ligne",
  mobile_money: "Mobile Money",
};

export const libelleLivraison: Record<ModeLivraison, string> = {
  domicile: "À domicile",
  point_relais: "Point relais",
  express: "Express",
};
