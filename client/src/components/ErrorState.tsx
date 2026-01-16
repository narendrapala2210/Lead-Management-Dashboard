import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="p-4 bg-destructive/10 rounded-full mb-4">
        <AlertCircle className="text-destructive" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
      <p className="text-muted-foreground text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
