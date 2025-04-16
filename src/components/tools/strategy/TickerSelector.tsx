
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

const TickerSelector: React.FC<TickerSelectorProps> = ({
  ticker,
  currentPrice,
  expiry,
  onTickerChange,
  onCurrentPriceChange,
  onExpiryChange
}) => {
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
        <Label htmlFor="expiry">Expiration Date</Label>
        <Select value={expiry} onValueChange={onExpiryChange}>
          <SelectTrigger id="expiry">
            <SelectValue placeholder="Select expiry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="04/25/2025">04/25/2025</SelectItem>
            <SelectItem value="05/16/2025">05/16/2025</SelectItem>
            <SelectItem value="05/30/2025">05/30/2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TickerSelector;
