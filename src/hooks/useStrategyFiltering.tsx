
import { useState } from "react";
import { OptionStrategy } from "@/types/options";

interface StrategyFilteringProps {
  strategies: OptionStrategy[];
  optionType: string;
  strategyFilter: string;
  ivRange?: [number, number];
  itmProbabilityRange?: [number, number];
}

export const useStrategyFiltering = ({
  strategies,
  optionType,
  strategyFilter,
  ivRange = [0, 100],
  itmProbabilityRange = [0, 100]
}: StrategyFilteringProps) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Apply filters
  let filteredStrategies = [...strategies];
  
  // Filter by option type
  if (optionType !== "all") {
    const filterType = optionType === "calls" ? "CALL" : "PUT";
    filteredStrategies = filteredStrategies.filter(strategy => 
      // For multi-leg strategies, check if any leg matches the filter
      strategy.legs.some(leg => leg.type === filterType)
    );
  }
  
  // Filter by strategy type
  if (strategyFilter !== "all") {
    filteredStrategies = filteredStrategies.filter(strategy => 
      strategy.type.includes(strategyFilter)
    );
  }
  
  // Filter by IV range - use average IV of all legs
  filteredStrategies = filteredStrategies.filter(strategy => {
    const avgIV = strategy.legs.reduce((sum, leg) => sum + leg.iv, 0) / strategy.legs.length;
    return avgIV >= ivRange[0] && avgIV <= ivRange[1];
  });
  
  // Filter by ITM probability range
  filteredStrategies = filteredStrategies.filter(strategy => 
    strategy.itmProbability !== undefined && 
    strategy.itmProbability >= itmProbabilityRange[0] && 
    strategy.itmProbability <= itmProbabilityRange[1]
  );
  
  // Apply sorting
  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    if (!sortField) return 0;
    
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    if (sortField === "netCreditDebit") {
      const aValue = a.isCredit ? a.netCreditDebit : -a.netCreditDebit;
      const bValue = b.isCredit ? b.netCreditDebit : -b.netCreditDebit;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (sortField === "maxProfit") {
      const aValue = typeof a.maxProfit === "number" ? a.maxProfit : Infinity;
      const bValue = typeof b.maxProfit === "number" ? b.maxProfit : Infinity;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (sortField === "maxLoss") {
      return sortDirection === "asc" 
        ? a.maxLoss - b.maxLoss 
        : b.maxLoss - a.maxLoss;
    }
    
    if (sortField === "itmProbability" && a.itmProbability !== undefined && b.itmProbability !== undefined) {
      return sortDirection === "asc" 
        ? a.itmProbability - b.itmProbability 
        : b.itmProbability - a.itmProbability;
    }
    
    // Handle Greek values
    if (["delta", "gamma", "theta", "vega"].includes(sortField) && 
        a[sortField as keyof OptionStrategy] !== undefined && 
        b[sortField as keyof OptionStrategy] !== undefined) {
      const aValue = a[sortField as keyof OptionStrategy] as number;
      const bValue = b[sortField as keyof OptionStrategy] as number;
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
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
