
import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DataDisplaySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DataDisplaySelector = ({ value, onChange }: DataDisplaySelectorProps) => {
  return (
    <RadioGroup 
      defaultValue={value}
      value={value}
      onValueChange={(value) => onChange(value)}
      className="space-y-4"
    >
      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="compact" />
          <Label htmlFor="compact" className="font-normal">Compact</Label>
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Info size={16} className="text-muted-foreground cursor-help" />
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Compact Mode</h4>
              <p className="text-sm text-muted-foreground">
                Displays more data in less space with smaller text and minimal padding
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="detailed" id="detailed" />
          <Label htmlFor="detailed" className="font-normal">Detailed</Label>
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Info size={16} className="text-muted-foreground cursor-help" />
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Detailed Mode</h4>
              <p className="text-sm text-muted-foreground">
                Displays comprehensive information with larger text and more spacing
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </RadioGroup>
  );
};

export default DataDisplaySelector;
