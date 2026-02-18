# Service d'Authentification

Guide complet pour l'authentification dans l'application.

## Structure

```
services/
└── authService.ts       # Service d'authentification

hooks/
└── useAuth.ts           # Hook React pour l'authentification

pages/
└── LoginPage.tsx        # Page de connexion

types/
└── auth.ts              # Types d'authentification
```

## Utilisation

### 1. Service d'Authentification Direct

```typescript
import { authService } from '@/services/authService';

// Connexion
await authService.login({ username: 'john', password: 'password123' });

// Déconnexion
authService.logout();

// Récupérer le token
const token = authService.getToken();

// Vérifier si l'utilisateur est connecté
if (authService.isAuthenticated()) {
  // User is logged in
}
```

### 2. Hook React (Recommandé)

```typescript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { isAuthenticated, isLoading, error, login, logout, getToken } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ username: 'john', password: 'password123' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isLoading && <p>Connexion...</p>}
      {error && <p>{error}</p>}
      {isAuthenticated ? (
        <button onClick={logout}>Déconnexion</button>
      ) : (
        <button onClick={handleLogin}>Connexion</button>
      )}
    </div>
  );
}
```

### 3. Page de Connexion

La page de connexion est disponible à `/login` et gère:
- Affichage du formulaire
- Gestion des erreurs
- Redirection après connexion
- Désactivation du bouton lors du chargement

## Flux d'Authentification

1. **Connexion**
   ```
   POST /auth/login
   { username, password }
   ├─ Succès: Token stocké dans localStorage
   └─ Erreur: Message d'erreur affiché
   ```

2. **Requêtes API**
   ```
   Headers: { Authorization: "Bearer <token>" }
   ```

3. **Token Expiré (401)**
   ```
   └─ Token supprimé du localStorage
   └─ Utilisateur redirigé vers /login
   ```

4. **Déconnexion**
   ```
   authService.logout()
   ├─ Token supprimé du localStorage
   └─ Utilisateur redirigé vers /login
   ```

## API Attendue du Backend

### Endpoint de Connexion

```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "john",
  "password": "password123"
}

Response (200):
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com"
  }
}
```

### Variables d'Environnement

```env
# .env.local
VITE_API_URL=http://localhost:8000/api
```

## Constantes

```typescript
// Token localStorage key
AUTH_TOKEN_KEY = 'access_token'

// Token format
Authorization: Bearer <token>

// Requête timeout
REQUEST_TIMEOUT = 30000ms (30s)
```

## Routes Protégées

Les routes suivantes requièrent une authentification:
- `/` - Dashboard
- `/clients` - Gestion des clients
- `/agencies` - Gestion des agences
- `/insurances` - Gestion des assurances

La route `/login` est **publique**.

Si un utilisateur non authentifié accède à une route protégée, il est redirigé vers `/login`.

## Fonctionnalités

✅ **Stockage du Token**
- localStorage: `access_token`
- Automatiquement attaché aux requêtes

✅ **Gestion des Erreurs**
- Messages d'erreur localisés
- Gestion des erreurs de validation
- Support Django REST Framework

✅ **Déconnexion Automatique**
- Erreur 401 → Déconnexion + Redirection

✅ **État de Chargement**
- Hook useAuth fournit `isLoading`

✅ **Vérification d'Authentification**
- `authService.isAuthenticated()`
- Routes protégées avec Navigate

## Exemple Complet

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.login({ username, password });
      navigate('/');
    } catch (err) {
      setError('Identifiants invalides');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

## Sécurité

⚠️ **Points Importants**

1. **Ne stockez jamais le password** - Seulement le token d'accès
2. **HTTPS obligatoire** en production
3. **Token sur localStorage** - Pas de cookie HttpOnly ici
4. **Token refresh** - À implémenter si refresh token fourni par le backend
5. **CORS** - Frontend et Backend sur différents domaines

Pour améliorer:
- Ajouter validation du token côté client
- Implémenter token refresh automatique
- Utiliser sessionStorage au lieu de localStorage (optionnel)
