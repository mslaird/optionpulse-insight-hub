
import React from 'react';
import { useAIAlerts } from '@/contexts/AIAlertsContext';
import { TrendingUp, TrendingDown, AlertCircle, Zap } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

const AIAlertsList = () => {
  const { filteredAlerts } = useAIAlerts();
  
  if (filteredAlerts.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No AI Predictions Found</h3>
        <p className="text-muted-foreground">
          Try changing your filters or refresh to generate new predictions.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredAlerts.map((alert) => (
        <div key={alert.id}>
          <div 
            className={cn(
              "p-4 rounded-lg border flex items-start gap-4",
              alert.isLeaps 
                ? "bg-optionpulse-navy border-emerald-500/30 transition-all duration-300" 
                : "bg-optionpulse-navy border-optionpulse-blue/30 transition-all duration-300",
              alert.isNew && "animate-pulse-subtle",
              alert.isNew && (alert.isLeaps ? "bg-emerald-500/10" : "bg-optionpulse-blue/10")
            )}
          >
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                alert.isLeaps 
                  ? (alert.sentiment.direction === 'bullish' 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-optionpulse-red/20 text-optionpulse-red")
                  : (alert.sentiment.direction === 'bullish' 
                      ? "bg-optionpulse-green/20 text-optionpulse-green" 
                      : "bg-optionpulse-red/20 text-optionpulse-red")
              )}
            >
              {alert.isLeaps 
                ? <Zap size={24} /> 
                : (alert.sentiment.direction === 'bullish' 
                    ? <TrendingUp size={24} /> 
                    : <TrendingDown size={24} />)
              }
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xl">{alert.symbol}</span>
                  <span className={cn(
                    "text-sm px-2 py-0.5 rounded-full", 
                    alert.type === 'call' ? "bg-optionpulse-green/20 text-optionpulse-green" : "bg-optionpulse-red/20 text-optionpulse-red"
                  )}>
                    {alert.type.toUpperCase()}
                  </span>
                  {alert.isLeaps && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">LEAPS</span>
                  )}
                  {alert.isNew && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-optionpulse-blue/20 text-optionpulse-blue">NEW</span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
              </div>
              
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Strike Price</p>
                  <p className="font-medium">${alert.strikePrice.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-medium">${alert.currentPrice.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                  <p className={cn(
                    "font-medium",
                    alert.isLeaps && "text-emerald-400"
                  )}>
                    {alert.expiryDate}
                    {alert.isLeaps && " (LEAPS)"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Implied Volatility</p>
                  <p className="font-medium">{alert.impliedVolatility.toFixed(1)}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">ITM Probability</p>
                  <p className={cn(
                    "font-medium",
                    alert.itmProbability >= 80 ? "text-optionpulse-green" : 
                    alert.itmProbability >= 60 ? "text-optionpulse-blue" : "text-white"
                  )}>
                    {alert.itmProbability}%
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Market Sentiment</p>
                  <p className={cn(
                    "font-medium",
                    alert.sentiment.direction === 'bullish' ? "text-optionpulse-green" : "text-optionpulse-red"
                  )}>
                    {alert.sentiment.percentage}% {alert.sentiment.direction}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">AI Prediction Summary:</p>
                <p className="text-sm mt-1">
                  {alert.symbol} {alert.type === 'call' ? 'call option' : 'put option'} at strike ${alert.strikePrice} {' '}
                  has a {alert.itmProbability}% probability of being in-the-money by {alert.expiryDate}. 
                  Market sentiment is {alert.sentiment.percentage}% {alert.sentiment.direction}.
                  {alert.isLeaps && " This is a long-term LEAPS option."}
                </p>
              </div>
            </div>
          </div>
          <Separator className="mt-4 opacity-10" />
        </div>
      ))}
    </div>
  );
};

export default AIAlertsList;
