
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const TickerField: React.FC<TickerFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade-ticker">Ticker</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="trade-ticker">
          <SelectValue placeholder="Select ticker" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AAPL">AAPL</SelectItem>
          <SelectItem value="SPY">SPY</SelectItem>
          <SelectItem value="QQQ">QQQ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TickerField;
