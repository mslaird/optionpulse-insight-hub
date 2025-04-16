
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActionFieldProps {
  value: 'buy' | 'sell';
  onChange: (value: 'buy' | 'sell') => void;
}

const ActionField: React.FC<ActionFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade-action">Action</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="trade-action">
          <SelectValue placeholder="Select action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="buy">Buy</SelectItem>
          <SelectItem value="sell">Sell</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActionField;
