import type { Lead } from "../types/leads";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import { ChevronRight, Building2, Mail, Phone } from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
}

const LeadTable = ({ leads }: LeadTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead._id} className="table-row-hover">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{lead.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground">{lead.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground">{lead.company}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground">{lead.source}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/leads/${lead._id}`}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    View
                    <ChevronRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {leads.map((lead) => (
          <Link
            key={lead._id}
            to={`/leads/${lead._id}`}
            className="block bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow animate-fade-in"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{lead.name}</h3>
                <StatusBadge status={lead.status} />
              </div>
              <ChevronRight className="text-muted-foreground" size={20} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={14} />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 size={14} />
                <span>{lead.company}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={14} />
                <span>{lead.phone}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default LeadTable;
