
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2 mt-4">
      <Label htmlFor="trade-notes">Notes</Label>
      <Textarea
        id="trade-notes"
        placeholder="Enter any notes about this trade..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
};

export default NotesField;
