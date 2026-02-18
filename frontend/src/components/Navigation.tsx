import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
    </nav>
  );
}
