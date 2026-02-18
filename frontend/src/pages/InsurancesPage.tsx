import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { insuranceService } from '../services/insuranceService';
import { Insurance } from '../types';

export default function InsurancesPage() {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      setLoading(true);
      const data = await insuranceService.getAll();
      setInsurances(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des assurances');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await insuranceService.delete(id);
        setInsurances(insurances.filter((i) => i.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit navigation
    console.log('Edit insurance:', id);
  };

  return (
    <div className="page">
      <h1>Assurances</h1>

      <Card>
        <button className="btn btn-success">Ajouter une assurance</button>
      </Card>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert alert-info">Chargement...</div>}

      {!loading && (
        <Card title="Liste des Assurances">
          <Table
            data={insurances}
            columns={[
              { key: 'policy_number', label: 'N° de police' },
              { key: 'type', label: 'Type' },
              { key: 'premium', label: 'Prime' },
              { key: 'status', label: 'Statut' },
              { key: 'start_date', label: 'Début' },
              { key: 'end_date', label: 'Fin' },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      )}
    </div>
  );
}
