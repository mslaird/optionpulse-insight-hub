
import { Trade, NewTradeFormData } from "../types";
import { useToast } from "@/hooks/use-toast";

export const useTradeActions = (trades: Trade[], setTrades: React.Dispatch<React.SetStateAction<Trade[]>>) => {
  const { toast } = useToast();

  const handleAddTrade = (newTrade: Omit<Trade, 'id'>) => {
    const newTradeWithId: Trade = {
      ...newTrade,
      id: Date.now().toString()
    };
    
    setTrades([newTradeWithId, ...trades]);
    
    toast({
      title: "Trade Added",
      description: `${newTrade.action === 'buy' ? 'Bought' : 'Sold'} ${newTrade.ticker} ${newTrade.strategy}`,
    });
    
    return {
      date: new Date().toISOString().slice(0, 10),
      ticker: 'AAPL',
      strategy: 'Long Call',
      action: 'buy' as const,
      quantity: 1,
      premium: 5,
      strike: 250,
      expiryDate: '2025-04-25',
      result: 'open' as const,
      profitLoss: 0,
      notes: ''
    };
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(trade => trade.id !== id));
    
    toast({
      title: "Trade Removed",
      description: "The trade has been deleted from your journal",
    });
  };

  return {
    handleAddTrade,
    handleDeleteTrade
  };
};
