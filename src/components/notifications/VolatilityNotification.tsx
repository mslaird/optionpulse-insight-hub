
import React from "react";
import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VolatilityNotificationProps {
  symbol: string;
  currentVolatility: number;
  previousVolatility: number;
  onClose: () => void;
}

const VolatilityNotification = ({
  symbol,
  currentVolatility,
  previousVolatility,
  onClose,
}: VolatilityNotificationProps) => {
  const volatilityChange = currentVolatility - previousVolatility;
  const percentageChange = volatilityChange.toFixed(1);
  const isPositive = volatilityChange > 0;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 z-50 animate-slide-up">
      <div
        className={cn(
          "rounded-lg p-4 shadow-lg border backdrop-blur-sm",
          "bg-black/70 border-[#00B7EB]/30 text-white"
        )}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-[#00B7EB]/20 flex items-center justify-center text-[#00B7EB]">
              <Bell size={16} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-[#00B7EB]">Volatility Alert</h4>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-sm mt-1">
              {symbol} volatility: {currentVolatility}%, 
              <span className={isPositive ? "text-[#00B7EB]" : "text-green-400"}>
                {" "}{isPositive ? "+" : ""}{percentageChange}% 
                {isPositive ? " spike" : " drop"}
              </span>
              , alert triggered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolatilityNotification;
