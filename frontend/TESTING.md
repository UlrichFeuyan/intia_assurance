# Frontend Tests Guide

## Setup des Tests

### Installation des Dépendances

```bash
cd frontend
npm install
```

Les dépendances de test suivantes sont installées:
- **vitest** - Test runner (alternative moderne à Jest)
- **@testing-library/react** - Utilitaires pour tester les composants React
- **@testing-library/jest-dom** - Matchers additionnels
- **jsdom** - Environnement DOM pour les tests
- **@vitest/ui** - UI interactive pour les tests
- **@vitest/coverage-v8** - Couverture de code

## Scripts de Test Disponibles

### Lancer les tests (mode watch)
```bash
npm run test
```

### Lancer les tests avec UI interactive
```bash
npm run test:ui
```
Accédez à `http://localhost:51204/__vitest__/` pour voir l'interface.

### Générer un rapport de couverture
```bash
npm run test:coverage
```

## Structure des Tests

```
src/tests/
├── setup.ts                      # Configuration initiale des tests
├── services/
│   ├── authService.test.ts      # Tests du service d'authentification
│   └── clientService.test.ts    # Tests du service clients
├── utils/
│   ├── api.test.ts              # Tests des constantes API
│   └── errorHandler.test.ts     # Tests de gestion des erreurs
├── components/
│   ├── Card.test.tsx            # Tests du composant Card
│   └── Table.test.tsx           # Tests du composant Table
├── hooks/
│   └── useAuth.test.ts          # Tests du hook useAuth
└── pages/
    └── LoginPage.test.tsx       # Tests de la page de connexion
```

## Exemples de Tests

### Test d'un Service

```typescript
import { describe, it, expect } from 'vitest';
import { authService } from '../../services/authService';

describe('authService', () => {
  it('should return true if token exists', () => {
    localStorage.setItem('access_token', 'test-token');
    expect(authService.isAuthenticated()).toBe(true);
  });
});
```

### Test d'un Composant

```typescript
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card Component', () => {
  it('should render children content', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
```

### Test d'un Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';

describe('useAuth Hook', () => {
  it('should return expected properties', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
  });
});
```

## Conventions de Nommage

- Fichiers de test: `nomDuFichier.test.ts` ou `nomDuFichier.test.tsx`
- Suites de test: `describe('NomDuFichier', () => { ... })`
- Cas de test: `it('should faire quelque chose', () => { ... })`

Exemples:
```typescript
describe('LoginPage', () => {
  it('should render login form', () => { ... });
  it('should call authService.login on submit', () => { ... });
});
```

## Bonnes Pratiques

### 1. Isolation des Tests
Utilisez `beforeEach()` pour nettoyer l'état avant chaque test:

```typescript
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});
```

### 2. Utiliser des Mocks
Pour les services qui font des requêtes HTTP:

```typescript
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));
```

### 3. Tester le Comportement, pas l'Implémentation
✅ BON:
```typescript
it('should display error message when login fails', () => {
  // Test le comportement visible
});
```

❌ MAUVAIS:
```typescript
it('should call setError 2 times', () => {
  // Test l'implémentation interne
});
```

### 4. Utiliser des Assertions Claires
```typescript
// BON
expect(authService.isAuthenticated()).toBe(true);

// MAUVAIS
expect(!!authService.getToken()).toBe(true);
```

## Couverture de Code

Cibles recommandées:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

Pour voir le rapport:
```bash
npm run test:coverage
```

Ouvrez `coverage/index.html` dans le navigateur.

## Ajouter de Nouveaux Tests

### 1. Créer un nouveau fichier de test
```bash
# Pour un composant
touch src/tests/components/NewComponent.test.tsx

# Pour un service
touch src/tests/services/newService.test.ts

# Pour une page
touch src/tests/pages/NewPage.test.tsx
```

### 2. Ajouter des tests
```typescript
import { describe, it, expect } from 'vitest';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  it('should do something', () => {
    // Test logic here
  });
});
```

### 3. Lancer les tests
```bash
npm run test
```

## Debugging

### Utiliser la Console
```typescript
it('should debug', () => {
  console.log('Debug info:', someValue);
  expect(someValue).toBe(expected);
});
```

### Utiliser le Debugger
```typescript
it('should debug with debugger', () => {
  debugger; // Pause lors du test
  expect(someValue).toBe(expected);
});
```

Puis lancez les tests en mode debug:
```bash
npm run test -- --inspect-brk --inspect
```

### Utiliser l'UI Vitest
```bash
npm run test:ui
```

## Erreurs Courantes

### "ReferenceError: fetch is not defined"
Solution: jsdom n'a pas fetch par défaut. Utilisez `axios` ou mockez fetch.

### "Cannot find module '@testing-library/react'"
Solution:
```bash
npm install --save-dev @testing-library/react
```

### "Timeout of XXXms exceeded"
Solution: Augmentez le timeout ou utilisez `vi.setConfig({ testTimeout: 10000 })`

## Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)

## Prochaines Étapes

Pour une meilleure couverture de test:

1. ✅ Ajouter des tests d'intégration avec Mock Service Worker (msw)
2. ✅ Ajouter des tests E2E avec Playwright ou Cypress
3. ✅ Augmenter la couverture à 90%+
4. ✅ Ajouter des tests de performance
5. ✅ Ajouter des tests accessibility (a11y)
