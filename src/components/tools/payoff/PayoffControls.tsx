
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
import { Button } from "@/components/ui/button";

interface PayoffControlsProps {
  ticker: string;
  setTicker: (value: string) => void;
  strike: number;
  setStrike: (value: number) => void;
  premium: number;
  setPremium: (value: number) => void;
  strategy: string;
  setStrategy: (value: string) => void;
  showLeaps?: boolean;
  onGeneratePayoff: () => void;
}

const PayoffControls: React.FC<PayoffControlsProps> = ({
  ticker,
  setTicker,
  strike,
  setStrike,
  premium,
  setPremium,
  strategy,
  setStrategy,
  onGeneratePayoff,
  showLeaps,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker">Ticker</Label>
          <Select value={ticker} onValueChange={(value) => setTicker(value)}>
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
          <Label htmlFor="strategy">Strategy</Label>
          <Select value={strategy} onValueChange={(value) => setStrategy(value)}>
            <SelectTrigger id="strategy">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Call Option</SelectItem>
              <SelectItem value="put">Put Option</SelectItem>
              <SelectItem value="call-spread">Bull Call Spread</SelectItem>
              <SelectItem value="put-spread">Bear Put Spread</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strike">Strike Price ($)</Label>
          <Input
            id="strike"
            type="number"
            min="50"
            max="1000"
            value={strike}
            onChange={(e) => setStrike(parseFloat(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="premium">Premium ($)</Label>
          <Input
            id="premium"
            type="number"
            min="1"
            max="50"
            step="0.5"
            value={premium}
            onChange={(e) => setPremium(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <Button onClick={onGeneratePayoff} className="w-full sm:w-auto">
        Generate Payoff Diagram
      </Button>
    </>
  );
};

export default PayoffControls;
