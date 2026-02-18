import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { clientService } from '../services/clientService';
import { Client } from '../types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr?')) {
      try {
        await clientService.delete(id);
        setClients(clients.filter((c) => c.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit navigation
    console.log('Edit client:', id);
  };

  return (
    <div className="page">
      <h1>Clients</h1>

      <Card>
        <button className="btn btn-success">Ajouter un client</button>
      </Card>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert alert-info">Chargement...</div>}

      {!loading && (
        <Card title="Liste des Clients">
          <Table
            data={clients}
            columns={[
              { key: 'name', label: 'Nom' },
              { key: 'email', label: 'Email' },
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
