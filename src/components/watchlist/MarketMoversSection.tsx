
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MarketSection 
        title="Top Gainers" 
        tooltip="Top Gainers represent stocks that have experienced the most significant percentage increase in price during the trading day. These stocks are showing strong positive momentum and could indicate bullish market sentiment or positive company-specific news."
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">NVDA</span>
            <span className="text-accent text-glow-green flex items-center">
              <ArrowUpRight size={14} className="mr-1" />
              5.2%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">AMD</span>
            <span className="text-accent text-glow-green flex items-center">
              <ArrowUpRight size={14} className="mr-1" />
              3.8%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">META</span>
            <span className="text-accent text-glow-green flex items-center">
              <ArrowUpRight size={14} className="mr-1" />
              2.9%
            </span>
          </div>
        </div>
      </MarketSection>
      
      <MarketSection 
        title="Top Losers" 
        tooltip="Top Losers represent stocks that have experienced the most significant percentage decrease in price during the trading day. These stocks are showing negative price movement and could indicate bearish market sentiment, potential challenges, or negative company-specific news."
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">INTC</span>
            <span className="text-destructive text-glow-red flex items-center">
              <ArrowDownRight size={14} className="mr-1" />
              4.1%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">PYPL</span>
            <span className="text-destructive text-glow-red flex items-center">
              <ArrowDownRight size={14} className="mr-1" />
              3.5%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">NFLX</span>
            <span className="text-destructive text-glow-red flex items-center">
              <ArrowDownRight size={14} className="mr-1" />
              2.2%
            </span>
          </div>
        </div>
      </MarketSection>
      
      <MarketSection 
        title="High IV Options" 
        tooltip="High Implied Volatility (IV) options indicate higher expected price fluctuations. Options with high IV suggest increased market uncertainty or anticipated significant price movements. Traders often use these to assess potential trading opportunities or implement volatility-based strategies."
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">TSLA 200C</span>
            <span>IV 85%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">AAPL 190C</span>
            <span>IV 65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">SPY 425P</span>
            <span>IV 50%</span>
          </div>
        </div>
      </MarketSection>
    </div>
  );
};

export default MarketMoversSection;
