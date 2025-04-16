
import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeapsAlert {
  symbol: string;
  strikePrice: number;
  type: string;
  itmProbability: number;
  expiryDate: string;
}

interface LeapsAlertProps {
  alert: LeapsAlert | null;
  onTestAlert: (alert: LeapsAlert) => void;
}

const LeapsAlert = ({ alert, onTestAlert }: LeapsAlertProps) => {
  if (!alert) return null;

  return (
    <div className="mb-4 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
      <div className="flex items-start">
        <Zap size={18} className="mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-emerald-400 font-medium">Recommended LEAPS Alert</p>
          <p className="text-sm text-muted-foreground">
            {alert.symbol} ${alert.strikePrice} {alert.type},&nbsp;
            <span className="text-emerald-400">{alert.itmProbability}% ITM</span> by {alert.expiryDate}
          </p>
          <Button
            variant="link"
            className="h-auto p-0 text-xs text-emerald-400"
            onClick={() => onTestAlert(alert)}
          >
            Test this alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeapsAlert;
