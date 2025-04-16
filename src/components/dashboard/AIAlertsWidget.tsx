
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAIAlerts } from '@/contexts/AIAlertsContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AIAlertsWidget = () => {
  const {
    filteredAlerts,
    refreshAlerts
  } = useAIAlerts();

  // Show up to 3 alerts on the dashboard
  const dashboardAlerts = filteredAlerts.slice(0, 3);
  return <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp size={18} className="text-optionpulse-blue" />
          AI Options Predictions
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-optionpulse-neutral hover:text-optionpulse-blue" onClick={refreshAlerts}>
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </Button>
          <Link to="/alerts">
            <Button variant="ghost" size="sm" className="text-optionpulse-blue hover:text-optionpulse-blue-light px-0">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {dashboardAlerts.length > 0 ? <div className="space-y-3">
            {dashboardAlerts.map(alert => (
              <Link key={alert.id} to={`/stock/${alert.symbol}`} className="block transition-transform hover:translate-x-1 focus:outline-none">
                <div className={cn("p-3 rounded-lg border flex items-start", "bg-optionpulse-navy border-optionpulse-blue/30 transition-all duration-300 hover:border-optionpulse-blue/70", alert.isNew && "bg-optionpulse-blue/10 animate-pulse-subtle")}>
                  <div className="w-8 h-8 rounded-full bg-optionpulse-blue/20 flex items-center justify-center mr-3 flex-shrink-0 text-optionpulse-blue">
                    <TrendingUp size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-white">{alert.symbol}</span>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">
                      ${alert.strikePrice} {alert.type}, 
                      <span className={alert.itmProbability >= 70 ? "text-optionpulse-green" : "text-white"}>
                        {" "}{alert.itmProbability}% ITM
                      </span> by {alert.expiryDate}, 
                      <span className={alert.sentiment.direction === 'bullish' ? "text-optionpulse-green" : "text-optionpulse-red"}>
                        {" "}{alert.sentiment.percentage}% {alert.sentiment.direction}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div> : <div className="text-center py-8 text-muted-foreground">
            No alerts match your current filters
          </div>}
      </CardContent>
    </Card>;
};

export default AIAlertsWidget;
