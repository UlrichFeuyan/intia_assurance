import {
  createBrowserRouter,
  Navigate,
  RouteObject,
} from 'react-router-dom';
import { authService } from '../services/authService';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ClientsPage from '../pages/ClientsPage';
import AgenciesPage from '../pages/AgenciesPage';
import InsurancesPage from '../pages/InsurancesPage';
import LoginPage from '../pages/LoginPage';

/**
 * Protected Route Wrapper
 * Redirects to login if user is not authenticated
 */
function ProtectedLayout() {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
}

/**
 * 404 Not Found Page
 */
function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
}

const routes: RouteObject[] = [
  // Public route
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Protected routes
  {
    element: <ProtectedLayout />,
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
  // 404 fallback
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
