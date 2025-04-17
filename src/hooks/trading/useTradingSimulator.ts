
import { useState } from "react";
import { mockStocks } from "@/data/mockStockData";
import { mockOptionsData } from "@/components/trading/simulated/mockOptionsData";
import { useToast } from "@/hooks/use-toast";
import { Trade } from "./useTradeHistory";

export interface EstimatedPnL {
  value: number;
  percent: number;
  greeks: {
    delta: number;
    theta: number;
  };
}

export const useTradingSimulator = (
  selectedTicker: string,
  optionType: string,
  expiryType: string,
  leapsExpiry: string,
  strikePrice: string,
  quantity: string,
  selectedLeapsOption: any,
  deductFromAccount: (amount: number) => void,
  addTrade: (trade: Trade) => void
) => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTradeSummary, setShowTradeSummary] = useState(false);
  const [estimatedPnL, setEstimatedPnL] = useState<EstimatedPnL>({
    value: 0,
    percent: 0,
    greeks: {
      delta: 0,
      theta: 0
    }
  });

  const calculateEstimatedPnL = () => {
    const stockPrice = mockStocks.find(stock => stock.ticker === selectedTicker)?.price || 0;
    let optionPrice = 0;
    let delta = 0;
    let theta = 0;
    if (expiryType === "standard") {
      optionPrice = mockOptionsData[selectedTicker]?.standard?.bid || 0;
      delta = 0.5;
    } else if (selectedLeapsOption) {
      optionPrice = selectedLeapsOption.bid;
      delta = selectedLeapsOption.delta;
      theta = selectedLeapsOption.theta;
    }
    const qty = parseInt(quantity) || 0;
    const cost = optionPrice * 100 * qty;
    const projectedChange = optionType === "call" ? Math.max(0, stockPrice * 1.1 - parseFloat(strikePrice)) * 100 * qty : Math.max(0, parseFloat(strikePrice) - stockPrice * 0.9) * 100 * qty;
    const pnlValue = projectedChange - cost;
    const pnlPercent = cost > 0 ? pnlValue / cost * 100 : 0;
    return {
      value: pnlValue,
      percent: pnlPercent,
      greeks: {
        delta,
        theta
      }
    };
  };

  const calculateTotalCost = () => {
    let bid = 0;
    if (expiryType === "standard") {
      bid = mockOptionsData[selectedTicker]?.standard?.bid || 0;
    } else if (selectedLeapsOption) {
      bid = selectedLeapsOption.bid;
    }
    const qty = parseInt(quantity) || 0;
    return bid * 100 * qty;
  };

  const handleSimulateTrade = () => {
    setIsSimulating(true);
    setShowTradeSummary(false);

    setTimeout(() => {
      setIsSimulating(false);
      setShowTradeSummary(true);

      const cost = calculateTotalCost();
      deductFromAccount(cost);

      const pnl = calculateEstimatedPnL();
      setEstimatedPnL(pnl);

      const newTrade = {
        id: Date.now(),
        ticker: selectedTicker,
        type: optionType,
        strike: strikePrice,
        expiry: expiryType === "standard" ? "30-90 days" : leapsExpiry,
        quantity: parseInt(quantity),
        cost: cost,
        timestamp: new Date().toLocaleString(),
        isLeaps: expiryType === "leaps"
      };
      addTrade(newTrade);

      toast({
        title: `${expiryType === "leaps" ? "LEAPS" : "Standard"} Option Trade Simulated`,
        description: `${quantity} ${selectedTicker} $${strikePrice} ${optionType}, expiry: ${expiryType === "leaps" ? leapsExpiry : "30-90 days"}`,
        variant: "default",
        className: "bg-black/80 border-[#00B7EB]/30 text-white"
      });
    }, 1000);
  };

  return {
    isSimulating,
    showTradeSummary,
    estimatedPnL,
    calculateTotalCost,
    handleSimulateTrade
  };
};
