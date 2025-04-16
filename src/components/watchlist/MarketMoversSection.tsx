
import React from "react";
import { Separator } from "@/components/ui/separator";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import MarketSectionItem from "./MarketSectionItem";

interface MarketSectionProps {
  title: string;
  tooltip: string;
  children: React.ReactNode;
}

const MarketSection = ({ title, tooltip, children }: MarketSectionProps) => {
  return (
    <div className="p-4 rounded-lg bg-sidebar-accent">
      <div className="relative flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="absolute top-0 right-0">
          <ExplanationTooltip 
            title={title} 
            content={tooltip} 
          />
        </div>
      </div>
      <Separator className="mb-3" />
      {children}
    </div>
  );
};

const MarketMoversSection = () => {
  // Data could be moved to props in a real application
  const gainers = [
    { symbol: "NVDA", value: 5.2, isPositive: true },
    { symbol: "AMD", value: 3.8, isPositive: true },
    { symbol: "META", value: 2.9, isPositive: true }
  ];
  
  const losers = [
    { symbol: "INTC", value: 4.1, isPositive: false },
    { symbol: "PYPL", value: 3.5, isPositive: false },
    { symbol: "NFLX", value: 2.2, isPositive: false }
  ];
  
  const highIV = [
    { symbol: "TSLA 200C", value: "85%" },
    { symbol: "AAPL 190C", value: "65%" },
    { symbol: "SPY 425P", value: "50%" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MarketSection 
        title="Top Gainers" 
        tooltip="Top Gainers represent stocks that have experienced the most significant percentage increase in price during the trading day. These stocks are showing strong positive momentum and could indicate bullish market sentiment or positive company-specific news."
      >
        <div className="space-y-2">
          {gainers.map((item, index) => (
            <MarketSectionItem 
              key={index}
              symbol={item.symbol}
              value={item.value}
              isPositive={item.isPositive}
            />
          ))}
        </div>
      </MarketSection>
      
      <MarketSection 
        title="Top Losers" 
        tooltip="Top Losers represent stocks that have experienced the most significant percentage decrease in price during the trading day. These stocks are showing negative price movement and could indicate bearish market sentiment, potential challenges, or negative company-specific news."
      >
        <div className="space-y-2">
          {losers.map((item, index) => (
            <MarketSectionItem 
              key={index}
              symbol={item.symbol}
              value={item.value}
              isPositive={item.isPositive}
            />
          ))}
        </div>
      </MarketSection>
      
      <MarketSection 
        title="High IV Options" 
        tooltip="High Implied Volatility (IV) options indicate higher expected price fluctuations. Options with high IV suggest increased market uncertainty or anticipated significant price movements. Traders often use these to assess potential trading opportunities or implement volatility-based strategies."
      >
        <div className="space-y-2">
          {highIV.map((item, index) => (
            <MarketSectionItem 
              key={index}
              symbol={item.symbol}
              value={item.value}
              showPercentage={false}
              prefix="IV "
            />
          ))}
        </div>
      </MarketSection>
    </div>
  );
};

export default MarketMoversSection;
