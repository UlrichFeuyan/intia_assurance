import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { agencyService } from '../services/agencyService';
import { Agency, AgencyFormData } from '../types';
import { getErrorMessage } from '../utils/errorHandler';
import { AxiosError } from 'axios';
import './AgenciesPage.css';

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<AgencyFormData>({
    name: '',
    code: '',
    address: '',
    phone: '',
  });

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
      const newAgency = await agencyService.create(formData);
      setAgencies([...agencies, newAgency]);
      setFormData({ name: '', code: '', address: '', phone: '' });
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette agence?')) {
      return;
    }

    try {
      await agencyService.delete(id);
      setAgencies(agencies.filter((a) => a.id !== id));
      setError(null);
    } catch (err) {
      const message = getErrorMessage(err as AxiosError);
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Agences</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {!showForm && (
        <Card>
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            Ajouter une agence
          </button>
        </Card>
      )}

      {showForm && (
        <Card title="Ajouter une nouvelle agence">
          <form onSubmit={handleSubmit} className="agency-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom de l'agence"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Code *</label>
                <input
                  id="code"
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Code de l'agence"
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
                  placeholder="Adresse de l'agence"
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

      {loading && <div className="alert alert-info">Chargement des agences...</div>}

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
            onDelete={handleDelete}
          />
        </Card>
      )}
    </div>
  );
}
