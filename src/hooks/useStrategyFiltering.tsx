
import { useState, useMemo } from "react";
import { OptionStrategy } from "@/types/options";

interface UseStrategyFilteringProps {
  strategies: OptionStrategy[];
  optionType: string;
  strategyFilter: string;
  ivRange: [number, number];
  itmProbabilityRange: [number, number];
}

export const useStrategyFiltering = ({
  strategies,
  optionType,
  strategyFilter,
  ivRange,
  itmProbabilityRange
}: UseStrategyFilteringProps) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter strategies based on selected filters
  const filteredStrategies = useMemo(() => {
    return strategies.filter((strategy) => {
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
  }, [strategies, optionType, strategyFilter, ivRange, itmProbabilityRange]);
  
  // Sort strategies
  const sortedStrategies = useMemo(() => {
    return [...filteredStrategies].sort((a, b) => {
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
          valA = typeof a.maxProfit === "string" ? Infinity : a.maxProfit;
          valB = typeof b.maxProfit === "string" ? Infinity : b.maxProfit;
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
  }, [filteredStrategies, sortField, sortDirection]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    sortedStrategies,
    sortField,
    sortDirection,
    handleSort
  };
};
