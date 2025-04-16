
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AIAlert } from "@/data/mockAlertData";
import { NewTradeFormData } from "../types";

interface AlertCardProps {
  alert: AIAlert;
  onCreateTradeFromAlert: (tradeData: NewTradeFormData) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onCreateTradeFromAlert }) => {
  return (
    <Card className="bg-optionpulse-navy/70 hover:bg-optionpulse-navy transition-colors border-border/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium">{alert.symbol} ${alert.strikePrice} {alert.type}</div>
          <Badge 
            variant="outline" 
            className="bg-optionpulse-blue text-white flex items-center justify-center h-6 px-2"
          >
            {Math.round(alert.itmProbability * 100)}% ITM
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground mb-2">
          Expires: {alert.expiryDate}
        </div>
        <div className="text-sm mb-3">
          {alert.sentiment.direction === 'bullish' ? (
            <div className="flex items-center text-optionpulse-green">
              <TrendingUp size={14} className="mr-1" />
              {Math.round(alert.sentiment.percentage)}% Bullish
            </div>
          ) : (
            <div className="flex items-center text-optionpulse-red">
              <TrendingDown size={14} className="mr-1" />
              {Math.round(alert.sentiment.percentage)}% Bearish
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => {
            onCreateTradeFromAlert({
              date: new Date().toISOString().slice(0, 10),
              ticker: alert.symbol,
              strategy: alert.type === 'call' ? 'Long Call' : 'Long Put',
              action: 'buy',
              quantity: 1,
              premium: 5,
              strike: alert.strikePrice,
              expiryDate: alert.expiryDate,
              result: 'open',
              profitLoss: 0,
              notes: `Based on AI alert with ${Math.round(alert.itmProbability * 100)}% ITM probability`,
              relatedAlert: alert.id
            });
          }}
        >
          Add to Journal
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
