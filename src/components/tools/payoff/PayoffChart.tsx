
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ReferenceLine, Area, ComposedChart 
} from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import { formatStrategyName } from "./payoffUtils";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface PayoffChartProps {
  data: any[];
  ticker: string;
  strategy: string;
  strike: number;
  premium: number;
  showLeaps?: boolean;
}

const PayoffChart: React.FC<PayoffChartProps> = ({ 
  data, 
  ticker, 
  strategy, 
  strike, 
  premium,
  showLeaps = false
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

  // For LEAPS-specific styling, use green color theme instead of blue
  const primaryColor = showLeaps ? "#34D399" : "#1EAEDB";
  const primaryColorLight = showLeaps ? "rgba(52, 211, 153, 0.3)" : "rgba(30, 174, 219, 0.3)";

  // Enhanced data with properties for positive/negative segments
  const enhancedData = data.map(point => ({
    ...point,
    positiveProfit: point.profit >= 0 ? point.profit : 0,
    negativeProfit: point.profit < 0 ? point.profit : 0
  }));

  return (
    <Card className="w-full h-[400px] p-4">
      <CardContent className="p-0 h-full relative">
        {showLeaps && (
          <Badge 
            className="absolute top-2 right-2 z-10 bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
          >
            <Zap size={14} className="mr-1" />
            LEAPS
          </Badge>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={enhancedData}
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
            
            {/* Zero reference line */}
            <ReferenceLine y={0} stroke="#555" strokeWidth={1} />
            
            {/* Profit area - above zero */}
            <Area 
              type="monotone" 
              dataKey="positiveProfit" 
              fill={primaryColorLight} 
              stroke="none"
              name="Profit Region"
            />
            
            {/* Loss area - below zero */}
            <Area 
              type="monotone" 
              dataKey="negativeProfit" 
              fill="rgba(248, 113, 113, 0.3)" 
              stroke="none"
              name="Loss Region"
            />
            
            {/* Display clear reference line for break-even point */}
            <ReferenceLine 
              x={breakEvenPoint} 
              stroke={primaryColor} 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              label={{
                value: `Break Even: $${breakEvenPoint.toFixed(2)}`,
                position: 'top',
                fill: primaryColor,
                fontSize: 12
              }}
            />
            
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke={primaryColor}
              strokeWidth={2} 
              activeDot={{ r: 8 }} 
              name={`${ticker} ${showLeaps ? "LEAPS " : ""}${formatStrategyName(strategy)} ($${strike} Strike, $${premium} Premium)`} 
            />
            <Line 
              type="monotone" 
              dataKey="breakeven" 
              stroke={primaryColor} 
              strokeWidth={3}
              strokeDasharray="5 5" 
              dot={{ r: 6, strokeWidth: 3 }} 
              name="Break Even"
              activeDot={{ r: 8, stroke: primaryColor, strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayoffChart;
