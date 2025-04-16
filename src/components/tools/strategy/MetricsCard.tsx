
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MetricsCardProps } from "./types";
import { Clock, TrendingDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MetricsCard: React.FC<MetricsCardProps> = ({ metrics, showLeaps = false }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Strategy Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Max Profit</p>
            <p className="text-lg font-medium">
              {typeof metrics.maxProfit === 'number' 
                ? `$${metrics.maxProfit.toFixed(2)}` 
                : metrics.maxProfit}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Max Loss</p>
            <p className="text-lg font-medium">
              {typeof metrics.maxLoss === 'number' 
                ? `$${metrics.maxLoss.toFixed(2)}` 
                : metrics.maxLoss}
            </p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Break Even</p>
          <p className="text-lg font-medium">${metrics.breakeven.toFixed(2)}</p>
        </div>
        
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Greeks Analysis</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                Delta
                {showLeaps && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 text-purple-400">↑</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[180px] text-xs">LEAPS typically have higher delta (more directional exposure)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
              <p className="font-medium">{metrics.delta.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                Gamma
                {showLeaps && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 text-purple-400">↓</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[180px] text-xs">LEAPS have lower gamma (less delta change per $1 move)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
              <p className="font-medium">{metrics.gamma.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                Theta
                {showLeaps && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 text-purple-400 flex items-center">
                          <TrendingDown size={12} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[180px] text-xs">LEAPS have lower daily time decay (less theta per day)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
              <p className="font-medium">{metrics.theta.toFixed(3)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center">
                Vega
                {showLeaps && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 text-purple-400">↑</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[180px] text-xs">LEAPS have higher vega (more sensitive to IV changes)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
              <p className="font-medium">{metrics.vega.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        {showLeaps && (
          <div className="pt-2 mt-2 border-t">
            <div className="flex items-center gap-1 text-purple-400">
              <Clock size={14} />
              <span className="text-sm font-medium">LEAPS Characteristics</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Long-term options with over 1 year until expiration. They offer reduced time decay per day, higher premiums, and are excellent for long-term directional strategies.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
