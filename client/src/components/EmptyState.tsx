import { Users } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No data found",
  description = "There are no items to display.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="p-4 bg-muted rounded-full mb-4">
        <Users className="text-muted-foreground" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
};

export default EmptyState;
