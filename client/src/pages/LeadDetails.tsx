// packages
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
// components
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
// icons
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Globe,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import leads, { type Lead } from "../api/leads";

const LeadDetails = () => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  // const { data: lead, isLoading, isError, refetch } = useLead(id || '');

  const handleGetLeadDetails = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await leads.getLeadById(id as string);
      if (res.status) {
        setLead(res.data);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    handleGetLeadDetails();
  };

  useEffect(() => {
    handleGetLeadDetails();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="animate-slide-in">
        {/* Back Button */}
        <Link
          to="/leads"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Leads</span>
        </Link>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20">
            <LoadingSpinner size={40} />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <ErrorState
            message="Failed to load lead details"
            onRetry={() => refetch()}
          />
        )}

        {/* Lead Details */}
        {lead && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="p-6 lg:p-8 border-b border-border bg-muted/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="text-primary" size={32} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {lead.name}
                    </h1>
                    <p className="text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
                <StatusBadge status={lead.status} />
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-analytics-blue-light">
                    <Mail className="text-analytics-blue" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {lead.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-analytics-green-light">
                    <Phone className="text-analytics-green" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>

                {/* Company */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-analytics-purple-light">
                    <Building2 className="text-analytics-purple" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Company
                    </p>
                    <p className="text-foreground">{lead.company}</p>
                  </div>
                </div>

                {/* Source */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-analytics-orange-light">
                    <Globe className="text-analytics-orange" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Source
                    </p>
                    <p className="text-foreground">{lead.source}</p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="flex items-start gap-4 md:col-span-2">
                  <div className="p-3 rounded-lg bg-muted">
                    <Calendar className="text-muted-foreground" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Created Date
                    </p>
                    <p className="text-foreground">
                      {format(
                        new Date(lead.createdAt),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LeadDetails;
