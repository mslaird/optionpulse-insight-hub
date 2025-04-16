
import { useState } from "react";
import { OptionsChainState } from "@/types/options";
import { useToast } from "@/hooks/use-toast";

export const useOptionsChainState = () => {
  const { toast } = useToast();
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [expirationDate, setExpirationDate] = useState("2025-05-16");
  const [optionType, setOptionType] = useState("all");
  const [showOpportunities, setShowOpportunities] = useState(true);
  const [strategyFilter, setStrategyFilter] = useState("all");
  
  // Advanced options state
  const [state, setState] = useState<OptionsChainState>({
    isAdvancedView: false,
    isPro: false,
    showProModal: false
  });
  
  // Advanced filters state
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [ivRange, setIvRange] = useState<[number, number]>([10, 50]);
  const [itmProbabilityRange, setItmProbabilityRange] = useState<[number, number]>([0, 100]);

  // Mock data for stock price and change
  const stockPrice = 178.39;
  const stockChange = 1.25;
  const stockChangePercent = 0.71;
  
  const toggleAdvancedView = () => {
    if (!state.isPro && !state.isAdvancedView) {
      setState({ ...state, showProModal: true });
    } else {
      setState({ ...state, isAdvancedView: !state.isAdvancedView });
    }
  };
  
  const handleTryPro = () => {
    setState({
      isPro: true,
      isAdvancedView: true,
      showProModal: false
    });
    
    toast({
      title: "Pro Trial Activated!",
      description: "You now have access to advanced options features for 7 days.",
    });
  };
  
  const handleCloseProModal = () => {
    setState({ ...state, showProModal: false });
  };
  
  const resetFilters = () => {
    setOptionType("all");
    setStrategyFilter("all");
    setExpiryFilter("all");
    setIvRange([10, 50]);
    setItmProbabilityRange([0, 100]);
    setShowOpportunities(true);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };

  return {
    selectedStock,
    setSelectedStock,
    expirationDate,
    setExpirationDate,
    optionType,
    setOptionType,
    showOpportunities,
    setShowOpportunities,
    strategyFilter,
    setStrategyFilter,
    state,
    setState,
    expiryFilter,
    setExpiryFilter,
    ivRange,
    setIvRange,
    itmProbabilityRange,
    setItmProbabilityRange,
    stockPrice,
    stockChange,
    stockChangePercent,
    toggleAdvancedView,
    handleTryPro,
    handleCloseProModal,
    resetFilters
  };
};
