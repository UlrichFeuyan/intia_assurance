import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>Intia Assurance</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link
            to="/"
            className={isActive('/') ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/clients"
            className={isActive('/clients') ? 'active' : ''}
          >
            Clients
          </Link>
        </li>
        <li>
          <Link
            to="/agencies"
            className={isActive('/agencies') ? 'active' : ''}
          >
            Agences
          </Link>
        </li>
        <li>
          <Link
            to="/insurances"
            className={isActive('/insurances') ? 'active' : ''}
          >
            Assurances
          </Link>
        </li>
      </ul>
      <div className="nav-footer">
        <button className="btn-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
