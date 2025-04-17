
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StrategyCount, ProfitByTicker } from "./types";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { getStrategyDescription } from "@/utils/strategyDescriptions";

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
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
    // For QQQ with zero value or very small values, we'll still show label
    // Remove the percent threshold check for zero values
    if (payload && payload.ticker === 'QQQ' && payload.profit === 0) {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius + 25;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text 
          x={x} 
          y={y} 
          fill="currentColor" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="middle"
          className="text-xs font-medium"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    
    // For other items, keep the original threshold
    if (percent < 0.15) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="currentColor" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getSimpleStrategyName = (strategy: string) => {
    // Convert strategy names like "credit-spread" to "Credit Spread"
    if (strategy.includes('-')) {
      return strategy.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return strategy;
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 w-full h-auto min-h-[400px] overflow-auto relative">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Trade Distribution</CardTitle>
          <ExplanationTooltip 
            title="Trade Distribution" 
            content="Visual breakdown of your trades by strategy and profit/loss by ticker."
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Strategy chart */}
          <div className="flex flex-col space-y-3 w-full">
            <h3 className="text-sm font-medium text-center">Trades by Strategy</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={validStrategyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
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
                    formatter={(value: number, name: string) => {
                      // Get the strategy description
                      const description = getStrategyDescription(name.toLowerCase().replace(' ', '-'));
                      return [
                        `${value} trades`, 
                        <>
                          <strong>{getSimpleStrategyName(name)}</strong>
                          <div className="text-xs mt-1 max-w-[200px]">{description}</div>
                        </>
                      ];
                    }}
                    wrapperStyle={{ maxWidth: '250px' }}
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
          <div className="flex flex-col space-y-3 w-full">
            <h3 className="text-sm font-medium text-center">Profit by Ticker</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={validProfitData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
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
