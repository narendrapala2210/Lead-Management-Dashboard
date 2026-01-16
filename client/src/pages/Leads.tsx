import { useMemo, useCallback, useState, useEffect } from "react";

//
import { useSearchParams } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/DashboardLayout";
// components
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import leads, { type Leads } from "../api/leads";

// import { useLeads } from "@/hooks/useLeads";
// types
import type { LeadStatus, LeadsQueryParams } from "../types/leads";

const Leads = () => {
  const [data, setData] = useState<Leads | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse query params with defaults
  const queryParams: LeadsQueryParams = useMemo(
    () => ({
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      search: searchParams.get("search") || "",
      status: (searchParams.get("status") as LeadStatus) || "",
      sort: "name" as const,
      order: (searchParams.get("order") as "asc" | "desc") || "asc",
    }),
    [searchParams]
  );

  const handleGetAllLeads = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);

      const search = searchParams.get("search");
      const status = searchParams.get("status");
      const sort = searchParams.get("sort");
      const page = searchParams.get("page");
      const order = searchParams.get("order");
      const limit = searchParams.get("limit");

      const query = new URLSearchParams();

      if (search) query.set("search", search);
      if (status) query.set("status", status);
      if (sort) query.set("sort", sort);
      if (page) query.set("page", page);
      if (order) query.set("order", order);
      if (limit) query.set("limit", limit);

      const queryString = query.toString();

      const res = await leads.getAllLeads(queryString);
      if (res.status) {
        setData(res);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => handleGetAllLeads();

  const updateParams = useCallback(
    (updates: Partial<LeadsQueryParams>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      // Reset to page 1 when filters change
      if ("search" in updates || "status" in updates || "order" in updates) {
        newParams.set("page", "1");
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSearchChange = (search: string) => {
    updateParams({ search });
  };

  const handleStatusChange = (status: LeadStatus | "") => {
    updateParams({ status });
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
    updateParams({ order });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    updateParams({ limit, page: 1 });
  };

  useEffect(() => {
    handleGetAllLeads();
  }, [searchParams]);

  return (
    <DashboardLayout>
      <div className="animate-slide-in">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Leads
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your leads in one place.
          </p>
        </div>

        {/* Filters */}
        <LeadFilters
          search={queryParams.search || ""}
          onSearchChange={handleSearchChange}
          status={queryParams.status || ""}
          onStatusChange={handleStatusChange}
          sortOrder={queryParams.order || "asc"}
          onSortOrderChange={handleSortOrderChange}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="py-20">
            <LoadingSpinner size={40} />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <ErrorState
            message="Failed to load leads. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {/* Data Display */}
        {data && (
          <>
            {data.data.length === 0 ? (
              <EmptyState
                title="No leads found"
                description="Try adjusting your search or filter criteria."
              />
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {data.data.length} of {data.total} leads
                </div>

                <LeadTable leads={data.data} />

                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                  pageSize={queryParams.limit || 10}
                  onPageSizeChange={handlePageSizeChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Leads;
