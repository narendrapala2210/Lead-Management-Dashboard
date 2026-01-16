import type { LeadStatus } from "../types/leads";

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusClasses: Record<LeadStatus, string> = {
  New: "status-badge status-new",
  Contacted: "status-badge status-contacted",
  Qualified: "status-badge status-qualified",
  Converted: "status-badge status-converted",
  Lost: "status-badge status-lost",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <span className={statusClasses[status]}>{status}</span>;
};

export default StatusBadge;
