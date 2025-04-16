
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import { PayoffChartProps } from "./types";

const PayoffChart: React.FC<PayoffChartProps> = ({ payoffData, showLeaps = false }) => {
  // Find the break-even points where profit crosses zero
  const breakEvenPoints: number[] = [];
  for (let i = 1; i < payoffData.length; i++) {
    // If profit changes from negative to positive or vice versa
    if ((payoffData[i-1].profit < 0 && payoffData[i].profit >= 0) || 
        (payoffData[i-1].profit >= 0 && payoffData[i].profit < 0)) {
      // Linear interpolation to find the exact break-even point
      const x1 = payoffData[i-1].stockPrice;
      const y1 = payoffData[i-1].profit;
      const x2 = payoffData[i].stockPrice;
      const y2 = payoffData[i].profit;
      
      // Find where y = 0
      const breakEvenPrice = x1 + (0 - y1) * (x2 - x1) / (y2 - y1);
      breakEvenPoints.push(parseFloat(breakEvenPrice.toFixed(2)));
    }
  }

  // Enhanced data with properties for positive/negative segments
  const enhancedPayoffData = payoffData.map(point => ({
    ...point,
    positiveProfit: point.profit >= 0 ? point.profit : 0,
    negativeProfit: point.profit < 0 ? point.profit : 0,
    parentData: payoffData
  }));

  return (
    <Card className="lg:col-span-2 h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">
          {showLeaps ? "LEAPS Payoff Diagram" : "Payoff Diagram"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={enhancedPayoffData}
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
            
            {/* Zero reference line */}
            <ReferenceLine y={0} stroke="#555" strokeWidth={1} />
            
            {/* Break-even point reference lines */}
            {breakEvenPoints.map((point, index) => (
              <ReferenceLine 
                key={`breakeven-${index}`}
                x={point} 
                stroke={showLeaps ? "#34D399" : "#1EAEDB"} 
                strokeDasharray="5 5"
                label={{ 
                  value: `BE: $${point}`,
                  position: 'top',
                  fill: showLeaps ? "#34D399" : "#1EAEDB",
                  fontSize: 12
                }}
              />
            ))}
            
            {/* Profit area - above zero */}
            <Area 
              type="monotone" 
              dataKey="positiveProfit" 
              fill={showLeaps ? "#34D399" : "#1EAEDB"} 
              fillOpacity={0.3}
              stroke="none"
              name="Profit Region"
            />
            
            {/* Loss area - below zero */}
            <Area 
              type="monotone" 
              dataKey="negativeProfit" 
              fill="#F87171" 
              fillOpacity={0.3}
              stroke="none"
              name="Loss Region"
            />
            
            {/* Line showing the complete P/L curve */}
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke={showLeaps ? "#34D399" : "#1EAEDB"} 
              strokeWidth={2}
              dot={false}
              name={showLeaps ? "LEAPS Strategy P/L" : "Strategy P/L"} 
              activeDot={{ r: 6, fill: showLeaps ? "#34D399" : "#1EAEDB" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayoffChart;
