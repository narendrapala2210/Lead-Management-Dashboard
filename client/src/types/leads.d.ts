export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Lost";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
}

export interface LeadsResponse {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadStats {
  totalLeads: number;
  converted: number;
  byStatus: Record<LeadStatus, number>;
}

export interface LeadsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus | "";
  sort?: "name" | "createdAt";
  order?: "asc" | "desc";
}
