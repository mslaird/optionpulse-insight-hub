
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

interface BasicOptionsChainTableProps { 
  stock: string;
  expirationDate: string;
  optionType: string;
  showOpportunities: boolean;
  strategyFilter: string;
}

const BasicOptionsChainTable = ({ 
  stock, 
  expirationDate, 
  optionType,
  showOpportunities,
  strategyFilter
}: BasicOptionsChainTableProps) => {
  // Mock data for options chain
  const callOptions = [
    { strike: 170, lastPrice: 12.85, bid: 12.70, ask: 12.95, change: 0.35, volume: 1243, openInterest: 5642, iv: 28.5, opportunity: "covered-call", premium: "high", moneyness: "itm" },
    { strike: 175, lastPrice: 8.65, bid: 8.50, ask: 8.75, change: 0.20, volume: 2154, openInterest: 8934, iv: 27.8, opportunity: null, premium: "medium", moneyness: "itm" },
    { strike: 180, lastPrice: 5.35, bid: 5.25, ask: 5.45, change: -0.15, volume: 3265, openInterest: 12456, iv: 26.4, opportunity: "covered-call", premium: "high", moneyness: "atm" },
    { strike: 185, lastPrice: 3.15, bid: 3.05, ask: 3.25, change: -0.25, volume: 1876, openInterest: 9876, iv: 25.9, opportunity: "naked-call", premium: "medium", moneyness: "otm" },
    { strike: 190, lastPrice: 1.75, bid: 1.65, ask: 1.80, change: -0.30, volume: 967, openInterest: 7653, iv: 24.7, opportunity: "naked-call", premium: "low", moneyness: "otm" },
  ];
  
  const putOptions = [
    { strike: 170, lastPrice: 4.25, bid: 4.15, ask: 4.35, change: -0.20, volume: 876, openInterest: 4532, iv: 29.2, opportunity: "cash-secured-put", premium: "medium", moneyness: "otm" },
    { strike: 175, lastPrice: 6.35, bid: 6.25, ask: 6.45, change: -0.15, volume: 1245, openInterest: 6543, iv: 28.5, opportunity: "cash-secured-put", premium: "high", moneyness: "otm" },
    { strike: 180, lastPrice: 9.15, bid: 9.05, ask: 9.25, change: -0.10, volume: 2134, openInterest: 8765, iv: 27.9, opportunity: "cash-secured-put", premium: "high", moneyness: "atm" },
    { strike: 185, lastPrice: 12.85, bid: 12.75, ask: 12.95, change: 0.25, volume: 1598, openInterest: 5432, iv: 29.5, opportunity: null, premium: "high", moneyness: "itm" },
    { strike: 190, lastPrice: 17.45, bid: 17.35, ask: 17.55, change: 0.40, volume: 763, openInterest: 3421, iv: 31.2, opportunity: null, premium: "high", moneyness: "itm" },
  ];
  
  // Filter options based on selected type
  let displayOptions = [];
  if (optionType === "calls" || optionType === "all") {
    displayOptions.push(...callOptions.map(option => ({ ...option, type: "CALL" })));
  }
  if (optionType === "puts" || optionType === "all") {
    displayOptions.push(...putOptions.map(option => ({ ...option, type: "PUT" })));
  }
  
  // Apply strategy filter
  if (strategyFilter === "high-premium-calls") {
    displayOptions = displayOptions.filter(option => 
      option.type === "CALL" && option.premium === "high"
    );
  } else if (strategyFilter === "otm-puts") {
    displayOptions = displayOptions.filter(option => 
      option.type === "PUT" && option.moneyness === "otm"
    );
  } else if (strategyFilter === "naked-calls") {
    displayOptions = displayOptions.filter(option => 
      option.type === "CALL" && option.opportunity === "naked-call"
    );
  }
  
  // Filter opportunities if selected
  if (showOpportunities) {
    displayOptions = displayOptions.filter(option => option.opportunity !== null);
  }
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sliders size={18} className="text-optionpulse-blue" />
          {stock} Options - {expirationDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Strike</TableHead>
                <TableHead>Last</TableHead>
                <TableHead>Bid</TableHead>
                <TableHead>Ask</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Open Int</TableHead>
                <TableHead>IV</TableHead>
                <TableHead>Opportunity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayOptions.map((option, index) => (
                <TableRow 
                  key={`${option.type}-${option.strike}-${index}`}
                  className={cn(
                    option.opportunity && "bg-optionpulse-blue/5 hover:bg-optionpulse-blue/10",
                    option.opportunity === "naked-call" && "bg-optionpulse-red/5 hover:bg-optionpulse-red/10"
                  )}
                >
                  <TableCell>
                    <Badge variant={option.type === "CALL" ? "default" : "outline"} className={option.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"}>
                      {option.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${option.strike}</TableCell>
                  <TableCell>${option.lastPrice.toFixed(2)}</TableCell>
                  <TableCell>${option.bid.toFixed(2)}</TableCell>
                  <TableCell>${option.ask.toFixed(2)}</TableCell>
                  <TableCell className={option.change > 0 ? "text-optionpulse-green" : "text-optionpulse-red"}>
                    {option.change > 0 ? "+" : ""}{option.change.toFixed(2)}
                  </TableCell>
                  <TableCell>{option.volume.toLocaleString()}</TableCell>
                  <TableCell>{option.openInterest.toLocaleString()}</TableCell>
                  <TableCell>{option.iv.toFixed(1)}%</TableCell>
                  <TableCell>
                    {option.opportunity === "covered-call" && (
                      <Badge variant="outline" className="border-optionpulse-green text-optionpulse-green">
                        Covered Call
                      </Badge>
                    )}
                    {option.opportunity === "cash-secured-put" && (
                      <Badge variant="outline" className="border-optionpulse-blue text-optionpulse-blue">
                        Cash-Secured Put
                      </Badge>
                    )}
                    {option.opportunity === "naked-call" && (
                      <Badge variant="outline" className="border-optionpulse-red text-optionpulse-red">
                        Naked Call
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicOptionsChainTable;
