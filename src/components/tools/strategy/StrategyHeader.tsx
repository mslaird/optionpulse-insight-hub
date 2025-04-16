
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Zap } from "lucide-react";
import { StrategyHeaderProps } from "./types";
import { Badge } from "@/components/ui/badge";

const StrategyHeader: React.FC<StrategyHeaderProps> = ({ strategyName, onAddLeg, showLeaps = false }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          Strategy: {strategyName}
          {showLeaps && (
            <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
              <Zap size={14} className="mr-1" />LEAPS Mode
            </Badge>
          )}
        </h3>
        <p className="text-sm text-muted-foreground">
          {showLeaps 
            ? "Build longer-term strategies with lower time decay using LEAPS options"
            : "Drag and drop legs to rearrange, add new legs, or modify existing ones"}
        </p>
      </div>
      <Button onClick={onAddLeg} className="flex items-center gap-1">
        <Plus size={16} />
        Add Leg
      </Button>
    </div>
  );
};

export default StrategyHeader;
