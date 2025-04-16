
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketMoversSection from "./MarketMoversSection";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

const MarketMoversCard = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium relative flex items-center justify-between">
          Market Movers
          <div className="absolute top-0 right-0">
            <ExplanationTooltip 
              title="Market Movers" 
              content="Market Movers highlight the most significant price changes in the stock market. This section shows top gainers, top losers, and options with high implied volatility (IV). It helps traders quickly identify potential opportunities and market trends." 
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MarketMoversSection />
      </CardContent>
    </Card>
  );
};

export default MarketMoversCard;
