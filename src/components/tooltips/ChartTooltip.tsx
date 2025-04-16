
import React from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: any;
  valuePrefix?: string;
  valueSuffix?: string;
  valueLabel?: string;
  showPercentage?: boolean;
  labelFormatter?: (value: any) => string;
  dataPoints?: Array<{
    name: string;
    value: string;
    color: string;
  }>;
}

const ChartTooltip = ({ 
  active, 
  payload, 
  label, 
  valuePrefix = "$", 
  valueSuffix = "", 
  valueLabel = "P/L",
  showPercentage = true,
  labelFormatter,
  dataPoints
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    // Handle the case when explicit data points are provided
    if (dataPoints && dataPoints.length > 0) {
      return (
        <div className="bg-background border border-border/50 rounded-lg p-2 text-sm shadow-lg">
          <p className="font-medium">{labelFormatter ? labelFormatter(label) : label}</p>
          {dataPoints.map((point, index) => (
            <p key={index} className="text-primary" style={{ color: point.color }}>
              {point.name}: {point.value}
            </p>
          ))}
        </div>
      );
    }

    // Regular tooltip handling
    const stockPrice = labelFormatter ? labelFormatter(label) : `Stock Price: $${label}`;
    
    // Check if the data point is at the break even
    const isBreakEven = payload.some(p => p.dataKey === 'breakeven' && p.value !== null);
    
    return (
      <div className="bg-background border border-border/50 rounded-lg p-2 text-sm shadow-lg">
        <p className="font-medium">{stockPrice}</p>
        {payload.map((entry, index) => {
          if (entry.dataKey === 'breakeven' && entry.value !== null) {
            return (
              <p 
                key={`break-even-${index}`} 
                className="text-primary font-bold" 
                style={{ color: '#34D399' }} 
              >
                Break Even Point
              </p>
            );
          } else if (entry.dataKey === 'profit') {
            let percentageDisplay = null;
            const value = entry.value;
            const lineColor = entry.color; // Get the color of the current line
            
            if (showPercentage && entry.payload.parentData) {
              const maxValue = Math.max(...entry.payload.parentData.map((d: any) => Math.abs(d[entry.dataKey])));
              if (maxValue > 0) {
                const percentage = ((Math.abs(value) / maxValue) * 100).toFixed(2);
                percentageDisplay = ` (${percentage}%)`;
              }
            }
            
            return (
              <p 
                key={`profit-${index}`} 
                className="text-primary" 
                style={{ color: isBreakEven ? '#34D399' : lineColor }} 
              >
                {valueLabel}: {valuePrefix}{value.toFixed(2)}{valueSuffix}
                {percentageDisplay}
                {isBreakEven && " (Break Even)"}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
