
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter, Calendar, DollarSign, Target } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface OptionsFilterProps {
  expirationDate: string;
  setExpirationDate: (value: string) => void;
  optionType: string;
  setOptionType: (value: string) => void;
  showOpportunities: boolean;
  setShowOpportunities: (value: boolean) => void;
  strategyFilter: string;
  setStrategyFilter: (value: string) => void;
}

const OptionsFilter = ({
  expirationDate,
  setExpirationDate,
  optionType,
  setOptionType,
  showOpportunities,
  setShowOpportunities,
  strategyFilter,
  setStrategyFilter
}: OptionsFilterProps) => {
  // Mock data for expiration dates
  const expirationDates = [
    "2025-04-18",
    "2025-04-25",
    "2025-05-02",
    "2025-05-16",
    "2025-06-20",
    "2025-07-18",
    "2025-09-19",
    "2026-01-16"
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Calendar size={16} className="text-muted-foreground" />
        <Select value={expirationDate} onValueChange={setExpirationDate}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Expiration" />
          </SelectTrigger>
          <SelectContent>
            {expirationDates.map((date) => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter size={16} className="text-muted-foreground" />
        <Select value={optionType} onValueChange={setOptionType}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Options</SelectItem>
            <SelectItem value="calls">Calls Only</SelectItem>
            <SelectItem value="puts">Puts Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Target size={16} className="text-muted-foreground" />
        <Select value={strategyFilter} onValueChange={setStrategyFilter}>
          <SelectTrigger className="w-full sm:w-40 max-w-[200px]">
            <SelectValue placeholder="Strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strategies</SelectItem>
            <SelectItem value="high-premium-calls">High-Premium Calls</SelectItem>
            <SelectItem value="otm-puts">Out-of-the-Money Puts</SelectItem>
            <SelectItem value="naked-calls">Naked Call Opportunities</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Switch
          id="show-opportunities"
          checked={showOpportunities}
          onCheckedChange={setShowOpportunities}
        />
        <Label htmlFor="show-opportunities" className="text-sm">Show Opportunities</Label>
      </div>
    </div>
  );
};

export default OptionsFilter;

