import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { clientService } from '../services/clientService';
import type { Client, ClientFormData } from '../types';
import { getErrorMessage } from '../utils/errorHandler';
import type { AxiosError } from 'axios';
import './ClientsPage.css';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

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
      const message = getErrorMessage(err as AxiosError);
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      const newClient = await clientService.create(formData);
      setClients([...clients, newClient]);
      setFormData({ name: '', email: '', phone: '', address: '' });
      setShowForm(false);
    } catch (err) {
      const message = getErrorMessage(err as AxiosError);
      setError(message);
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce client?')) {
      return;
    }

    try {
      await clientService.delete(id);
      setClients(clients.filter((c) => c.id !== id));
      setError(null);
    } catch (err) {
      const message = getErrorMessage(err as AxiosError);
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Clients</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {!showForm && (
        <Card>
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            Ajouter un client
          </button>
        </Card>
      )}

      {showForm && (
        <Card title="Ajouter un nouveau client">
          <form onSubmit={handleSubmit} className="client-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom du client"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email du client"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Numéro de téléphone"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse *</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Adresse du client"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formLoading}
              >
                {formLoading ? 'Création...' : 'Créer'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
                disabled={formLoading}
              >
                Annuler
              </button>
            </div>
          </form>
        </Card>
      )}

      {loading && <div className="alert alert-info">Chargement des clients...</div>}

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
            onDelete={handleDelete}
          />
        </Card>
      )}
    </div>
  );
}
