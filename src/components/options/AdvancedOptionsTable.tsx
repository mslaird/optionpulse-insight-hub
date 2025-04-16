
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Bell, Share2, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptionStrategy } from "@/types/options";
import { optionStrategies } from "@/data/optionsChain";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface AdvancedOptionsTableProps {
  stock: string;
  expirationDate: string;
  optionType: string;
  strategyFilter: string;
  ivRange: [number, number];
  itmProbabilityRange: [number, number];
}

const AdvancedOptionsTable: React.FC<AdvancedOptionsTableProps> = ({
  stock,
  expirationDate,
  optionType,
  strategyFilter,
  ivRange,
  itmProbabilityRange,
}) => {
  const { toast } = useToast();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter strategies based on selected filters
  const filteredStrategies = optionStrategies.filter((strategy) => {
    // Filter by type
    if (optionType !== "all") {
      if (optionType === "calls" && !strategy.legs.some(leg => leg.type === "CALL")) {
        return false;
      }
      if (optionType === "puts" && !strategy.legs.some(leg => leg.type === "PUT")) {
        return false;
      }
    }
    
    // Filter by strategy type
    if (strategyFilter !== "all" && !strategy.type.includes(strategyFilter)) {
      return false;
    }
    
    // Filter by IV range
    const strategyIV = strategy.legs.reduce((sum, leg) => sum + leg.iv, 0) / strategy.legs.length;
    if (strategyIV < ivRange[0] || strategyIV > ivRange[1]) {
      return false;
    }
    
    // Filter by ITM probability
    if (strategy.itmProbability && (strategy.itmProbability < itmProbabilityRange[0] || 
        strategy.itmProbability > itmProbabilityRange[1])) {
      return false;
    }
    
    // If all filters pass, include this strategy
    return true;
  });
  
  // Sort strategies
  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    if (!sortField) return 0;
    
    let valA, valB;
    
    switch(sortField) {
      case "name":
        valA = a.name;
        valB = b.name;
        break;
      case "netCreditDebit":
        valA = a.isCredit ? a.netCreditDebit : -a.netCreditDebit;
        valB = b.isCredit ? b.netCreditDebit : -b.netCreditDebit;
        break;
      case "maxProfit":
        valA = a.maxProfit === "Unlimited" ? Infinity : a.maxProfit;
        valB = b.maxProfit === "Unlimited" ? Infinity : b.maxProfit;
        break;
      case "maxLoss":
        valA = a.maxLoss;
        valB = b.maxLoss;
        break;
      case "itmProbability":
        valA = a.itmProbability || 0;
        valB = b.itmProbability || 0;
        break;
      case "delta":
        valA = Math.abs(a.delta || 0);
        valB = Math.abs(b.delta || 0);
        break;
      case "theta":
        valA = a.theta || 0;
        valB = b.theta || 0;
        break;
      case "vega":
        valA = a.vega || 0;
        valB = b.vega || 0;
        break;
      default:
        return 0;
    }
    
    return sortDirection === "asc" 
      ? (valA > valB ? 1 : -1)
      : (valA < valB ? 1 : -1);
  });
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const handleSetAlert = (strategy: OptionStrategy) => {
    toast({
      title: "Alert Set",
      description: `You'll be notified of significant changes to ${strategy.name}`,
    });
  };
  
  const handleShareToCommunity = (strategy: OptionStrategy) => {
    toast({
      title: "Shared to Community",
      description: `Your ${strategy.name} strategy has been shared to the community`,
    });
  };
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sliders size={18} className="text-optionpulse-blue" />
          {stock} Advanced Strategies - {expirationDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("name")}
                >
                  Strategy {getSortIcon("name")}
                </TableHead>
                <TableHead>Legs</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("netCreditDebit")}
                >
                  Net Credit/Debit {getSortIcon("netCreditDebit")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("maxProfit")}
                >
                  Max Profit {getSortIcon("maxProfit")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("maxLoss")}
                >
                  Max Loss {getSortIcon("maxLoss")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("itmProbability")}
                >
                  ITM % {getSortIcon("itmProbability")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("delta")}
                >
                  Delta {getSortIcon("delta")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("theta")}
                >
                  Theta {getSortIcon("theta")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-optionpulse-blue"
                  onClick={() => handleSort("vega")}
                >
                  Vega {getSortIcon("vega")}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStrategies.length > 0 ? (
                sortedStrategies.map((strategy) => (
                  <TableRow key={strategy.id} className="hover:bg-muted/10">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {strategy.name}
                        <ExplanationTooltip 
                          title={strategy.name}
                          content={getStrategyDescription(strategy.type)}
                          iconSize={14}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {strategy.legs.map((leg, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <Badge variant={leg.type === "CALL" ? "default" : "outline"} className={cn(
                              "text-xs",
                              leg.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"
                            )}>
                              {leg.type}
                            </Badge>
                            <span className={cn(
                              "text-xs",
                              leg.opportunity === "buy" ? "text-optionpulse-green" : "text-optionpulse-red"
                            )}>
                              {leg.opportunity === "buy" ? "BUY" : "SELL"} ${leg.strike}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className={cn(
                      strategy.isCredit ? "text-optionpulse-green" : "text-optionpulse-red"
                    )}>
                      {strategy.isCredit ? "+" : "-"}${strategy.netCreditDebit.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-optionpulse-green">
                      {typeof strategy.maxProfit === "number"
                        ? `$${strategy.maxProfit.toFixed(0)}`
                        : strategy.maxProfit}
                    </TableCell>
                    <TableCell className="text-optionpulse-red">
                      ${strategy.maxLoss.toFixed(0)}
                    </TableCell>
                    <TableCell>{strategy.itmProbability}%</TableCell>
                    <TableCell>
                      {strategy.delta && strategy.delta.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {strategy.theta && strategy.theta.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {strategy.vega && strategy.vega.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => handleSetAlert(strategy)}
                        >
                          <Bell size={14} className="mr-1" />
                          Alert
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => handleShareToCommunity(strategy)}
                        >
                          <Share2 size={14} className="mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          asChild
                        >
                          <Link to="/tools">
                            <BarChart3 size={14} className="mr-1" />
                            Build
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No strategies match your criteria. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get strategy descriptions
const getStrategyDescription = (type: string) => {
  switch(type) {
    case "credit-spread":
      return "A credit spread is an options strategy where you simultaneously buy and sell options of the same type and expiration date, but at different strike prices. Credit spreads generate immediate income (a credit) at the cost of taking on defined risk.";
    case "debit-spread":
      return "A debit spread is an options strategy where you simultaneously buy and sell options of the same type and expiration date, but at different strike prices. Unlike credit spreads, debit spreads require an initial investment (a debit) but have potential for profit if the underlying moves favorably.";
    case "iron-condor":
      return "An iron condor is a multi-leg options strategy that combines a bull put spread and a bear call spread. It's designed to profit from low volatility in the underlying asset, where the price stays within a specific range.";
    case "straddle":
      return "A straddle is an options strategy that involves buying both a call and a put option at the same strike price and expiration date. It's designed to profit from significant price movement in either direction.";
    case "strangle":
      return "A strangle is similar to a straddle but uses different strike prices for the call and put options. It's typically cheaper than a straddle but requires a larger price movement to be profitable.";
    case "leaps-call":
      return "LEAPS (Long-term Equity Anticipation Securities) calls are options with expiration dates longer than a year away. They provide exposure to long-term bullish movements with less capital than owning the stock outright.";
    case "leaps-put":
      return "LEAPS puts are long-term put options with expiration dates greater than a year away. They're used for long-term bearish positions or as insurance against major market downturns.";
    default:
      return "An options strategy that involves multiple option contracts to create a specific risk/reward profile.";
  }
};

export default AdvancedOptionsTable;
