
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PieChart, Plus } from "lucide-react";
import { TradeFilterOptions } from "./types";
import StrategyFilter from "./filters/StrategyFilter";
import ExportButton from "./ExportButton";
import { Trade } from "./types";

interface JournalFiltersProps {
  filters: TradeFilterOptions;
  showStats: boolean;
  trades: Trade[];
  onFilterChange: (filterType: keyof TradeFilterOptions, value: string) => void;
  onToggleStats: () => void;
  onAddTrade: () => void;
}

const JournalFilters: React.FC<JournalFiltersProps> = ({
  filters,
  showStats,
  trades,
  onFilterChange,
  onToggleStats,
  onAddTrade
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <h2 className="text-xl font-semibold">Trade Journal</h2>
        <div className="flex gap-2">
          <ExportButton trades={trades} />
          <Button onClick={onToggleStats} variant="outline" className="flex gap-2 items-center">
            <PieChart size={16} />
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
          <Button onClick={onAddTrade} className="flex gap-2 items-center">
            <Plus size={16} />
            Add Trade
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <div className="space-y-2">
          <Label htmlFor="filter-ticker">Filter by Ticker</Label>
          <Select 
            value={filters.ticker} 
            onValueChange={(value) => onFilterChange('ticker', value)}
          >
            <SelectTrigger id="filter-ticker" className="w-36">
              <SelectValue placeholder="All Tickers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickers</SelectItem>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="SPY">SPY</SelectItem>
              <SelectItem value="QQQ">QQQ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <StrategyFilter 
          value={filters.strategy || 'all'} 
          onChange={(value) => onFilterChange('strategy', value)} 
        />
        
        <div className="space-y-2">
          <Label htmlFor="filter-result">Filter by Result</Label>
          <Select 
            value={filters.result} 
            onValueChange={(value) => onFilterChange('result', value)}
          >
            <SelectTrigger id="filter-result" className="w-36">
              <SelectValue placeholder="All Results" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
              <SelectItem value="open">Open</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JournalFilters;
