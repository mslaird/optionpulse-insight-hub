export interface StockData {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  type: 'stock' | 'etf' | 'crypto' | 'strategy';
}

export const mockStocks: StockData[] = [
  { id: '1', name: 'Apple Inc.', ticker: 'AAPL', price: 250.32, change: 1.25, type: 'stock' },
  { id: '2', name: 'Microsoft Corporation', ticker: 'MSFT', price: 420.18, change: -0.45, type: 'stock' },
  { id: '3', name: 'Tesla, Inc.', ticker: 'TSLA', price: 240.67, change: 3.78, type: 'stock' },
  { id: '4', name: 'Amazon.com Inc.', ticker: 'AMZN', price: 180.42, change: 0.68, type: 'stock' },
  { id: '5', name: 'Meta Platforms Inc.', ticker: 'META', price: 520.10, change: 2.31, type: 'stock' },
  { id: '6', name: 'Alphabet Inc.', ticker: 'GOOGL', price: 162.85, change: -1.07, type: 'stock' },
  
  { id: '7', name: 'SPDR S&P 500 ETF Trust', ticker: 'SPY', price: 475.32, change: 0.54, type: 'etf' },
  { id: '8', name: 'Invesco QQQ Trust', ticker: 'QQQ', price: 400.18, change: 0.88, type: 'etf' },
  { id: '9', name: 'iShares Russell 2000 ETF', ticker: 'IWM', price: 195.67, change: -0.32, type: 'etf' },
  
  { id: '10', name: 'Bitcoin', ticker: 'BTC', price: 43250.42, change: 5.68, type: 'crypto' },
  { id: '11', name: 'Ethereum', ticker: 'ETH', price: 2320.10, change: 4.31, type: 'crypto' },
  
  { id: '12', name: 'Covered Call', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '13', name: 'Iron Condor', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '14', name: 'The Wheel Strategy', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '15', name: 'Protective Put', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '16', name: 'Butterfly Spread', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '17', name: 'Long Straddle', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '18', name: 'Poor Man\'s Covered Call', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '19', name: 'Calendar Spread', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '20', name: 'Diagonal Spread', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
  { id: '21', name: 'Jade Lizard', ticker: 'STRATEGY', price: 0, change: 0, type: 'strategy' },
];
