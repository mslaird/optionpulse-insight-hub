
import React from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimulationButtonProps {
  isSimulating: boolean;
  onSimulate: () => void;
}

const SimulationButton = ({ isSimulating, onSimulate }: SimulationButtonProps) => {
  return (
    <div className="pt-2">
      <Button
        onClick={onSimulate}
        disabled={isSimulating}
        className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80 text-white transition-colors"
      >
        <Wallet size={18} className="mr-2" />
        {isSimulating ? "Processing..." : "Simulate Trade"}
      </Button>
    </div>
  );
};

export default SimulationButton;
