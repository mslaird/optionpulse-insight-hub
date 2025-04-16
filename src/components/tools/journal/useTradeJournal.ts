
import { useState, useEffect } from "react";
import { Trade, TradeFilterOptions } from "./types";
import { useToast } from "@/hooks/use-toast";

// Initial trade data 
const initialTrades: Trade[] = [
  {
    id: '1',
    date: '2025-04-01',
    ticker: 'AAPL',
    strategy: 'Long Call',
    action: 'buy',
    quantity: 1,
    premium: 5.50,
    strike: 250,
    expiryDate: '2025-04-25',
    result: 'profit',
    profitLoss: 125,
    notes: 'Bought call before earnings announcement'
  },
  {
    id: '2',
    date: '2025-04-05',
    ticker: 'SPY',
    strategy: 'Bear Put Spread',
    action: 'buy',
    quantity: 2,
    premium: 3.75,
    strike: 475,
    expiryDate: '2025-05-16',
    result: 'loss',
    profitLoss: -150,
    notes: 'Market continued to rally against my position'
  },
  {
    id: '3',
    date: '2025-04-10',
    ticker: 'QQQ',
    strategy: 'Iron Condor',
    action: 'sell',
    quantity: 1,
    premium: 4.20,
    strike: 400,
    expiryDate: '2025-05-30',
    result: 'open',
    profitLoss: 0,
    notes: 'Volatility play ahead of tech earnings season'
  }
];

export const useTradeJournal = () => {
  const { toast } = useToast();
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [filters, setFilters] = useState<TradeFilterOptions>({
    ticker: "all",
    result: "all"
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

  // Load trades from localStorage on mount
  useEffect(() => {
    const savedTrades = localStorage.getItem('tradeJournal');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  // Save trades to localStorage when updated
  useEffect(() => {
    localStorage.setItem('tradeJournal', JSON.stringify(trades));
  }, [trades]);

  // Filter trades based on current filter settings
  const filteredTrades = trades.filter(trade => {
    const matchesTicker = filters.ticker === 'all' || trade.ticker === filters.ticker;
    const matchesResult = filters.result === 'all' || trade.result === filters.result;
    return matchesTicker && matchesResult;
  });

  // Calculate statistics for the charts and metrics
  const totalTrades = trades.length;
  const closedTrades = trades.filter(t => t.result !== 'open').length;
  const profitTrades = trades.filter(t => t.result === 'profit').length;
  const lossTrades = trades.filter(t => t.result === 'loss').length;
  const winRate = closedTrades > 0 ? (profitTrades / closedTrades) * 100 : 0;
  const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);

  // Calculate profit by ticker for the pie chart
  const profitByTicker = Object.entries(
    trades.reduce((acc, trade) => {
      acc[trade.ticker] = (acc[trade.ticker] || 0) + trade.profitLoss;
      return acc;
    }, {} as {[key: string]: number})
  ).map(([ticker, profit]) => ({ ticker, profit }));

  // Calculate trades by strategy for the pie chart
  const tradesByStrategy = Object.entries(
    trades.reduce((acc, trade) => {
      acc[trade.strategy] = (acc[trade.strategy] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number})
  ).map(([strategy, count]) => ({ strategy, count }));

  // Prepare data for the trade history line chart
  const tradeHistoryData = [...trades]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((trade, index, array) => {
      const runningProfitLoss = array
        .slice(0, index + 1)
        .reduce((sum, t) => sum + t.profitLoss, 0);
      
      return {
        date: trade.date,
        profitLoss: trade.profitLoss,
        cumulativeProfitLoss: runningProfitLoss
      };
    });

  // CRUD Operations
  const handleAddTrade = () => {
    const newTradeWithId: Trade = {
      ...newTrade,
      id: Date.now().toString()
    };
    
    setTrades([newTradeWithId, ...trades]);
    setShowAddForm(false);
    
    toast({
      title: "Trade Added",
      description: `${newTrade.action === 'buy' ? 'Bought' : 'Sold'} ${newTrade.ticker} ${newTrade.strategy}`,
    });
    
    setNewTrade({
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
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(trade => trade.id !== id));
    
    toast({
      title: "Trade Removed",
      description: "The trade has been deleted from your journal",
    });
  };

  const handleToggleDetails = (id: string) => {
    setExpandedTrade(expandedTrade === id ? null : id);
  };

  const updateFilters = (filterType: keyof TradeFilterOptions, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return {
    trades,
    filteredTrades,
    filters,
    newTrade,
    showAddForm,
    showStats,
    expandedTrade,
    statistics: {
      totalTrades,
      closedTrades,
      profitTrades,
      lossTrades,
      winRate,
      totalProfitLoss,
      profitByTicker,
      tradesByStrategy,
      tradeHistoryData
    },
    actions: {
      handleAddTrade,
      handleDeleteTrade,
      handleToggleDetails,
      updateFilters,
      setNewTrade,
      setShowAddForm,
      setShowStats
    }
  };
};
