
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResultFieldProps {
  value: 'profit' | 'loss' | 'open';
  onChange: (value: 'profit' | 'loss' | 'open') => void;
}

const ResultField: React.FC<ResultFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade-result">Result</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="trade-result">
          <SelectValue placeholder="Select result" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="profit">Profit</SelectItem>
          <SelectItem value="loss">Loss</SelectItem>
          <SelectItem value="open">Open</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ResultField;
