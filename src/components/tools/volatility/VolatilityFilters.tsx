
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface VolatilityFiltersProps {
  tickerFilter: string;
  setTickerFilter: (value: string) => void;
  expiryFilter: string;
  setExpiryFilter: (value: string) => void;
  minIVFilter: number;
  setMinIVFilter: (value: number) => void;
  uniqueExpiryDates: string[];
  onRefresh: () => void;
}

const VolatilityFilters = ({
  tickerFilter,
  setTickerFilter,
  expiryFilter,
  setExpiryFilter,
  minIVFilter,
  setMinIVFilter,
  uniqueExpiryDates,
  onRefresh,
}: VolatilityFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="ticker-filter">Filter by Ticker</Label>
        <Select value={tickerFilter} onValueChange={setTickerFilter}>
          <SelectTrigger id="ticker-filter">
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
      
      <div className="space-y-2">
        <Label htmlFor="expiry-filter">Filter by Expiry</Label>
        <Select value={expiryFilter} onValueChange={setExpiryFilter}>
          <SelectTrigger id="expiry-filter">
            <SelectValue placeholder="All Expiries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Expiries</SelectItem>
            {uniqueExpiryDates.map(date => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="min-iv">Minimum IV (%)</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="min-iv"
            type="number"
            min="0"
            max="100"
            value={minIVFilter}
            onChange={(e) => setMinIVFilter(parseInt(e.target.value))}
          />
          <span className="font-medium">%</span>
        </div>
      </div>
      
      <div className="flex items-end">
        <Button onClick={onRefresh} className="w-full flex items-center justify-center gap-2">
          <RefreshCw size={16} />
          <span>Refresh Data</span>
        </Button>
      </div>
    </div>
  );
};

export default VolatilityFilters;
