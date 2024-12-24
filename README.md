# 🚀 tt-aimigo

Bienvenue dans **tt-aimigo**, une application mobile développée avec **React Native**, **Expo**, **TypeScript**, **TailwindCSS (NativeWind)** et **Redux**, utilisant l'API **TMDB** pour afficher des informations sur les films.

## 📚 Prérequis

Assure-toi d'avoir les outils suivants installés :

- **Node.js** (version LTS recommandée)
- **Expo CLI**
- **Un émulateur mobile** (iOS ou Android) ou l'application **Expo Go**

## 🛠️ Installation

Clone le dépôt du projet :

```bash
git clone https://github.com/YanissB/tt-aimigo.git
```

Accède au dossier :

```bash
cd tt-aimigo
```

Installe les dépendances :

```bash
npm install
```

Ajoute les variables d'environnement dans un fichier `.env` :

```
TMDB_API_KEY=[VotreCléAPI]
TMDB_ACCESS_TOKEN=[VotreAccessToken]
```

## ▶️ Lancer le Projet

Pour lancer l'application en mode développement :

```bash
npx expo start
```

Ensuite :

- Scanne le **QR code** avec **Expo Go** (disponible sur Android et iOS).
- Ou utilise un **émulateur Android/iOS** pour lancer l'application.

## 🗂️ Structure du Projet

```
/tt-aimigo
├── /app
│   ├── /(tabs)
│   │   ├── home.tsx       # Écran d'accueil
│   │   ├── favorites.tsx  # Écran des favoris
│   ├── movie
│   │   ├── [id].tsx       # Écran des détails d'un film
│   ├── _layout.tsx        # Configuration principale de la navigation
├── /components            # Composants réutilisables
├── /api
│   ├── tmdb.ts            # Appels API TMDB
├── /store
│   ├── index.ts           # Configuration Redux
│   ├── slices/            # Slices Redux
├── .env                   # Variables d'environnement
├── tailwind.config.js     # Configuration TailwindCSS
├── app.d.ts               # Types NativeWind
└── README.md              # Documentation du projet
```

## 📦 Technologies Utilisées

- **React Native** : Framework principal pour le développement mobile.
- **Expo** : Plateforme pour le développement et le déploiement simplifié d'applications React Native.
- **TypeScript** : Typage statique pour un code plus robuste.
- **Redux** : Gestion de l'état global.
- **TailwindCSS (NativeWind)** : Système de styles utilitaire pour un design efficace.
- **TMDB API** : Source principale pour les informations sur les films.

## ✅ Fonctionnalités

- **Navigation Tabulaire** : Deux onglets principaux : Accueil et Favoris.
- **Affichage Dynamique** : Liste de films avec pagination.
- **Détails des Films** : Affichage détaillé après sélection d'un film.
- **Gestion des Favoris** : Ajouter/Supprimer des favoris.
- **Pagination Optimisée** : Chargement fluide des données.
- **Filtres** : Filtrer les films par genre, année, etc.

## 📄 Licence

Ce projet est sous licence **MIT**. Consulte le fichier `LICENSE` pour plus de détails.
