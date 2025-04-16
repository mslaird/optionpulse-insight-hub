
import { Trade } from "../types";

export const loadTradesFromStorage = (): Trade[] | null => {
  const savedTrades = localStorage.getItem('tradeJournal');
  return savedTrades ? JSON.parse(savedTrades) : null;
};

export const saveTradeToStorage = (trades: Trade[]): void => {
  localStorage.setItem('tradeJournal', JSON.stringify(trades));
};
