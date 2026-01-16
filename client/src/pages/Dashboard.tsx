import { useEffect, useState } from "react";

// api calls
import leads from "../api/leads";
// icons
import { Users, UserCheck, TrendingUp, BarChart3 } from "lucide-react";
// types
import type { LeadStatus, LeadStats } from "../types/leads";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
// components
import AnalyticsCard from "../components/AnalyticsCard";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [isError, setIsError] = useState(false);

  const handleGetStats = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await leads.getLeadStats();
      if (res.status) {
        setStats({
          totalLeads: res.data.totalLeads,
          converted: res.data.converted,
          byStatus: res.data.byStatus,
        });
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    handleGetStats();
  };

  // get stats from server
  useEffect(() => {
    handleGetStats();
  }, []);

  // console.log(stats);

  return (
    <DashboardLayout>
      <div className="animate-slide-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your lead overview.
          </p>
        </div>

        {isLoading && (
          <div className="py-20">
            <LoadingSpinner size={40} />
          </div>
        )}

        {isError && (
          <ErrorState
            message="Failed to load dashboard stats"
            onRetry={() => refetch()}
          />
        )}

        {stats && (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <AnalyticsCard
                title="Total Leads"
                value={stats.totalLeads}
                icon={Users}
                colorScheme="blue"
              />
              <AnalyticsCard
                title="Converted Leads"
                value={stats.converted}
                icon={UserCheck}
                colorScheme="green"
              />
              <AnalyticsCard
                title="Conversion Rate"
                value={`${((stats.converted / stats.totalLeads) * 100).toFixed(
                  1
                )}%`}
                icon={TrendingUp}
                colorScheme="purple"
              />
              <AnalyticsCard
                title="Active Pipeline"
                value={
                  stats.totalLeads -
                  stats.converted -
                  (stats.byStatus?.Lost || 0)
                }
                icon={BarChart3}
                colorScheme="orange"
              />
            </div>

            {/* Leads by Status */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Leads by Status
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {(
                  Object.entries(stats?.byStatus) as [LeadStatus, number][]
                ).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <StatusBadge status={status} />
                    <span className="text-2xl font-bold text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
