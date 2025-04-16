
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2, Calendar, CircleDollarSign, FileText } from "lucide-react";
import { Trade } from "./types";

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
          <div className="text-center py-6">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No trades found</h3>
            <p className="text-muted-foreground mb-4">
              {trades.length === 0 
                ? "Your trade journal is empty. Add your first trade to get started."
                : "No trades match your current filters. Try adjusting your filters or add new trades."}
            </p>
          </div>
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
                <React.Fragment key={trade.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={() => onToggleDetails(trade.id)}
                  >
                    <TableCell className="p-0 pl-2 w-10">
                      <ChevronDown size={16} className={`transition-transform ${expandedTrade === trade.id ? 'rotate-180' : ''}`} />
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
                  
                  {expandedTrade === trade.id && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-0">
                        <div className="bg-muted/20 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Trade Details</div>
                              <div className="text-sm">
                                {trade.action === 'buy' ? 'Bought' : 'Sold'} {trade.quantity} x {trade.ticker} {trade.strategy} @ ${trade.premium.toFixed(2)}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Contract Value</div>
                              <div className="text-sm font-medium">
                                ${(trade.premium * trade.quantity * 100).toFixed(2)}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Strike & Expiry</div>
                              <div className="text-sm">
                                ${trade.strike} expiring {trade.expiryDate}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="text-xs text-muted-foreground">Profit/Loss</div>
                              <div className={`text-sm font-medium ${trade.profitLoss > 0 ? 'text-optionpulse-green' : trade.profitLoss < 0 ? 'text-optionpulse-red' : ''}`}>
                                <CircleDollarSign size={14} className="inline mr-1" />
                                {trade.profitLoss > 0 ? '+' : ''}{trade.profitLoss.toFixed(2)} 
                                {trade.profitLoss !== 0 && (
                                  <span className="text-xs ml-1">
                                    ({((trade.profitLoss / (trade.premium * trade.quantity * 100)) * 100).toFixed(1)}%)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {trade.notes && (
                            <div className="bg-muted/30 p-3 rounded-md">
                              <div className="text-xs text-muted-foreground mb-1">Notes</div>
                              <div className="text-sm">{trade.notes}</div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TradesTable;
