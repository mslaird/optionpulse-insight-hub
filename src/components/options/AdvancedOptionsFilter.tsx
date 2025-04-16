
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Filter, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdvancedOptionsFilterProps {
  optionType: string;
  setOptionType: (value: string) => void;
  strategyFilter: string;
  setStrategyFilter: (value: string) => void;
  expiryFilter: string;
  setExpiryFilter: (value: string) => void;
  ivRange: [number, number];
  setIvRange: (value: [number, number]) => void;
  itmProbabilityRange: [number, number];
  setItmProbabilityRange: (value: [number, number]) => void;
  onReset: () => void;
  isPro: boolean;
  onTogglePro: () => void;
}

const AdvancedOptionsFilter: React.FC<AdvancedOptionsFilterProps> = ({
  optionType,
  setOptionType,
  strategyFilter,
  setStrategyFilter,
  expiryFilter,
  setExpiryFilter,
  ivRange,
  setIvRange,
  itmProbabilityRange,
  setItmProbabilityRange,
  onReset,
  isPro,
  onTogglePro,
}) => {
  return (
    <div className="glass-card p-4 rounded-lg space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="font-medium flex items-center gap-2">
          <Filter size={16} className="text-optionpulse-blue" />
          Advanced Options
          {isPro && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Sparkles size={16} className="text-yellow-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pro Features Active</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h3>
        <Button variant="outline" size="sm" onClick={onReset} className="h-8">
          <RotateCcw size={14} className="mr-1" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="option-type">Option Type</Label>
          <Select value={optionType} onValueChange={setOptionType}>
            <SelectTrigger id="option-type" className="bg-background/50">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="calls">Calls Only</SelectItem>
              <SelectItem value="puts">Puts Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strategy-type">Strategy Type</Label>
          <Select value={strategyFilter} onValueChange={setStrategyFilter}>
            <SelectTrigger id="strategy-type" className="bg-background/50">
              <SelectValue placeholder="All Strategies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Strategies</SelectItem>
              <SelectItem value="credit">Credit Spreads</SelectItem>
              <SelectItem value="debit">Debit Spreads</SelectItem>
              <SelectItem value="iron-condor">Iron Condors</SelectItem>
              <SelectItem value="straddle">Straddles</SelectItem>
              <SelectItem value="strangle">Strangles</SelectItem>
              <SelectItem value="leaps">LEAPS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry-filter">Expiration</Label>
          <Select value={expiryFilter} onValueChange={setExpiryFilter}>
            <SelectTrigger id="expiry-filter" className="bg-background/50">
              <SelectValue placeholder="All Expiries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expiries</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="leaps">LEAPS (2026-2027)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="iv-range">IV Range: {ivRange[0]}% - {ivRange[1]}%</Label>
          </div>
          <Slider
            id="iv-range"
            min={10}
            max={50}
            step={1}
            value={ivRange}
            onValueChange={(value) => setIvRange(value as [number, number])}
            className="py-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="itm-range">ITM Probability: {itmProbabilityRange[0]}% - {itmProbabilityRange[1]}%</Label>
          </div>
          <Slider
            id="itm-range"
            min={0}
            max={100}
            step={5}
            value={itmProbabilityRange}
            onValueChange={(value) => setItmProbabilityRange(value as [number, number])}
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptionsFilter;
