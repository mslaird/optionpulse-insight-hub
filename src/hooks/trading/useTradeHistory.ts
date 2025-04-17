
import { useState } from "react";

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

export const useTradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);

  const addTrade = (newTrade: Trade) => {
    setTradeHistory([newTrade, ...tradeHistory]);
  };

  return {
    tradeHistory,
    addTrade
  };
};
