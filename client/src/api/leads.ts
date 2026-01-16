import { apiFetch } from "./index";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  source: string;
}
export interface Leads {
  data: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

export interface LeadsResponse {
  status: boolean;
  message: string;
  data: Lead[];
  total: number;
  page: number;
  totalPages: number;
}
export interface LeadResponse {
  status: boolean;
  message: string;
  data: Lead;
}
export interface LeadStatsResponse {
  status: boolean;
  message: string;
  data: {
    totalLeads: number;
    converted: number;
    byStatus: {
      New: number;
      Qualified: number;
      Lost: number;
      Converted: number;
      Contacted: number;
    };
  };
}

// GET / all leads with query
const getAllLeads = (queryString: string) =>
  apiFetch<LeadsResponse>(`/leads?${queryString}`);

// GET / leads/id
const getLeadById = (id: string) => apiFetch<LeadResponse>(`/leads/${id}`);

// GET / leads/stats
const getLeadStats = () => apiFetch<LeadStatsResponse>(`/leads/stats`);

export default { getAllLeads, getLeadById, getLeadStats };
