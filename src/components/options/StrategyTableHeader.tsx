
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
          Delta {getSortIcon("delta")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("theta")}
        >
          Theta {getSortIcon("theta")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-optionpulse-blue"
          onClick={() => onSort("vega")}
        >
          Vega {getSortIcon("vega")}
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default StrategyTableHeader;
