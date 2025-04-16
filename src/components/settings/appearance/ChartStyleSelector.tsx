
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChartStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ChartStyleSelector = ({ value, onChange }: ChartStyleSelectorProps) => {
  return (
    <RadioGroup 
      defaultValue={value}
      value={value}
      onValueChange={(value) => onChange(value)}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="candlestick" id="candlestick" />
        <Label htmlFor="candlestick" className="font-normal">Candlestick</Label>
      </div>
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="line" id="line" />
        <Label htmlFor="line" className="font-normal">Line Chart</Label>
      </div>
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="area" id="area" />
        <Label htmlFor="area" className="font-normal">Area Chart</Label>
      </div>
    </RadioGroup>
  );
};

export default ChartStyleSelector;
