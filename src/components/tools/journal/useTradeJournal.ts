
import { useState, useEffect } from "react";
import { Trade, TradeFilterOptions } from "./types";
import { initialTrades } from "./data/initialTrades";
import { calculateTradeStatistics } from "./utils/statisticsUtils";
import { useTradeActions } from "./utils/tradeActions";
import { loadTradesFromStorage, saveTradeToStorage } from "./utils/localStorage";

export const useTradeJournal = () => {
  // All useState calls must come before any useEffect calls
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [filters, setFilters] = useState<TradeFilterOptions>({
    ticker: "all",
    result: "all",
    strategy: "all"
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [expandedTrade, setExpandedTrade] = useState<string | null>(null);
  
  const [newTrade, setNewTrade] = useState<Omit<Trade, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    ticker: 'AAPL',
    strategy: 'Long Call',
    action: 'buy',
    quantity: 1,
    premium: 5,
    strike: 250,
    expiryDate: '2025-04-25',
    result: 'open',
    profitLoss: 0,
    notes: ''
  });

  // Get trade actions - must be called before useEffect to maintain hook order
  const { handleAddTrade, handleDeleteTrade } = useTradeActions(trades, setTrades);

  // Load trades from localStorage on mount
  useEffect(() => {
    const savedTrades = loadTradesFromStorage();
    if (savedTrades) {
      setTrades(savedTrades);
    }
  }, []);

  // Save trades to localStorage when updated
  useEffect(() => {
    saveTradeToStorage(trades);
  }, [trades]);

  // Filter trades based on current filter settings
  const filteredTrades = trades.filter(trade => {
    const matchesTicker = filters.ticker === 'all' || trade.ticker === filters.ticker;
    const matchesResult = filters.result === 'all' || trade.result === filters.result;
    const matchesStrategy = filters.strategy === 'all' || trade.strategy === filters.strategy;
    return matchesTicker && matchesResult && matchesStrategy;
  });

  // Get statistics
  const statistics = calculateTradeStatistics(trades);

  const handleToggleDetails = (id: string) => {
    setExpandedTrade(expandedTrade === id ? null : id);
  };

  const updateFilters = (filterType: keyof TradeFilterOptions, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleAddTradeSubmit = () => {
    const resetTrade = handleAddTrade(newTrade);
    setShowAddForm(false);
    setNewTrade(resetTrade);
  };

  return {
    trades,
    filteredTrades,
    filters,
    newTrade,
    showAddForm,
    showStats,
    expandedTrade,
    statistics,
    actions: {
      handleAddTrade: handleAddTradeSubmit,
      handleDeleteTrade,
      handleToggleDetails,
      updateFilters,
      setNewTrade,
      setShowAddForm,
      setShowStats
    }
  };
};
