
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PayoffStatsProps {
  strategy: string;
  premium: number;
  strike: number;
  showLeaps?: boolean;
}

const PayoffStats: React.FC<PayoffStatsProps> = ({ 
  strategy, 
  premium, 
  strike,
  showLeaps = false
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="bg-optionpulse-navy p-4">
        <CardContent className="p-0">
          <div className="text-sm font-medium text-muted-foreground">Max Profit</div>
          <div className="text-xl font-bold text-optionpulse-green-light">
            ${strategy === "call" || strategy === "put" ? "Unlimited" : (strike * 0.1 - premium).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-optionpulse-navy p-4">
        <CardContent className="p-0">
          <div className="text-sm font-medium text-muted-foreground">Max Loss</div>
          <div className="text-xl font-bold text-optionpulse-red-light">${premium.toFixed(2)}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-optionpulse-navy p-4">
        <CardContent className="p-0">
          <div className="text-sm font-medium text-muted-foreground">Break Even</div>
          <div className="text-xl font-bold text-white">
            ${strategy === "call" || strategy === "call-spread" 
                ? (strike + premium).toFixed(2) 
                : (strike - premium).toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoffStats;
