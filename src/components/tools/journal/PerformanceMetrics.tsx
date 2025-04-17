
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TradeChartData } from "./types";
import { ArrowDownRight, ArrowUpRight, CircleDollarSign, Percent, BarChart2, Activity } from "lucide-react";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

interface PerformanceMetricsProps {
  totalProfitLoss: number;
  winRate: number;
  totalTrades: number;
  openTrades: number;
  tradeHistoryData: TradeChartData[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  totalProfitLoss,
  winRate,
  totalTrades,
  openTrades,
  tradeHistoryData
}) => {
  const isProfitable = totalProfitLoss >= 0;
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 w-full h-auto min-h-[400px] overflow-auto relative">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
          <ExplanationTooltip 
            title="Performance Metrics" 
            content="Overview of your trading performance, including total P/L, win rate, and trade history."
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* P/L Card */}
          <div className="flex flex-col p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CircleDollarSign className="text-muted-foreground" size={18} />
                <span className="text-sm font-medium">Total P/L</span>
              </div>
              {isProfitable ? (
                <ArrowUpRight className="text-optionpulse-green" size={18} />
              ) : (
                <ArrowDownRight className="text-optionpulse-red" size={18} />
              )}
            </div>
            <div className={`text-xl font-bold mt-1 ${isProfitable ? 'text-optionpulse-green' : 'text-optionpulse-red'}`}>
              {isProfitable ? '+' : ''}{totalProfitLoss.toFixed(2)}
            </div>
          </div>
          
          {/* Win Rate Card */}
          <div className="flex flex-col p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Percent className="text-muted-foreground" size={18} />
                <span className="text-sm font-medium">Win Rate</span>
              </div>
            </div>
            <div className="text-xl font-bold mt-1">
              {winRate.toFixed(1)}%
            </div>
          </div>
          
          {/* Total Trades Card */}
          <div className="flex flex-col p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart2 className="text-muted-foreground" size={18} />
                <span className="text-sm font-medium">Total Trades</span>
              </div>
            </div>
            <div className="text-xl font-bold mt-1">
              {totalTrades}
            </div>
          </div>
          
          {/* Open Trades Card */}
          <div className="flex flex-col p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="text-muted-foreground" size={18} />
                <span className="text-sm font-medium">Open Trades</span>
              </div>
            </div>
            <div className="text-xl font-bold mt-1">
              {openTrades}
            </div>
          </div>
        </div>
        
        {/* P/L Chart */}
        <div className="mt-4 h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={tradeHistoryData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis 
                hide={true}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'P/L']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
              />
              <Area 
                type="monotone" 
                dataKey="cumulativeProfitLoss" 
                stroke="#1EAEDB" 
                fillOpacity={1} 
                fill="url(#colorPnL)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
