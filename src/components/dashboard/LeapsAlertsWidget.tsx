import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAIAlerts } from '@/contexts/AIAlertsContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
const LeapsAlertsWidget = () => {
  const {
    dashboardLeapsAlerts,
    refreshAlerts
  } = useAIAlerts();
  return <Card className="bg-card/30 backdrop-blur-sm border-emerald-500/30">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Zap size={18} className="text-emerald-400" />
          LEAPS Long-Term Predictions
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-optionpulse-neutral hover:text-emerald-400" onClick={refreshAlerts}>
            <RefreshCw size={16} className="mr-1" />
            Refresh
          </Button>
          <Link to="/alerts">
            <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 my-0 px-0">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {dashboardLeapsAlerts.length > 0 ? <div className="space-y-3">
            {dashboardLeapsAlerts.map(alert => <div key={alert.id} className={cn("p-3 rounded-lg border flex items-start", "bg-optionpulse-navy border-emerald-500/30 transition-all duration-300", alert.isNew && "bg-emerald-500/10 animate-pulse-subtle")}>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 flex-shrink-0 text-emerald-400">
                  <Zap size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-white">{alert.symbol}</span>
                    <span className="text-xs text-muted-foreground">{alert.expiryDate}</span>
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
              </div>)}
          </div> : <div className="text-center py-8 text-muted-foreground">
            No LEAPS alerts available
          </div>}
      </CardContent>
    </Card>;
};
export default LeapsAlertsWidget;