
export interface Trade {
  id: string;
  date: string;
  ticker: string;
  strategy: string;
  action: 'buy' | 'sell';
  quantity: number;
  premium: number;
  strike: number;
  expiryDate: string;
  result: 'profit' | 'loss' | 'open';
  profitLoss: number;
  notes: string;
  relatedAlert?: string;
}

export interface TradeFilterOptions {
  ticker: string;
  result: string;
}

export interface NewTradeFormData extends Omit<Trade, 'id'> {}

export interface TradeChartData {
  date: string;
  profitLoss: number;
  cumulativeProfitLoss: number;
}

export interface StrategyCount {
  strategy: string;
  count: number;
}

export interface ProfitByTicker {
  ticker: string;
  profit: number;
}
