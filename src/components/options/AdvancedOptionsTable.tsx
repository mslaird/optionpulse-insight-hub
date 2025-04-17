import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Sliders, Share2 } from "lucide-react";
import { optionStrategies } from "@/data/optionsChain";
import { Button } from "@/components/ui/button";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { getStrategyDescription } from "@/utils/strategyDescriptions";
import StrategyLegs from "@/components/options/StrategyLegs";
import StrategyActions from "@/components/options/StrategyActions";
import StrategyTableHeader from "@/components/options/StrategyTableHeader";
import { useToast } from "@/hooks/use-toast";
import { useStrategyFiltering } from "@/hooks/useStrategyFiltering";

interface AdvancedOptionsTableProps {
  stock: string;
  expirationDate: string;
  optionType: string;
  strategyFilter: string;
  ivRange: [number, number];
  itmProbabilityRange: [number, number];
  data: any;
  isLoading: boolean;
  error: any;
}

const AdvancedOptionsTable: React.FC<AdvancedOptionsTableProps> = ({
  stock,
  expirationDate,
  optionType,
  strategyFilter,
  ivRange,
  itmProbabilityRange,
  data,
  isLoading,
  error
}) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  
  const {
    sortedStrategies,
    sortField,
    sortDirection,
    handleSort
  } = useStrategyFiltering({
    strategies: data?.strategies || [],
    optionType,
    strategyFilter,
    ivRange,
    itmProbabilityRange
  });

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

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sliders size={18} className="text-optionpulse-blue" />
          {stock} Advanced Strategies - {expirationDate}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="text-optionpulse-blue hover:text-optionpulse-blue-light transition-colors"
          onClick={handleShareToCommnunity}
          disabled={isSharing}
        >
          <Share2 size={16} className={`mr-1 ${isSharing ? 'animate-pulse' : ''}`} />
          {isSharing ? "Sharing..." : "Share to Community"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <StrategyTableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <TableBody>
              {sortedStrategies.length > 0 ? (
                sortedStrategies.map((strategy) => (
                  <TableRow key={strategy.id} className="hover:bg-muted/10 transition-colors duration-200">
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
                      <StrategyLegs legs={strategy.legs} />
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
                      {strategy.gamma && strategy.gamma.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {strategy.theta && strategy.theta.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {strategy.vega && strategy.vega.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <StrategyActions strategy={strategy} />
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

export default AdvancedOptionsTable;
