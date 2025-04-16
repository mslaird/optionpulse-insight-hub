
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
              // Reduce the number of ticks shown on the x-axis
              ticks={[
                data[0]?.stockPrice,
                strike,
                breakEvenPoint,
                data[data.length - 1]?.stockPrice
              ].filter(Boolean)}
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
            
            {/* Strike price reference line */}
            <ReferenceLine 
              x={strike} 
              stroke="#666" 
              strokeWidth={1} 
              strokeDasharray="3 3" 
              label={{
                value: `Strike: $${strike.toFixed(2)}`,
                position: 'insideBottomRight',
                fill: '#666',
                fontSize: 12
              }}
            />
            
            {/* Break-even point reference line */}
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
              strokeWidth={2}
              // Show dots only on important points to reduce visual clutter
              dot={({ cx, cy, payload }) => {
                const isStrike = Math.abs(payload.stockPrice - strike) < 0.01;
                const isBreakEven = Math.abs(payload.stockPrice - breakEvenPoint) < 0.01;
                const isEndPoint = payload.stockPrice === data[0].stockPrice || 
                                 payload.stockPrice === data[data.length - 1].stockPrice;
                
                if (isStrike || isBreakEven || isEndPoint) {
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill={isBreakEven ? "#34D399" : "#1EAEDB"} 
                      stroke="none" 
                    />
                  );
                }
                return null;
              }}
              activeDot={{ r: 8 }} 
              name={`${ticker} ${formatStrategyName(strategy)} ($${strike} Strike, $${premium} Premium)`} 
            />
            <Line 
              type="monotone" 
              dataKey="breakeven" 
              stroke="#34D399" 
              strokeWidth={3}
              strokeDasharray="5 5" 
              dot={{ r: 6, strokeWidth: 3 }} 
              name="Break Even"
              activeDot={{ r: 8, stroke: "#34D399", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayoffChart;
