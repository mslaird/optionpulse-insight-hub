
import React from "react";

interface LeapsOption {
  bid: number;
  ask: number;
  strike: number;
  expiry: string;
  iv: number;
  delta: number;
  theta: number;
}

interface LeapsOptionDetailsProps {
  option: LeapsOption | null;
}

const LeapsOptionDetails = ({ option }: LeapsOptionDetailsProps) => {
  if (!option) return null;

  return (
    <div className="mt-2 p-3 rounded-lg bg-optionpulse-navy/50 border border-optionpulse-blue/20">
      <h4 className="text-sm font-medium mb-2">LEAPS Option Details</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Bid/Ask:</span>
          <span className="text-xs">${option.bid} / ${option.ask}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Implied Volatility:</span>
          <span className="text-xs">{option.iv}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Delta:</span>
          <span className="text-xs">{option.delta}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Theta:</span>
          <span className="text-xs">{option.theta}</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        <span className="text-optionpulse-blue">Tip:</span> LEAPS provide leverage for long-term market moves with lower capital requirements.
      </div>
    </div>
  );
};

export default LeapsOptionDetails;
