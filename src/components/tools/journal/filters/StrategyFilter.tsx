
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StrategyFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const StrategyFilter: React.FC<StrategyFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="filter-strategy">Strategy Type</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="filter-strategy" className="w-36">
          <SelectValue placeholder="All Strategies" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Strategies</SelectItem>
          <SelectItem value="Long Call">Long Call</SelectItem>
          <SelectItem value="Long Put">Long Put</SelectItem>
          <SelectItem value="Credit Spread">Credit Spread</SelectItem>
          <SelectItem value="Debit Spread">Debit Spread</SelectItem>
          <SelectItem value="Iron Condor">Iron Condor</SelectItem>
          <SelectItem value="Straddle">Straddle</SelectItem>
          <SelectItem value="Strangle">Strangle</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StrategyFilter;
