import { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import { insuranceService } from '../services/insuranceService';
import { clientService } from '../services/clientService';
import type { Insurance, InsuranceFormData, Client } from '../types';
import { getErrorMessage } from '../utils/errorHandler';
import type { AxiosError } from 'axios';
import './InsurancesPage.css';

export default function InsurancesPage() {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientFilter, setClientFilter] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<InsuranceFormData>({
    policy_number: '',
    client: 0,
    agency: 0,
    type: '',
    premium: 0,
    status: 'active',
    start_date: '',
    end_date: '',
  });

  // Filter insurances based on selected client
  const filteredInsurances = useMemo(() => {
    if (clientFilter === 0) {
      return insurances;
    }
    return insurances.filter((i) => i.client === clientFilter);
  }, [insurances, clientFilter]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [insuranceData, clientData] = await Promise.all([
        insuranceService.getAll(),
        clientService.getAll(),
      ]);
      setInsurances(insuranceData);
      setClients(clientData);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'client' || name === 'agency' || name === 'premium' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      const newInsurance = await insuranceService.create(formData);
      setInsurances([...insurances, newInsurance]);
      setFormData({
        policy_number: '',
        client: 0,
        agency: 0,
        type: '',
        premium: 0,
        status: 'active',
        start_date: '',
        end_date: '',
      });
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette assurance?')) {
      return;
    }

    try {
      await insuranceService.delete(id);
      setInsurances(insurances.filter((i) => i.id !== id));
      setError(null);
    } catch (err) {
      const message = getErrorMessage(err as AxiosError);
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <h1>Assurances</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {!showForm && (
        <Card>
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
            Ajouter une assurance
          </button>
        </Card>
      )}

      {showForm && (
        <Card title="Ajouter une nouvelle assurance">
          <form onSubmit={handleSubmit} className="insurance-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="policy_number">N° de Police *</label>
                <input
                  id="policy_number"
                  type="text"
                  name="policy_number"
                  value={formData.policy_number}
                  onChange={handleInputChange}
                  placeholder="Numéro de police"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type *</label>
                <input
                  id="type"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Type d'assurance"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="client">Client *</label>
                <input
                  id="client"
                  type="number"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="ID du client"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="agency">Agence *</label>
                <input
                  id="agency"
                  type="number"
                  name="agency"
                  value={formData.agency}
                  onChange={handleInputChange}
                  placeholder="ID de l'agence"
                  required
                  disabled={formLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="premium">Prime *</label>
                <input
                  id="premium"
                  type="number"
                  step="0.01"
                  name="premium"
                  value={formData.premium}
                  onChange={handleInputChange}
                  placeholder="Montant de la prime"
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Statut *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  disabled={formLoading}
                  style={{ padding: '10px', borderRadius: '4px', border: '1px solid #bdc3c7' }}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="expired">Expiré</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Date de début *</label>
                <input
                  id="start_date"
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_date">Date de fin *</label>
                <input
                  id="end_date"
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
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

      {loading && <div className="alert alert-info">Chargement des assurances...</div>}

      {!loading && (
        <>
          <Card>
            <div className="filter-section">
              <label htmlFor="clientFilter">Filtrer par client:</label>
              <select
                id="clientFilter"
                value={clientFilter}
                onChange={(e) => setClientFilter(parseInt(e.target.value) || 0)}
                className="filter-select"
              >
                <option value={0}>Tous les clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <span className="filter-info">
                {filteredInsurances.length} assurance(s)
              </span>
            </div>
          </Card>

          <Card title="Liste des Assurances">
            <Table
              data={filteredInsurances}
              columns={[
                { key: 'policy_number', label: 'N° de police' },
                { key: 'type', label: 'Type' },
                { key: 'premium', label: 'Prime' },
                { key: 'status', label: 'Statut' },
                { key: 'start_date', label: 'Début' },
                { key: 'end_date', label: 'Fin' },
              ]}
              onDelete={handleDelete}
            />
          </Card>
        </>
      )}
    </div>
  );
}
