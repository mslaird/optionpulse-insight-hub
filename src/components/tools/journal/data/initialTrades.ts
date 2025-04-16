
import { Trade } from "../types";

// Initial trade data 
export const initialTrades: Trade[] = [
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
