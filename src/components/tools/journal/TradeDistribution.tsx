
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StrategyCount, ProfitByTicker } from "./types";

interface TradeDistributionProps {
  tradesByStrategy: StrategyCount[];
  profitByTicker: ProfitByTicker[];
}

const TradeDistribution: React.FC<TradeDistributionProps> = ({
  tradesByStrategy,
  profitByTicker
}) => {
  const COLORS = ['#1EAEDB', '#34D399', '#F87171', '#8E9196', '#10B981'];

  // Ensure we have non-empty data arrays with valid property values
  const validStrategyData = tradesByStrategy?.length > 0 ? tradesByStrategy : [];
  const validTickerData = profitByTicker?.length > 0 ? profitByTicker : [];

  // Force a minimal dataset if none exists
  const fallbackTickerData = validTickerData.length === 0 ? [{ ticker: 'No Data', profit: 0 }] : validTickerData;

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trade Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* First chart - Trades by Strategy */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium mb-2">Trades by Strategy</h4>
            <div className="h-[200px] w-full" data-testid="strategy-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip formatter={(value: number) => [`${value} trades`]} />
                  <Pie
                    data={validStrategyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="count"
                    nameKey="strategy"
                    label={false}
                  >
                    {validStrategyData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full overflow-x-auto mt-2">
              <div className="flex flex-wrap justify-center gap-2 min-w-min">
                {validStrategyData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 min-w-max">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs whitespace-nowrap">
                      {item.strategy}: {item.count} trades
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Second chart - Profit by Ticker */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium mb-2">Profit by Ticker</h4>
            <div className="h-[200px] w-full" data-testid="profit-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip formatter={(value: number) => [`${value > 0 ? '+' : ''}$${value.toFixed(2)}`]} />
                  <Pie
                    data={fallbackTickerData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="profit"
                    nameKey="ticker"
                    label={false}
                    isAnimationActive={false}
                  >
                    {fallbackTickerData.map((entry, index) => (
                      <Cell 
                        key={`profit-cell-${index}`} 
                        fill={entry.profit >= 0 ? COLORS[0] : COLORS[2]} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full overflow-x-auto mt-2">
              <div className="flex flex-wrap justify-center gap-2 min-w-min">
                {fallbackTickerData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 min-w-max">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: item.profit >= 0 ? COLORS[0] : COLORS[2] }}
                    />
                    <span className="text-xs whitespace-nowrap">
                      {item.ticker}: ${item.profit.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeDistribution;
