/**
 * Example: How to Write Tests
 * Exemples pratiques pour écrire des tests
 */

// ============================================================================
// 1. TEST D'UN SERVICE (authService)
// ============================================================================

/*
import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from '../../services/authService';

describe('authService', () => {
  // Avant chaque test, nettoyer localStorage
  beforeEach(() => {
    localStorage.clear();
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      // ARRANGE - Préparer
      localStorage.setItem('access_token', 'test-token');
      
      // ACT - Agir
      const result = authService.isAuthenticated();
      
      // ASSERT - Vérifier
      expect(result).toBe(true);
    });

    it('should return false when no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('getToken', () => {
    it('should return stored token', () => {
      const token = 'test-token-123';
      localStorage.setItem('access_token', token);
      
      expect(authService.getToken()).toBe(token);
    });

    it('should return null for missing token', () => {
      expect(authService.getToken()).toBeNull();
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('access_token', 'test-token');
      
      authService.logout();
      
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});
*/

// ============================================================================
// 2. TEST D'UN COMPOSANT (Card)
// ============================================================================

/*
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Important pour toHaveProperty, toBeInTheDocument
import Card from '../../components/Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render children content', () => {
      // ARRANGE
      const testContent = 'Test content';
      
      // ACT
      render(
        <Card>
          <p>{testContent}</p>
        </Card>
      );
      
      // ASSERT
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      const title = 'Test Title';
      
      render(
        <Card title={title}>
          <p>Content</p>
        </Card>
      );
      
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <Card title="Multi">
          <h3>Heading</h3>
          <p>Paragraph</p>
          <button>Button</button>
        </Card>
      );

      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have correct CSS class', () => {
      const { container } = render(
        <Card>
          <p>Content</p>
        </Card>
      );
      
      const cardElement = container.querySelector('.card');
      expect(cardElement).toBeInTheDocument();
    });
  });
});
*/

// ============================================================================
// 3. TEST D'UNE PAGE AVEC FORMULAIRE (LoginPage)
// ============================================================================

/*
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from '../../pages/LoginPage';

// Mock du service d'authentification
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(() => Promise.resolve('token')),
  },
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  describe('Form Rendering', () => {
    it('should render username input', () => {
      renderLoginPage();
      
      const input = screen.getByPlaceholderText(/username/i);
      expect(input).toBeInTheDocument();
    });

    it('should render password input with correct type', () => {
      renderLoginPage();
      
      const input = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.type).toBe('password');
    });

    it('should render submit button', () => {
      renderLoginPage();
      
      const button = screen.getByRole('button', { name: /connexion|login/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should update username when user types', () => {
      renderLoginPage();
      
      const input = screen.getByPlaceholderText(/username/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'testuser' } });
      
      expect(input.value).toBe('testuser');
    });

    it('should update password when user types', () => {
      renderLoginPage();
      
      const input = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'password123' } });
      
      expect(input.value).toBe('password123');
    });
  });

  describe('Form Submission', () => {
    it('should call authService.login on submit', async () => {
      const { authService } = await import('../../services/authService');
      
      renderLoginPage();
      
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      const button = screen.getByRole('button', { name: /connexion|login/i });

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
*/

// ============================================================================
// 4. TEST D'UN HOOK (useAuth)
// ============================================================================

/*
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';

vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(() => Promise.resolve('token')),
    logout: vi.fn(),
    isAuthenticated: vi.fn(() => true),
    getToken: vi.fn(() => 'test-token'),
  },
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update state when logout is called', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should have login function', () => {
    const { result } = renderHook(() => useAuth());

    expect(typeof result.current.login).toBe('function');
  });
});
*/

// ============================================================================
// 5. TEST D'UN UTILITAIRE (errorHandler)
// ============================================================================

/*
import { describe, it, expect } from 'vitest';
import { getErrorMessage, isAuthError } from '../../utils/errorHandler';
import type { AxiosError } from 'axios';

describe('errorHandler', () => {
  describe('getErrorMessage', () => {
    it('should return connection error for no response', () => {
      const error = { response: undefined } as AxiosError;
      
      const message = getErrorMessage(error);
      
      expect(message).toContain('connexion');
    });

    it('should return 401 message for auth errors', () => {
      const error = {
        response: {
          status: 401,
          data: {},
        },
      } as unknown as AxiosError;
      
      const message = getErrorMessage(error);
      
      expect(message).toContain('Session expirée');
    });

    it('should return 404 message for not found', () => {
      const error = {
        response: {
          status: 404,
          data: {},
        },
      } as unknown as AxiosError;
      
      const message = getErrorMessage(error);
      
      expect(message).toBe('Ressource non trouvée');
    });
  });

  describe('isAuthError', () => {
    it('should return true for 401 status', () => {
      const error = {
        response: { status: 401, data: {} },
      } as unknown as AxiosError;

      expect(isAuthError(error)).toBe(true);
    });

    it('should return false for other statuses', () => {
      const error = {
        response: { status: 400, data: {} },
      } as unknown as AxiosError;

      expect(isAuthError(error)).toBe(false);
    });
  });
});
*/

// ============================================================================
// MÉTHODES / ASSERTIONS COURANTES
// ============================================================================

/*
// ✅ ASSERTIONS DE BASE
expect(value).toBe(expected);              // ===
expect(value).toEqual(expected);           // Comparaison profonde
expect(value).toBeTruthy();                // true
expect(value).toBeFalsy();                 // false
expect(value).toBeNull();                  // null
expect(value).toBeUndefined();             // undefined
expect(value).toBeDefined();               // not undefined

// ✅ ASSERTIONS DE TEXTE
expect(element).toHaveTextContent('text');
expect(element).toHaveValue('value');
expect(element).toHaveAttribute('attr', 'value');
expect(element).toHaveClass('className');

// ✅ ASSERTIONS REACT TESTING LIBRARY
expect(element).toBeInTheDocument();       // Élément exists dans le DOM
expect(element).toBeVisible();             // Élément visible
expect(element).toBeDisabled();            // Input disabled
expect(element).toBeEnabled();             // Input enabled

// ✅ ASSERTIONS NUMÉRIQUES
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(4.1, 0.1);

// ✅ ASSERTIONS ARRAY/OBJECT
expect(array).toHaveLength(3);
expect(array).toContain('item');
expect(object).toHaveProperty('key');
expect(object).toHaveProperty('key', 'value');

// ✅ ASSERTIONS FONCTION
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenCalledTimes(2);
*/

// ============================================================================
// EXEMPLES DE QUERIES TESTING LIBRARY
// ============================================================================

/*
import { screen } from '@testing-library/react';

// PAR RÔLE (Recommandé)
screen.getByRole('button', { name: /click me/i });
screen.getByRole('textbox', { name: /username/i });
screen.getByRole('heading', { level: 1 });

// PAR TEXTE
screen.getByText('Hello World');
screen.getByText(/hello/i);  // Regex

// PAR LABEL
screen.getByLabelText('Username');

// PAR PLACEHOLDER
screen.getByPlaceholderText('Enter username');

// PAR TEST ID
screen.getByTestId('logout-button');

// VARIANTES
screen.getAllByText(...);        // Retourne un array
screen.queryByText(...);         // Retourne null si not found (pas d'erreur)
screen.findByText(...);          // Async, attends que l'élément existe
*/

export {};  // Just for TypeScript
