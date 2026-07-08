# Tchokos Livreur — Espace livreur

Application **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4** pour les livreurs de **Tchokos Sarl Delivery**.

Charte : `--primary: #10b981` · `--secondary: #0f172a`.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de production :

```bash
npm run build && npm start
```

## Connexion de démonstration

| Champ        | Valeur                |
| ------------ | --------------------- |
| E-mail       | `livreur@tchokos.cm`  |
| Mot de passe | `tchokos`             |

(Ou utilisez le bouton « Remplir les identifiants de démonstration ».)

## Écrans

- **/login** — authentification du livreur (2 colonnes sur grand écran, plein écran sur mobile).
- **/dashboard** — accueil : résumé des gains/livraisons + liste des commandes (maquette 1). La cloche mène aux notifications.
- **/livraisons** — liste filtrable par statut.
- **/livraisons/[id]** — détail d'une livraison : itinéraire, articles de la commande + total, action « Accepter » puis **QR code que le client scanne** pour valider la livraison, détails colis, client (appel + itinéraire), suivi (maquette 2).
- **/notifications** — commandes reçues selon les zones affectées, groupées par jour, avec compteur de non-lues.
- **/profil** — profil, statistiques, **zones affectées**, informations, bouton « Modifier ».
- **/profil/modifier** — édition des informations du livreur.
- **/parametres** — disponibilité, notifications, préférences, sécurité.
- **/parametres/mot-de-passe** — changement de mot de passe avec règles de validation.
- **/parametres/aide** — aide & support : contacts (appel, WhatsApp, e-mail) + FAQ.

Navigation : **barre basse** (5 onglets) sur mobile, **barre latérale** sur desktop.

## Statuts de livraison

`en_attente` → le livreur appuie sur « Accepter » → `en_cours` (livraison acceptée / en cours) → le **client scanne le QR code** → `livree`.

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # police + AuthProvider
│   ├── page.tsx              # redirection selon la session
│   ├── login/page.tsx
│   └── (app)/                # zone protégée (garde d'auth)
│       ├── layout.tsx        # AppShell
│       ├── dashboard/
│       ├── livraisons/ + [id]/   # QR de validation via qrcode.react
│       ├── notifications/
│       ├── profil/ + modifier/
│       └── parametres/ + mot-de-passe/ + aide/
├── components/               # AppShell, BottomNav, DesktopSidebar, OrderCard, StatusBadge
└── lib/
    ├── auth.tsx              # contexte d'auth (mock localStorage)
    ├── data.ts               # données de démonstration + helpers
    └── types.ts
```

## Brancher votre backend Laravel

L'auth et les données sont mockées pour la démo. Points d'intégration :

1. **`src/lib/auth.tsx`** — remplacer `connexion()` par un `POST /auth/login` et la restauration de session par un `GET /me` (token en cookie httpOnly de préférence).
2. **`src/lib/data.ts`** — remplacer les tableaux statiques par des appels à votre API Laravel (`GET /livraisons`, `GET /livraisons/{id}`), idéalement via des Server Components ou React Query.
3. **Détail livraison** — l'action de progression du statut (`accepter → démarrer → confirmer`) doit envoyer un `PATCH /livraisons/{id}/statut`.

Le frontend reste ainsi totalement découplé de la logique métier (même approche que ton découplage front / Laravel sur Braiderlocs).
