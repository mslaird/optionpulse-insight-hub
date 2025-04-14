
export interface StockData {
  id: string;
  name: string;
  ticker: string;
  type: 'stock' | 'etf' | 'strategy';
  price: number;
  change: number;
}

export const mockStocks: StockData[] = [
  {
    id: '1',
    name: 'Apple',
    ticker: 'AAPL',
    type: 'stock',
    price: 174.23,
    change: 0.9
  },
  {
    id: '2',
    name: 'S&P 500 ETF',
    ticker: 'SPY',
    type: 'etf',
    price: 453.82,
    change: 0.45
  },
  {
    id: '3',
    name: 'Tesla',
    ticker: 'TSLA',
    type: 'stock',
    price: 243.64,
    change: -1.2
  },
  {
    id: '4',
    name: 'Microsoft',
    ticker: 'MSFT',
    type: 'stock',
    price: 328.79,
    change: 1.5
  },
  {
    id: '5',
    name: 'Applied Materials',
    ticker: 'AMAT',
    type: 'stock',
    price: 167.35,
    change: 0.78
  },
  {
    id: '6',
    name: 'Spotify',
    ticker: 'SPOT',
    type: 'stock',
    price: 282.76,
    change: -0.63
  },
  {
    id: '7',
    name: 'Qualcomm',
    ticker: 'QCOM',
    type: 'stock',
    price: 152.98,
    change: 2.1
  },
  {
    id: '8',
    name: 'Covered Call',
    ticker: 'Strategy',
    type: 'strategy',
    price: 0,
    change: 0
  },
  {
    id: '9',
    name: 'Iron Condor',
    ticker: 'Strategy',
    type: 'strategy',
    price: 0,
    change: 0
  }
];
