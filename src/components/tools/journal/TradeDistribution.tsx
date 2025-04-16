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
  // Define colors for our charts
  const STRATEGY_COLORS = ['#1EAEDB', '#34D399', '#F87171', '#8E9196', '#10B981'];
  
  // Ensure we have valid data for the strategy chart
  const validStrategyData = tradesByStrategy?.length > 0 
    ? tradesByStrategy 
    : [{ strategy: 'No Data', count: 1 }];
  
  // Ensure we have valid data for the profit chart - convert all profit values to absolute for sizing
  const validProfitData = profitByTicker?.length > 0 
    ? profitByTicker.map(item => ({
        ...item,
        // Store the absolute value for display sizing purposes
        absoluteValue: Math.abs(item.profit)
      }))
    : [{ ticker: 'No Data', profit: 100, absoluteValue: 100 }];
  
  // Create simple chart label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.15) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // Extend the radius to move labels outside
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="currentColor" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="middle"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trade Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategy chart */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium text-center">Trades by Strategy</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={validStrategyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    nameKey="strategy"
                    label={renderCustomizedLabel}
                  >
                    {validStrategyData.map((entry, index) => (
                      <Cell 
                        key={`strategy-cell-${index}`} 
                        fill={STRATEGY_COLORS[index % STRATEGY_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} trades`]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {validStrategyData.map((item, index) => (
                <div key={`strategy-legend-${index}`} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: STRATEGY_COLORS[index % STRATEGY_COLORS.length] }}
                  />
                  <span className="text-xs">
                    {item.strategy}: {item.count} trades
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profit chart */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium text-center">Profit by Ticker</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={validProfitData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    // Use absoluteValue for sizing the segments
                    dataKey="absoluteValue"
                    nameKey="ticker"
                    label={renderCustomizedLabel}
                  >
                    {validProfitData.map((entry, index) => (
                      <Cell 
                        key={`profit-cell-${index}`} 
                        fill={entry.profit >= 0 ? '#1EAEDB' : '#F87171'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, entry: any) => {
                      // Use the original profit value for the tooltip, not the absolute value
                      const profit = entry.payload.profit;
                      return [`${profit >= 0 ? '+' : ''}$${Math.abs(profit).toFixed(2)}`];
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {validProfitData.map((item, index) => (
                <div key={`profit-legend-${index}`} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.profit >= 0 ? '#1EAEDB' : '#F87171' }}
                  />
                  <span className="text-xs">
                    {item.ticker}: {item.profit >= 0 ? '+' : ''}${Math.abs(item.profit).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeDistribution;
