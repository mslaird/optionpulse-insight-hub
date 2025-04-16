
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import { formatStrategyName } from "./payoffUtils";

interface PayoffChartProps {
  data: any[];
  ticker: string;
  strategy: string;
  strike: number;
  premium: number;
}

const PayoffChart: React.FC<PayoffChartProps> = ({ 
  data, 
  ticker, 
  strategy, 
  strike, 
  premium 
}) => {
  // Calculate break-even point based on strategy
  const breakEvenPrice = strategy === "call" || strategy === "call-spread" 
    ? strike + premium 
    : strike - premium;

  return (
    <Card className="w-full h-[400px] p-4">
      <CardContent className="p-0 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="stockPrice" 
              label={{ 
                value: 'Stock Price ($)', 
                position: 'insideBottom', 
                offset: -20,
                style: { 
                  textAnchor: 'middle', 
                  fontSize: '0.75rem' 
                } 
              }} 
            />
            <YAxis 
              label={{ 
                value: 'Profit/Loss ($)', 
                angle: -90, 
                position: 'insideLeft',
                style: { 
                  textAnchor: 'middle', 
                  fontSize: '0.75rem' 
                } 
              }} 
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend 
              wrapperStyle={{ bottom: 0, left: 0, right: 0 }}
              verticalAlign="bottom" 
              align="center"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#1EAEDB" 
              activeDot={{ r: 8 }} 
              name={`${ticker} ${formatStrategyName(strategy)} ($${strike} Strike, $${premium} Premium)`} 
            />
            <ReferenceLine 
              x={breakEvenPrice} 
              stroke="#34D399" 
              strokeDasharray="5 5" 
              label={{
                position: 'top',
                value: 'Break Even',
                fill: '#34D399',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayoffChart;
