
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useAlertSuggestions } from "./useAlertSuggestions";
import AlertCard from "./AlertCard";
import { NewTradeFormData } from "../types";

interface AlertSuggestionsProps {
  onCreateTradeFromAlert: (tradeData: NewTradeFormData) => void;
}

const AlertSuggestions: React.FC<AlertSuggestionsProps> = ({ onCreateTradeFromAlert }) => {
  const { alertSuggestions, hasAlerts } = useAlertSuggestions();
  
  if (!hasAlerts) {
    return null;
  }
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp size={16} className="text-optionpulse-green" />
          Trade Opportunities from AI Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertSuggestions.map((alert) => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              onCreateTradeFromAlert={onCreateTradeFromAlert} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertSuggestions;
