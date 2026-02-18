// Clients
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Agencies
export interface Agency {
  id: number;
  name: string;
  code: string;
  address: string;
  phone: string;
  created_at: string;
}

export interface AgencyFormData {
  name: string;
  code: string;
  address: string;
  phone: string;
}

// Insurances
export interface Insurance {
  id: number;
  policy_number: string;
  client: number;
  agency: number;
  type: string;
  premium: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface InsuranceFormData {
  policy_number: string;
  client: number;
  agency: number;
  type: string;
  premium: number;
  status: string;
  start_date: string;
  end_date: string;
}

// API Response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
