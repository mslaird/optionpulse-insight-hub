
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StrategyHeaderProps } from "./types";

const StrategyHeader: React.FC<StrategyHeaderProps> = ({ strategyName, onAddLeg }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">Strategy: {strategyName}</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop legs to rearrange, add new legs, or modify existing ones
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
