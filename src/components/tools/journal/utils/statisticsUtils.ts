
import { Trade } from "../types";

// Calculate various statistics from the trade data
export const calculateTradeStatistics = (trades: Trade[]) => {
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

  return {
    totalTrades,
    closedTrades,
    profitTrades,
    lossTrades,
    winRate,
    totalProfitLoss,
    profitByTicker,
    tradesByStrategy,
    tradeHistoryData
  };
};
