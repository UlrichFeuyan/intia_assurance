import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ClientsPage from '../pages/ClientsPage';
import AgenciesPage from '../pages/AgenciesPage';
import InsurancesPage from '../pages/InsurancesPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
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
