
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
    const value = payload[0].value;
    const lineColor = payload[0].color; // Get the color of the current line
    
    let percentageDisplay = null;
    
    if (showPercentage && payload[0].payload.parentData) {
      const maxValue = Math.max(...payload[0].payload.parentData.map((d: any) => Math.abs(d[payload[0].dataKey])));
      if (maxValue > 0) {
        const percentage = ((Math.abs(value) / maxValue) * 100).toFixed(2);
        percentageDisplay = ` (${percentage}%)`;
      }
    }
    
    return (
      <div className="bg-background border border-border/50 rounded-lg p-2 text-sm shadow-lg">
        <p className="font-medium">{stockPrice}</p>
        <p 
          className="text-primary" 
          style={{ color: lineColor }} // Use the line's original color for the tooltip text
        >
          {valueLabel}: {valuePrefix}{value.toFixed(2)}{valueSuffix}
          {percentageDisplay}
        </p>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
