
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TickerSelectorProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const TickerSelector: React.FC<TickerSelectorProps> = ({
  ticker,
  currentPrice,
  expiry,
  onTickerChange,
  onCurrentPriceChange,
  onExpiryChange,
  showLeaps = false
}) => {
  // Generate standard expiry dates (short-term)
  const standardExpiryDates = [
    "04/25/2025",
    "05/16/2025",
    "05/30/2025"
  ];

  // Generate LEAPS expiry dates (long-term)
  const leapsExpiryDates = [
    "01/15/2026",
    "06/18/2026",
    "01/21/2027"
  ];

  // Choose expiry dates based on showLeaps prop
  const expiryDates = showLeaps ? [...standardExpiryDates, ...leapsExpiryDates] : standardExpiryDates;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="ticker">Ticker</Label>
        <Select
          value={ticker}
          onValueChange={onTickerChange}
        >
          <SelectTrigger id="ticker">
            <SelectValue placeholder="Select ticker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AAPL">AAPL</SelectItem>
            <SelectItem value="SPY">SPY</SelectItem>
            <SelectItem value="QQQ">QQQ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="current-price">Current Price</Label>
        <Input
          id="current-price"
          type="number"
          value={currentPrice}
          onChange={(e) => onCurrentPriceChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiry" className="flex items-center gap-2">
          Expiration Date
          {showLeaps && (
            <Badge variant="outline" className="ml-1 bg-purple-500/10 text-purple-400 border-purple-500/30">
              <Clock size={12} className="mr-1" />LEAPS Available
            </Badge>
          )}
        </Label>
        <Select value={expiry} onValueChange={onExpiryChange}>
          <SelectTrigger id="expiry">
            <SelectValue placeholder="Select expiry" />
          </SelectTrigger>
          <SelectContent>
            {expiryDates.map(date => {
              const isLeaps = leapsExpiryDates.includes(date);
              return (
                <SelectItem key={date} value={date}>
                  {date}
                  {isLeaps && showLeaps && <span className="ml-2 text-purple-400 text-xs">(LEAPS)</span>}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TickerSelector;
