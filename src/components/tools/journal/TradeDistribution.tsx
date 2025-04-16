
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
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
  
  // Create a fallback dataset for the profit chart when empty
  const fallbackProfitData = profitByTicker?.length > 0 
    ? profitByTicker 
    : [{ ticker: 'No Data', profit: 100 }]; // Using 100 to ensure it shows up visually

  // Create simple chart configs
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.15 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trade Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Strategy chart */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-center">Trades by Strategy</h3>
            <div className="h-[220px] w-full" id="strategy-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <Pie
                    data={validStrategyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    nameKey="strategy"
                    fill="#8884d8"
                    label={renderCustomizedLabel}
                  >
                    {validStrategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} trades`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {validStrategyData.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs">
                    {item.strategy}: {item.count} trades
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profit chart */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-center">Profit by Ticker</h3>
            <div className="h-[220px] w-full" id="profit-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <Pie
                    data={fallbackProfitData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="profit"
                    nameKey="ticker"
                    fill="#8884d8"
                    label={renderCustomizedLabel}
                    isAnimationActive={false}
                    // Ensure absolute values are used for sizing the pie segments
                    // but colors still reflect profit/loss
                    valueKey={(entry) => Math.abs(entry.profit)}
                  >
                    {fallbackProfitData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.profit >= 0 ? '#1EAEDB' : '#F87171'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value >= 0 ? '+' : ''}$${Math.abs(value).toFixed(2)}`]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {fallbackProfitData.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.profit >= 0 ? '#1EAEDB' : '#F87171' }}
                  />
                  <span className="text-xs">
                    {item.ticker}: ${item.profit.toFixed(2)}
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
