
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
}

const ChartTooltip = ({ 
  active, 
  payload, 
  label, 
  valuePrefix = "$", 
  valueSuffix = "", 
  valueLabel = "P/L",
  showPercentage = true,
  labelFormatter
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const stockPrice = labelFormatter ? labelFormatter(label) : `Stock Price: $${label}`;
    const value = payload[0].value;
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
        <p className="text-primary">
          {valueLabel}: {valuePrefix}{value.toFixed(2)}{valueSuffix}
          {percentageDisplay}
        </p>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
