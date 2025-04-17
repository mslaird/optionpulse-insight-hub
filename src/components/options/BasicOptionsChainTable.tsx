
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
  data: any;
  isLoading: boolean;
  error: any;
}

const BasicOptionsChainTable = ({ 
  stock, 
  expirationDate, 
  optionType,
  showOpportunities,
  strategyFilter,
  data,
  isLoading,
  error
}: BasicOptionsChainTableProps) => {
  if (isLoading) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="animate-pulse">Loading options data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="p-6">
          <div className="text-destructive">Error loading options data</div>
        </CardContent>
      </Card>
    );
  }

  // Filter options based on selected type
  let displayOptions = data?.options || [];
  if (optionType === "calls") {
    displayOptions = displayOptions.filter(option => option.type === "CALL");
  } else if (optionType === "puts") {
    displayOptions = displayOptions.filter(option => option.type === "PUT");
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
