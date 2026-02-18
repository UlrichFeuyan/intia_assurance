// Clients (align with backend Client model)
export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  agency: number;
  agency_name?: string;
}

export interface ClientFormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  agency: number;
}

// Agencies (align with backend Agency model)
export interface Agency {
  id: number;
  name: string;
  city: string;
}

export interface AgencyFormData {
  name: string;
  city: string;
}

// Insurances (align with backend Insurance model)
export interface Insurance {
  id: number;
  insurance_type: string;
  amount: number;
  start_date: string;
  end_date: string;
  client: number;
  agency: number;
  client_full_name?: string;
}

export interface InsuranceFormData {
  insurance_type: string;
  amount: number;
  start_date: string;
  end_date: string;
  client: number;
  agency: number;
}

// Generic paginated list response (DRF PageNumberPagination)
export interface PaginatedList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API Response
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
