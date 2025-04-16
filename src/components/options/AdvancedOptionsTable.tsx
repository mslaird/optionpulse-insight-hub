
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Sliders } from "lucide-react";
import { optionStrategies } from "@/data/optionsChain";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { getStrategyDescription } from "@/utils/strategyDescriptions";
import StrategyLegs from "@/components/options/StrategyLegs";
import StrategyActions from "@/components/options/StrategyActions";
import StrategyTableHeader from "@/components/options/StrategyTableHeader";
import { useStrategyFiltering } from "@/hooks/useStrategyFiltering";

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
  const {
    sortedStrategies,
    sortField,
    sortDirection,
    handleSort
  } = useStrategyFiltering({
    strategies: optionStrategies,
    optionType,
    strategyFilter,
    ivRange,
    itmProbabilityRange
  });

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
            <StrategyTableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
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
