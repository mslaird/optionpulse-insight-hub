
import React from "react";
import { TrendingUp } from "lucide-react";

const SentimentAlertWidget = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <div className="w-10 h-10 rounded-full bg-[#00FF7F]/20 flex items-center justify-center text-[#00FF7F]">
          <TrendingUp size={20} />
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-[#00FF7F] mb-1">AI Sentiment Alert</h4>
        <p className="text-base">
          <span className="text-[#00FF7F] font-semibold">75% bullish</span>
          {" AAPL calls"}
        </p>
        <p className="text-sm mt-2 text-muted-foreground">
          Based on social media analysis of recent trading discussions
        </p>
      </div>
    </div>
  );
};

export default SentimentAlertWidget;
