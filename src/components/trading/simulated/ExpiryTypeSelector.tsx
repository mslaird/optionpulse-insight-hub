
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface ExpiryTypeSelectorProps {
  expiryType: string;
  setExpiryType: (type: string) => void;
}

const ExpiryTypeSelector = ({ expiryType, setExpiryType }: ExpiryTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="w-full sm:w-auto">
        <Button 
          variant={expiryType === "standard" ? "default" : "outline"} 
          onClick={() => setExpiryType("standard")} 
          className="w-full sm:w-auto"
        >
          Standard Options
        </Button>
      </div>
      <div className="w-full sm:w-auto">
        <Button 
          variant={expiryType === "leaps" ? "default" : "outline"} 
          onClick={() => setExpiryType("leaps")} 
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Zap size={16} className="mr-2" />
          LEAPS (Long-term)
        </Button>
      </div>
    </div>
  );
};

export default ExpiryTypeSelector;
