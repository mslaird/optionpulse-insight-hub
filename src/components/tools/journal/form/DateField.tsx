
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade-date">Date</Label>
      <Input
        id="trade-date"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateField;
