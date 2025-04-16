
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TradeChartData } from "./types";

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
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Total P/L</div>
            <div className={`text-xl font-bold ${totalProfitLoss >= 0 ? 'text-optionpulse-green' : 'text-optionpulse-red'}`}>
              ${totalProfitLoss.toFixed(2)}
            </div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
            <div className="text-xl font-bold">{winRate.toFixed(1)}%</div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Total Trades</div>
            <div className="text-xl font-bold">{totalTrades}</div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Open Trades</div>
            <div className="text-xl font-bold">{openTrades}</div>
          </div>
        </div>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tradeHistoryData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, 'P/L']}
                labelFormatter={(date) => `Date: ${date}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                name="Cumulative P/L" 
                dataKey="cumulativeProfitLoss" 
                stroke="#1EAEDB" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
