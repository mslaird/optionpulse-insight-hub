
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import { PayoffChartProps } from "./types";

const PayoffChart: React.FC<PayoffChartProps> = ({ payoffData }) => {
  const enhancedPayoffData = payoffData.map(point => ({
    ...point,
    parentData: payoffData
  }));

  return (
    <Card className="lg:col-span-2 h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Payoff Diagram</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#1EAEDB" 
              strokeWidth={2}
              dot={false}
              name="Strategy P/L" 
            />
            <Line 
              type="monotone" 
              dataKey="breakeven" 
              stroke="#34D399" 
              strokeDasharray="5 5" 
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
