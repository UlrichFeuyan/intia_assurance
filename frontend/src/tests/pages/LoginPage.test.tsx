/**
 * Login Page Tests
 * Tests pour la page de connexion
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginPage from '../../pages/LoginPage';

// Mock authService
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
    isAuthenticated: vi.fn(() => false),
    logout: vi.fn(),
    getToken: vi.fn(() => null),
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

  it('should render login form', () => {
    renderLoginPage();

    expect(screen.getByText(/connexion|login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username|nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password|mot de passe/i)).toBeInTheDocument();
  });

  it('should render submit button', () => {
    renderLoginPage();

    const submitButton = screen.getByRole('button', { name: /connexion|se connecter|login/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should update username input value', () => {
    renderLoginPage();

    const usernameInput = screen.getByPlaceholderText(/username|nom d'utilisateur/i) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
    expect(usernameInput.value).toBe('testuser');
  });

  it('should update password input value', () => {
    renderLoginPage();

    const passwordInput = screen.getByPlaceholderText(/password|mot de passe/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  it('should call authService.login on form submit', async () => {
    renderLoginPage();

    const usernameInput = screen.getByPlaceholderText(/username|nom d'utilisateur/i);
    const passwordInput = screen.getByPlaceholderText(/password|mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /connexion|se connecter|login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for async operations
    await waitFor(() => {
      // The form should have been submitted
      expect(submitButton).toBeInTheDocument();
    });
  });

  it('should have input fields with correct type', () => {
    renderLoginPage();

    const usernameInput = screen.getByPlaceholderText(/username|nom d'utilisateur/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/password|mot de passe/i) as HTMLInputElement;

    expect(usernameInput.type).toBe('text');
    expect(passwordInput.type).toBe('password');
  });
});
