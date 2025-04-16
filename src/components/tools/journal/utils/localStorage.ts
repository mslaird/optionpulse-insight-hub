
import { Trade } from "../types";

export const loadTradesFromStorage = (): Trade[] | null => {
  try {
    const savedTrades = localStorage.getItem('tradeJournal');
    return savedTrades ? JSON.parse(savedTrades) : null;
  } catch (error) {
    console.error("Error loading trades from storage:", error);
    return null;
  }
};

export const saveTradeToStorage = (trades: Trade[]): void => {
  try {
    localStorage.setItem('tradeJournal', JSON.stringify(trades));
  } catch (error) {
    console.error("Error saving trades to storage:", error);
  }
};
