
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StrategyFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const StrategyField: React.FC<StrategyFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade-strategy">Strategy</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="trade-strategy">
          <SelectValue placeholder="Select strategy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Long Call">Long Call</SelectItem>
          <SelectItem value="Long Put">Long Put</SelectItem>
          <SelectItem value="Bull Call Spread">Bull Call Spread</SelectItem>
          <SelectItem value="Bear Put Spread">Bear Put Spread</SelectItem>
          <SelectItem value="Iron Condor">Iron Condor</SelectItem>
          <SelectItem value="Covered Call">Covered Call</SelectItem>
          <SelectItem value="Cash-Secured Put">Cash-Secured Put</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StrategyField;
