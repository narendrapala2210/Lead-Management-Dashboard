import { Search, Filter, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import type { LeadStatus } from "../types/leads";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: LeadStatus | "";
  onStatusChange: (value: LeadStatus | "") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
}

const statuses: (LeadStatus | "")[] = [
  "",
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Lost",
];

const LeadFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortOrder,
  onSortOrderChange,
}: LeadFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-search"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <Filter
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus | "")}
          className="pl-10 pr-8 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer min-w-[150px]"
        >
          <option value="">All Status</option>
          {statuses.slice(1).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Order */}
      <div className="flex gap-2">
        <button
          onClick={() => onSortOrderChange("asc")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
            sortOrder === "asc"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border hover:bg-muted"
          }`}
        >
          <ArrowUpAZ size={18} />
          <span className="hidden sm:inline">A → Z</span>
        </button>
        <button
          onClick={() => onSortOrderChange("desc")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
            sortOrder === "desc"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border hover:bg-muted"
          }`}
        >
          <ArrowDownAZ size={18} />
          <span className="hidden sm:inline">Z → A</span>
        </button>
      </div>
    </div>
  );
};

export default LeadFilters;
