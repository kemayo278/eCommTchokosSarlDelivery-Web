# Tchokos Livreur — Espace livreur

**Tchokos Sarl Delivery**.

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