
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { formatDateString } from "./utils/formatUtils";
import { cn } from "@/lib/utils";
import { Trade } from "./types";
import TradeDetails from "./TradeDetails";

interface TradeRowProps {
  trade: Trade;
  isExpanded: boolean;
  onToggleDetails: (id: string) => void;
  onDeleteTrade: (id: string) => void;
  isNew?: boolean;
}

const TradeRow: React.FC<TradeRowProps> = ({
  trade,
  isExpanded,
  onToggleDetails,
  onDeleteTrade,
  isNew = false,
}) => {
  const isProfit = trade.result === 'profit';
  const isLoss = trade.result === 'loss';
  const isOpen = trade.result === 'open';
  
  return (
    <>
      <TableRow 
        className={cn(
          "transition-colors hover:bg-muted/60 cursor-pointer",
          isExpanded && "bg-muted/40",
          isNew && "animate-pulse",
          isOpen && "border-l-2 border-emerald-500"
        )}
        onClick={() => onToggleDetails(trade.id)}
      >
        <TableCell className="font-medium">{formatDateString(trade.date)}</TableCell>
        <TableCell>{trade.ticker}</TableCell>
        <TableCell>{trade.strategy}</TableCell>
        <TableCell className="capitalize">{trade.action}</TableCell>
        <TableCell>{trade.quantity}</TableCell>
        <TableCell>${trade.strike}</TableCell>
        <TableCell>${trade.premium}</TableCell>
        <TableCell>{formatDateString(trade.expiryDate)}</TableCell>
        <TableCell>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              isProfit && "bg-green-500/20 text-green-400",
              isLoss && "bg-red-500/20 text-red-400", 
              isOpen && "bg-blue-500/20 text-blue-400"
            )}
          >
            {trade.result}
          </span>
        </TableCell>
        <TableCell className={cn(
          isProfit && "text-green-400",
          isLoss && "text-red-400",
          isOpen && "text-blue-400"
        )}>
          {isProfit && "+"}${Math.abs(trade.profitLoss).toFixed(2)}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleDetails(trade.id);
              }}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTrade(trade.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className="bg-muted/20 hover:bg-muted/30">
          <TableCell colSpan={11} className="p-0">
            <TradeDetails trade={trade} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TradeRow;
