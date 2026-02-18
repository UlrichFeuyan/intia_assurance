# Configuration Axios

Guide complet pour utiliser la configuration Axios dans l'application.

## Structure

```
services/
├── axiosInstance.ts      # Instance Axios configurée avec intercepteurs
├── apiService.ts         # Factory pour services CRUD génériques
├── clientService.ts      # Service clients
├── agencyService.ts      # Service agences
└── insuranceService.ts   # Service assurances

utils/
├── api.ts                # Configuration API (baseURL, endpoints, constantes)
└── errorHandler.ts       # Utilitaires de gestion des erreurs
```

## Configuration de l'Environnement

Créer un fichier `.env.local` à la racine du projet:

```env
VITE_API_URL=http://localhost:8000/api
```

## Utilisation de l'Instance Axios

### 1. Import Simple

```typescript
import axiosInstance from '@/services/axiosInstance';

// GET request
const response = await axiosInstance.get('/clients');

// POST request
const data = await axiosInstance.post('/clients', { name: 'John' });

// PUT request
await axiosInstance.put('/clients/1', { name: 'Jane' });

// DELETE request
await axiosInstance.delete('/clients/1');
```

### 2. Utiliser un Service

```typescript
import { clientService } from '@/services/clientService';

// Get all clients
const clients = await clientService.getAll();

// Get single client
const client = await clientService.getById(1);

// Create client
const newClient = await clientService.create({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123456789',
  address: '123 Main St',
});

// Update client
const updated = await clientService.update(1, { name: 'Jane Doe' });

// Delete client
await clientService.delete(1);
```

### 3. Gestion des Erreurs

```typescript
import { getErrorMessage, isValidationError } from '@/utils/errorHandler';

try {
  await clientService.create(data);
} catch (error) {
  const message = getErrorMessage(error as AxiosError);
  console.error('Error:', message);

  if (isValidationError(error as AxiosError)) {
    // Handle validation errors
  }
}
```

## Fonctionnalités

### ✅ JWT Token Automatique

Le token est automatiquement attaché à chaque requête:

```
Authorization: Bearer <token>
```

Stockage: `localStorage['access_token']`

### ✅ Gestion Globale des Erreurs

**401 Unauthorized** → Supprime le token et redirige vers `/login`

**403 Forbidden** → Log l'erreur

**500+ Server Error** → Log l'erreur serveur

### ✅ Configuration de Base

- **baseURL**: Défini par `VITE_API_URL`
- **timeout**: 30 secondes
- **Content-Type**: `application/json`
- **Header d'authentification**: `Authorization: Bearer <token>`

## Ajouter un Token (après connexion)

```typescript
// After successful login
localStorage.setItem('access_token', jwtToken);

// The interceptor will automatically add it to next requests
```

## Supprimer le Token (déconnexion)

```typescript
// Before logout
localStorage.removeItem('access_token');
```

## Personnalisation

### Ajouter un Interceptor Custom

```typescript
import axiosInstance from '@/services/axiosInstance';

axiosInstance.interceptors.request.use((config) => {
  // Custom logic before request
  return config;
});
```

### Modifier la Configuration

Éditer `src/utils/api.ts`:

```typescript
export const REQUEST_TIMEOUT = 60000; // Change timeout
export const AUTH_TOKEN_KEY = 'custom_token_key'; // Change token key
```

## Gestion des Erreurs Détaillées

```typescript
import {
  getErrorMessage,
  isAuthError,
  isPermissionError,
  isValidationError,
  getValidationErrors,
} from '@/utils/errorHandler';

try {
  await apiCall();
} catch (error) {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (isAuthError(axiosError)) {
    // Handle auth error
  } else if (isPermissionError(axiosError)) {
    // Handle permission error
  } else if (isValidationError(axiosError)) {
    // Handle validation errors
    const errors = getValidationErrors(axiosError);
    console.log(errors);
  }
}
```

## Principes

- ✅ Configuration centralisée
- ✅ JWT automatique
- ✅ Gestion d'erreurs globale
- ✅ Type-safe avec TypeScript
- ✅ Réutilisabilité des services
- ✅ Simple et lisible
