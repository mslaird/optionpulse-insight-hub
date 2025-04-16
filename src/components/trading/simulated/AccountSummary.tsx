
import React from "react";
import { DollarSign, BookMarked, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AccountSummaryProps {
  accountValue: number;
}

const AccountSummary = ({ accountValue }: AccountSummaryProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground mr-2">Account Value:</span>
        <span className="font-semibold text-white">${accountValue.toLocaleString()}</span>
      </div>
      <div className="flex flex-col gap-2">
        <Link to="/tools/strategy-builder">
          <Button variant="link" size="sm" className="text-optionpulse-blue p-0 h-auto justify-start">
            <ArrowRight size={14} className="mr-1" />
            Strategy Builder
          </Button>
        </Link>
        <Link to="/journal">
          <Button variant="link" size="sm" className="text-optionpulse-blue p-0 h-auto justify-start">
            <BookMarked size={14} className="mr-1" />
            Trade Journal
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccountSummary;
