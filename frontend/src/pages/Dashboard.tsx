import { useState, useEffect } from 'react';
import Card from '../components/Card';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    agencies: 0,
    insurances: 0,
  });

  useEffect(() => {
    // TODO: Fetch statistics from API
    setStats({
      clients: 150,
      agencies: 12,
      insurances: 450,
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <Card>
          <div className="stat-card">
            <div className="stat-number">{stats.clients}</div>
            <div className="stat-label">Clients</div>
          </div>
        </Card>
        <Card>
          <div className="stat-card">
            <div className="stat-number">{stats.agencies}</div>
            <div className="stat-label">Agences</div>
          </div>
        </Card>
        <Card>
          <div className="stat-card">
            <div className="stat-number">{stats.insurances}</div>
            <div className="stat-label">Assurances</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
