
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
  const calculateBreakEven = () => {
    switch(strategy) {
      case "call":
        return strike + premium;
      case "put":
        return strike - premium;
      case "call-spread":
        // Simplified for a basic call spread
        return strike + premium;
      case "put-spread":
        // Simplified for a basic put spread
        return strike - premium;
      default:
        return strike;
    }
  };

  const breakEvenPoint = calculateBreakEven();

  return (
    <Card className="w-full h-[400px] p-4">
      <CardContent className="p-0 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 50 }}
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
            
            {/* Display clear reference line for break-even point */}
            <ReferenceLine 
              x={breakEvenPoint} 
              stroke="#34D399" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              label={{
                value: `Break Even: $${breakEvenPoint.toFixed(2)}`,
                position: 'top',
                fill: '#34D399',
                fontSize: 12
              }}
            />
            
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#1EAEDB" 
              activeDot={{ r: 8 }} 
              name={`${ticker} ${formatStrategyName(strategy)} ($${strike} Strike, $${premium} Premium)`} 
            />
            <Line 
              type="monotone" 
              dataKey="breakeven" 
              stroke="#34D399" 
              strokeDasharray="5 5" 
              strokeWidth={3}
              dot={false} 
              name="Break Even"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayoffChart;
