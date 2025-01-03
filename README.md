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

## 🧪 Tests

Pour exécuter les tests unitaires :

```bash
npm test
```

Les tests sont configurés avec :

- **Jest** : Framework de test
- **@testing-library/react-native** : Utilitaires de test pour React Native
- **axios-mock-adapter** : Pour mocker les appels API

La couverture des tests est disponible dans le dossier `coverage/` après l'exécution.

Pour exécuter les tests en mode watch (mise à jour automatique) :

```bash
npm test -- --watch
```

Les tests sont organisés dans le dossier `__tests__/` avec la structure suivante :

- `unit/` : Tests unitaires
  - `tmdbApi/` : Tests des appels API

## 🗂️ Structure du Projet

```
/tt-aimigo
├── __tests__                     # Tests unitaires
│   ├── setup/                    # Configuration des tests
│   │   └── jestSetup.ts         # Configuration initiale de Jest
│   └── unit/                    # Tests unitaires
│       └── tmdbApi/             # Tests des appels API
│           ├── fetchNowPlayingMovies.ts  # Tests des films à l'affiche
│           └── fetchPopularMovies.ts     # Tests des films populaires
├── api/                          # Configuration des appels API
│   ├── apiClient.ts             # Client API générique
│   └── tmdbApi.ts              # Appels spécifiques à l'API TMDB
├── app/                         # Dossier principal des routes Expo
│   ├── (tabs)/                 # Routes avec navigation par onglets
│   ├── movie/                  # Routes pour les détails des films
│   ├── _layout.tsx            # Configuration du layout principal
│   └── index.tsx             # Point d'entrée de l'application
├── assets/                    # Ressources statiques (images, fonts)
├── components/               # Composants réutilisables
│   ├── common/              # Composants partagés
│   │   └── favoriteButton/  # Bouton de gestion des favoris
│   │       ├── animations.ts        # Animations du bouton
│   │       └── FavoriteButton.tsx   # Composant du bouton
│   └── home/                # Composants spécifiques à l'accueil
│       ├── filterModal/     # Modal des filtres
│       ├── moviesList/      # Liste des films
│       └── searchAndFilters/  # Barre de recherche et filtres
├── hooks/                    # Hooks personnalisés
│   └── useMovies.ts         # Hook de gestion des films
├── store/                   # Configuration Redux
│   └── slices/             # Slices Redux
│       ├── favoritesSlice.ts  # Gestion des favoris
│       ├── movieSlice.ts      # Gestion des films
│       └── index.ts           # Configuration du store
├── .env                     # Variables d'environnement
├── .gitignore              # Configuration Git
├── app.json                # Configuration Expo
├── babel.config.js         # Configuration Babel
├── env.d.ts               # Types pour les variables d'environnement
├── global.css             # Styles globaux
├── jest.config.js         # Configuration des tests
├── metro.config.js        # Configuration Metro bundler
├── nativewind-env.d.ts    # Types pour NativeWind
├── package.json           # Dépendances du projet
├── package-lock.json      # Versions exactes des dépendances
├── README.md             # Documentation du projet
├── tailwind.config.js    # Configuration TailwindCSS
└── tsconfig.json         # Configuration TypeScript
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
- **Filtres** : Filtrer les films par année

## 📄 Licence

Ce projet est sous licence **MIT**. Consulte le fichier `LICENSE` pour plus de détails.
