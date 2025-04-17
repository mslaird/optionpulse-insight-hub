
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StrategyTableHeaderProps {
  sortField: string | null;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}

const StrategyTableHeader: React.FC<StrategyTableHeaderProps> = ({ 
  sortField, 
  sortDirection, 
  onSort 
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("name")}
        >
          Strategy {getSortIcon("name")}
        </TableHead>
        <TableHead>Legs</TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("netCreditDebit")}
        >
          Net Credit/Debit {getSortIcon("netCreditDebit")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("maxProfit")}
        >
          Max Profit {getSortIcon("maxProfit")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("maxLoss")}
        >
          Max Loss {getSortIcon("maxLoss")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("itmProbability")}
        >
          ITM % {getSortIcon("itmProbability")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("delta")}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  Delta {getSortIcon("delta")}
                  <HelpCircle size={12} className="ml-1 text-muted-foreground/70" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[180px]">Rate of change in option price for every $1 move in the underlying stock</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("gamma")}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  Gamma {getSortIcon("gamma")}
                  <HelpCircle size={12} className="ml-1 text-muted-foreground/70" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[180px]">Rate of change in delta for every $1 move in the underlying stock</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("theta")}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  Theta {getSortIcon("theta")}
                  <HelpCircle size={12} className="ml-1 text-muted-foreground/70" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[180px]">Rate of time decay - how much value is lost each day</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("vega")}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  Vega {getSortIcon("vega")}
                  <HelpCircle size={12} className="ml-1 text-muted-foreground/70" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[180px]">Sensitivity to changes in implied volatility</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead>
          <span className="flex items-center">
            Actions
          </span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default StrategyTableHeader;
