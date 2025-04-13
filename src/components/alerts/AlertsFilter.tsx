
import { Button } from "@/components/ui/button";
import { AlertType } from "@/pages/Alerts";
import { cn } from "@/lib/utils";

interface AlertsFilterProps {
  currentFilter: AlertType;
  onFilterChange: (type: AlertType) => void;
}

const AlertsFilter = ({ currentFilter, onFilterChange }: AlertsFilterProps) => {
  const filterOptions: { value: AlertType; label: string }[] = [
    { value: "all", label: "All Alerts" },
    { value: "volatility", label: "Volatility" },
    { value: "prediction", label: "AI Predictions" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          variant={currentFilter === option.value ? "default" : "outline"}
          className={cn(
            "transition-all",
            currentFilter === option.value 
              ? "bg-optionpulse-blue text-white" 
              : "bg-sidebar hover:bg-sidebar-accent"
          )}
          size="sm"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default AlertsFilter;
