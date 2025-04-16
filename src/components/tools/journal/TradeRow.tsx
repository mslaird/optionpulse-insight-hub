
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2, Calendar } from "lucide-react";
import { Trade } from "./types";
import TradeDetails from "./TradeDetails";

interface TradeRowProps {
  trade: Trade;
  isExpanded: boolean;
  onToggleDetails: (id: string) => void;
  onDeleteTrade: (id: string) => void;
}

const TradeRow: React.FC<TradeRowProps> = ({
  trade,
  isExpanded,
  onToggleDetails,
  onDeleteTrade
}) => {
  return (
    <React.Fragment>
      <TableRow 
        className="cursor-pointer hover:bg-muted/20"
        onClick={() => onToggleDetails(trade.id)}
      >
        <TableCell className="p-0 pl-2 w-10">
          <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </TableCell>
        <TableCell>
          <div className="flex items-center">
            <Calendar size={14} className="mr-2 text-muted-foreground" />
            {new Date(trade.date).toLocaleDateString()}
          </div>
        </TableCell>
        <TableCell className="font-medium">{trade.ticker}</TableCell>
        <TableCell>{trade.strategy}</TableCell>
        <TableCell>
          <Badge variant={trade.action === 'buy' ? 'default' : 'outline'}>
            {trade.action === 'buy' ? 'Long' : 'Short'} ${trade.strike}
          </Badge>
        </TableCell>
        <TableCell>{trade.expiryDate}</TableCell>
        <TableCell>
          {trade.result === 'profit' ? (
            <Badge variant="default" className="bg-optionpulse-green">Profit</Badge>
          ) : trade.result === 'loss' ? (
            <Badge variant="default" className="bg-optionpulse-red">Loss</Badge>
          ) : (
            <Badge variant="outline">Open</Badge>
          )}
        </TableCell>
        <TableCell className="text-right">
          <span className={`font-medium ${trade.profitLoss > 0 ? 'text-optionpulse-green' : trade.profitLoss < 0 ? 'text-optionpulse-red' : ''}`}>
            {trade.profitLoss > 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
          </span>
        </TableCell>
        <TableCell className="p-0 pr-2 w-10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTrade(trade.id);
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </TableCell>
      </TableRow>
      
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={9} className="p-0">
            <TradeDetails trade={trade} />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default TradeRow;
