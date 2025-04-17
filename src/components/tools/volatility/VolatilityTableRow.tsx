
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

interface OptionData {
  id: number;
  ticker: string;
  strike: number;
  expiry: string;
  iv: number;
  callPrice: number;
  putPrice: number;
  ivPercentile: number;
  recentChange: number;
  sentiment: string;
}

interface VolatilityTableRowProps {
  option: OptionData;
}

const VolatilityTableRow = ({ option }: VolatilityTableRowProps) => {
  return (
    <TableRow key={option.id}>
      <TableCell className="font-medium">{option.ticker}</TableCell>
      <TableCell>${option.strike}</TableCell>
      <TableCell>{option.expiry}</TableCell>
      <TableCell>
        <Badge className={option.iv >= 0.32 ? "bg-optionpulse-blue" : "bg-muted"}>
          {(option.iv * 100).toFixed(1)}%
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={option.ivPercentile >= 85 ? "border-optionpulse-red text-optionpulse-red" : ""}>
          {option.ivPercentile}%
        </Badge>
      </TableCell>
      <TableCell>${option.callPrice.toFixed(2)}</TableCell>
      <TableCell>${option.putPrice.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className={option.recentChange > 0.05 ? "text-optionpulse-red" : "text-white"}>
            +{(option.recentChange * 100).toFixed(1)}%
          </span>
          {option.recentChange >= 0.06 && <Sparkles size={14} className="ml-1 text-optionpulse-red" />}
        </div>
      </TableCell>
      <TableCell>
        {option.sentiment === "bullish" ? (
          <div className="flex items-center text-optionpulse-green">
            <ArrowUpRight size={16} className="mr-1" />
            Bullish
          </div>
        ) : option.sentiment === "bearish" ? (
          <div className="flex items-center text-optionpulse-red">
            <ArrowDownRight size={16} className="mr-1" />
            Bearish
          </div>
        ) : (
          <div className="text-muted-foreground">Neutral</div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default VolatilityTableRow;
