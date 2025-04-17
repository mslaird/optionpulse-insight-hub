
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayoffDiagramGenerator from "@/components/tools/PayoffDiagramGenerator";
import GreeksCalculator from "@/components/tools/GreeksCalculator";
import RiskRewardAnalyzer from "@/components/tools/RiskRewardAnalyzer";
import VolatilityScanner from "@/components/tools/VolatilityScanner";
import StrategyBuilder from "@/components/tools/StrategyBuilder";
import TradeJournal from "@/components/tools/TradeJournal";
import OptionStrategyTrader from "@/components/trading/OptionStrategyTrader";

interface ToolsTabContentProps {
  activeTab: string;
  showLeaps: boolean;
}

const ToolsTabContent: React.FC<ToolsTabContentProps> = ({ activeTab, showLeaps }) => {
  return (
    <>
      <TabContent id="strategy-trader" active={activeTab === "strategy-trader"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Options Strategy Trader</CardTitle>
            <CardDescription>
              Simulate multi-leg option strategies with virtual funds to practice advanced trading techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OptionStrategyTrader />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="payoff" active={activeTab === "payoff"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Payoff Diagram Generator</CardTitle>
            <CardDescription>
              Create visual representations of potential profits and losses for option strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PayoffDiagramGenerator />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="greeks" active={activeTab === "greeks"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Greeks Calculator</CardTitle>
            <CardDescription>
              Calculate option Greeks (Delta, Gamma, Theta, Vega) for any option contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GreeksCalculator />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="risk" active={activeTab === "risk"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Risk/Reward Analyzer</CardTitle>
            <CardDescription>
              Analyze the potential risk and reward for your option strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskRewardAnalyzer />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="volatility" active={activeTab === "volatility"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Volatility Scanner</CardTitle>
            <CardDescription>
              Find options with high implied volatility across different tickers and expirations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VolatilityScanner />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="strategy" active={activeTab === "strategy"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Strategy Builder</CardTitle>
              <CardDescription>
                Build custom option strategies and see the potential outcomes
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <StrategyBuilder showLeaps={showLeaps} />
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="journal" active={activeTab === "journal"}>
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Trade Journal</CardTitle>
            <CardDescription>
              Log and track your options trades to improve your strategies over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TradeJournal />
          </CardContent>
        </Card>
      </TabContent>
    </>
  );
};

// Helper component to handle tab content visibility
const TabContent: React.FC<{
  id: string;
  active: boolean;
  children: React.ReactNode;
}> = ({ id, active, children }) => {
  if (!active) return null;
  return <div className="space-y-4">{children}</div>;
};

export default ToolsTabContent;
