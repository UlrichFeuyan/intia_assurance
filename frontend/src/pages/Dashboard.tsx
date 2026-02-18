import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { statsService } from '../services/statsService';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    agencies: 0,
    insurances: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await statsService.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="stats-grid">
        <Card>
          <div className="stat-card">
            <div className="stat-number">
              {loading ? '...' : stats.clients}
            </div>
            <div className="stat-label">Clients</div>
          </div>
        </Card>
        <Card>
          <div className="stat-card">
            <div className="stat-number">
              {loading ? '...' : stats.agencies}
            </div>
            <div className="stat-label">Agences</div>
          </div>
        </Card>
        <Card>
          <div className="stat-card">
            <div className="stat-number">
              {loading ? '...' : stats.insurances}
            </div>
            <div className="stat-label">Assurances</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
