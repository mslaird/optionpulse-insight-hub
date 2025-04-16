
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import { Trade } from "./types";
import TradeRow from "./TradeRow";

interface TradesTableProps {
  trades: Trade[];
  expandedTrade: string | null;
  onToggleDetails: (id: string) => void;
  onDeleteTrade: (id: string) => void;
}

const TradesTable: React.FC<TradesTableProps> = ({
  trades,
  expandedTrade,
  onToggleDetails,
  onDeleteTrade
}) => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trade Journal ({trades.length} trades)</CardTitle>
      </CardHeader>
      <CardContent>
        {trades.length === 0 ? (
          <EmptyTradeList />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">P/L</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TradeRow
                  key={trade.id}
                  trade={trade}
                  isExpanded={expandedTrade === trade.id}
                  onToggleDetails={onToggleDetails}
                  onDeleteTrade={onDeleteTrade}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

const EmptyTradeList = () => (
  <div className="text-center py-6">
    <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
    <h3 className="text-lg font-medium mb-2">No trades found</h3>
    <p className="text-muted-foreground mb-4">
      Your trade journal is empty. Add your first trade to get started.
    </p>
  </div>
);

export default TradesTable;
