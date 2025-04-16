
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { MetricsCardProps } from "./types";

const MetricsCard: React.FC<MetricsCardProps> = ({ metrics }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Strategy Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Max Profit</div>
            <div className="text-base font-bold text-optionpulse-green-light">
              {typeof metrics.maxProfit === 'number' ? `$${metrics.maxProfit.toFixed(2)}` : metrics.maxProfit}
            </div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Max Loss</div>
            <div className="text-base font-bold text-optionpulse-red-light">
              {typeof metrics.maxLoss === 'number' ? `$${metrics.maxLoss.toFixed(2)}` : metrics.maxLoss}
            </div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Break Even</div>
            <div className="text-base font-bold text-white">${metrics.breakeven.toFixed(2)}</div>
          </div>
          
          <div className="bg-optionpulse-navy p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Risk/Reward Ratio</div>
            <div className="text-base font-bold">
              {typeof metrics.maxLoss === 'number' && typeof metrics.maxProfit === 'number' 
                ? (metrics.maxLoss / metrics.maxProfit).toFixed(2) 
                : "N/A"}
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium">Greeks (Composite)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Delta</span>
              <Badge>{metrics.delta.toFixed(2)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gamma</span>
              <Badge>{metrics.gamma.toFixed(3)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Theta</span>
              <Badge>{metrics.theta.toFixed(3)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Vega</span>
              <Badge>{metrics.vega.toFixed(3)}</Badge>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium">Strategy Characteristics</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bullish</span>
              <div className="flex space-x-1">
                {metrics.delta > 0.3 ? (
                  <CheckCircle size={16} className="text-optionpulse-green" />
                ) : (
                  <XCircle size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bearish</span>
              <div className="flex space-x-1">
                {metrics.delta < -0.3 ? (
                  <CheckCircle size={16} className="text-optionpulse-green" />
                ) : (
                  <XCircle size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">High Theta</span>
              <div className="flex space-x-1">
                {metrics.theta < -0.01 ? (
                  <CheckCircle size={16} className="text-optionpulse-green" />
                ) : (
                  <XCircle size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">High Gamma</span>
              <div className="flex space-x-1">
                {metrics.gamma > 0.02 ? (
                  <CheckCircle size={16} className="text-optionpulse-green" />
                ) : (
                  <XCircle size={16} className="text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
