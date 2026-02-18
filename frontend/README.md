# Frontend - Intia Assurance

Application React TypeScript pour la gestion des assurances.

## Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.tsx       # Layout principal avec navigation
│   ├── Navigation.tsx   # Barre de navigation
│   ├── Table.tsx        # Composant tableau générique
│   └── Card.tsx         # Composant carte
├── pages/               # Pages de l'application
│   ├── Dashboard.tsx    # Page d'accueil
│   ├── ClientsPage.tsx  # Gestion des clients
│   ├── AgenciesPage.tsx # Gestion des agences
│   └── InsurancesPage.tsx # Gestion des assurances
├── services/            # Services API
│   ├── axiosInstance.ts # Instance Axios configurée
│   ├── clientService.ts # Service clients
│   ├── agencyService.ts # Service agences
│   └── insuranceService.ts # Service assurances
├── routes/              # Configuration du routage
│   └── index.tsx        # Définition des routes
├── types/               # Types TypeScript
│   └── index.ts         # Interfaces et types
├── utils/               # Fonctions utilitaires
│   └── api.ts           # Configuration API
├── App.tsx              # Composant principal
└── main.tsx             # Point d'entrée
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Configuration API

Créer un fichier `.env.local` à la racine du projet:

```env
VITE_API_URL=http://localhost:8000/api
```

## Technologies

- **React 19** - Framework UI
- **TypeScript** - Langage typé
- **Vite** - Build tool
- **React Router** - Routage
- **Axios** - Client HTTP
- **ESLint** - Linting

## Architecture

### Composants
- **Fonctionnels** avec hooks
- **Réutilisables** et découplés
- **Typés** avec TypeScript

### Services
- Communication API centralisée
- Intercepteurs Axios pour authentification et erreurs
- CRUD complet pour chaque entité

### Routes
- Structure imbriquée avec Layout
- Navigation automatique avec React Router
- Outlet pour le contenu dynamique

## Principes

- ✅ Pas de sur-engineering
- ✅ Code simple et lisible
- ✅ Séparation des responsabilités
- ✅ Réutilisabilité des composants
- ✅ Type safety avec TypeScript
