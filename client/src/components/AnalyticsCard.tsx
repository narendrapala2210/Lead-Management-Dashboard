import type { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorScheme: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: {
    bg: "bg-analytics-blue-light",
    icon: "text-analytics-blue",
  },
  green: {
    bg: "bg-analytics-green-light",
    icon: "text-analytics-green",
  },
  purple: {
    bg: "bg-analytics-purple-light",
    icon: "text-analytics-purple",
  },
  orange: {
    bg: "bg-analytics-orange-light",
    icon: "text-analytics-orange",
  },
};

const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  colorScheme,
}: AnalyticsCardProps) => {
  const colors = colorClasses[colorScheme];

  return (
    <div className="analytics-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trendUp ? "text-analytics-green" : "text-analytics-orange"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={colors.icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
