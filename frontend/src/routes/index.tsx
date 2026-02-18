import { createBrowserRouter, Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ClientsPage from '../pages/ClientsPage';
import AgenciesPage from '../pages/AgenciesPage';
import InsurancesPage from '../pages/InsurancesPage';
import LoginPage from '../pages/LoginPage';

/**
 * Protected Route
 * Redirects to login if user is not authenticated
 */
function ProtectedRouteElement() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRouteElement />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/clients',
        element: <ClientsPage />,
      },
      {
        path: '/agencies',
        element: <AgenciesPage />,
      },
      {
        path: '/insurances',
        element: <InsurancesPage />,
      },
    ],
  },
]);
