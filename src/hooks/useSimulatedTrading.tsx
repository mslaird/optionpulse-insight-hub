
import { useAccountValue } from "./trading/useAccountValue";
import { useOptionSelection } from "./trading/useOptionSelection";
import { useLeapsTrading } from "./trading/useLeapsTrading";
import { useTradeHistory } from "./trading/useTradeHistory";
import { useTradingSimulator } from "./trading/useTradingSimulator";

export interface EstimatedPnL {
  value: number;
  percent: number;
  greeks: {
    delta: number;
    theta: number;
  };
}

export interface Trade {
  id: number;
  ticker: string;
  type: string;
  strike: string;
  expiry: string;
  quantity: number;
  cost: number;
  timestamp: string;
  isLeaps: boolean;
}

export const useSimulatedTrading = () => {
  // Use smaller hooks
  const { accountValue, deductFromAccount } = useAccountValue();
  
  const {
    selectedTicker,
    setSelectedTicker,
    optionType,
    setOptionType,
    expiryType,
    setExpiryType,
    leapsExpiry,
    setLeapsExpiry,
    strikePrice,
    setStrikePrice,
    quantity,
    setQuantity,
    selectedLeapsOption,
    stockOptions,
    getAvailableStrikes
  } = useOptionSelection();
  
  const { recommendedAlert, handleTestAlert } = useLeapsTrading(
    selectedTicker,
    setOptionType,
    setStrikePrice,
    setLeapsExpiry
  );
  
  const { tradeHistory, addTrade } = useTradeHistory();
  
  const {
    isSimulating,
    showTradeSummary,
    estimatedPnL,
    calculateTotalCost,
    handleSimulateTrade
  } = useTradingSimulator(
    selectedTicker,
    optionType,
    expiryType,
    leapsExpiry,
    strikePrice,
    quantity,
    selectedLeapsOption,
    deductFromAccount,
    addTrade
  );

  return {
    accountValue,
    isSimulating,
    showTradeSummary,
    selectedTicker,
    setSelectedTicker,
    optionType,
    setOptionType,
    expiryType,
    setExpiryType,
    leapsExpiry,
    setLeapsExpiry,
    strikePrice,
    setStrikePrice,
    quantity,
    setQuantity,
    selectedLeapsOption,
    estimatedPnL,
    tradeHistory,
    stockOptions,
    recommendedAlert,
    handleTestAlert,
    getAvailableStrikes,
    calculateTotalCost,
    handleSimulateTrade
  };
};

// Re-export types from the smaller hooks
export { leapsExpiryDates } from "@/components/trading/simulated/mockOptionsData";
