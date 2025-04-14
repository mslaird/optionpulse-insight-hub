
import React from "react";
import { TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentNotificationProps {
  symbol: string;
  sentiment: number;
  instrumentType?: string;
  onClose: () => void;
}

const SentimentNotification = ({
  symbol,
  sentiment,
  instrumentType = "",
  onClose,
}: SentimentNotificationProps) => {
  const isBullish = sentiment >= 50;
  
  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 z-50 animate-slide-up">
      <div
        className={cn(
          "rounded-lg p-4 shadow-lg border backdrop-blur-sm",
          "bg-black/70 border-[#00FF7F]/30 text-white"
        )}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F]">
              <TrendingUp size={16} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-[#00FF7F]">AI Sentiment Alert</h4>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-sm mt-1">
              <span className={isBullish ? "text-[#00FF7F]" : "text-red-400"}>
                {sentiment}% {isBullish ? "bullish" : "bearish"}
              </span>
              {" "}{symbol} {instrumentType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentNotification;
