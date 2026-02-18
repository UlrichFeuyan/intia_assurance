import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { agencyService } from '../services/agencyService';
import { Agency } from '../types';

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      setLoading(true);
      const data = await agencyService.getAll();
      setAgencies(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des agences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await agencyService.delete(id);
        setAgencies(agencies.filter((a) => a.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit navigation
    console.log('Edit agency:', id);
  };

  return (
    <div className="page">
      <h1>Agences</h1>

      <Card>
        <button className="btn btn-success">Ajouter une agence</button>
      </Card>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert alert-info">Chargement...</div>}

      {!loading && (
        <Card title="Liste des Agences">
          <Table
            data={agencies}
            columns={[
              { key: 'name', label: 'Nom' },
              { key: 'code', label: 'Code' },
              { key: 'phone', label: 'Téléphone' },
              { key: 'address', label: 'Adresse' },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      )}
    </div>
  );
}
