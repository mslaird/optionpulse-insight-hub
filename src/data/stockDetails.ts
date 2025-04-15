
export interface StockDetails {
  id: string;
  name: string;
  ticker: string;
  description: string;
  marketCap: number; // in billions
  sector: string;
  industry: string;
  peRatio: number;
  eps: number;
  dividendYield: number;
  yearFounded: number;
  employees: number;
  headquarters: string;
  ceo: string;
  website: string;
  historicalData: {
    date: string;
    open: number;
    high: number;
    close: number;
    low: number;
    volume: number;
  }[];
  optionsData: {
    totalVolume: number;
    callVolume: number;
    putVolume: number;
    callPutRatio: number;
    impliedVolatility: number;
    topStrikes: {
      strike: number;
      type: 'call' | 'put';
      volume: number;
      openInterest: number;
    }[];
  };
}

// Provide detailed mock data for the stocks in mockStockData
export const stockDetailsData: Record<string, StockDetails> = {
  "AAPL": {
    id: "1",
    name: "Apple Inc.",
    ticker: "AAPL",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod.",
    marketCap: 2950.8,
    sector: "Technology",
    industry: "Consumer Electronics",
    peRatio: 32.45,
    eps: 7.72,
    dividendYield: 0.45,
    yearFounded: 1976,
    employees: 164000,
    headquarters: "Cupertino, California, USA",
    ceo: "Tim Cook",
    website: "https://www.apple.com",
    historicalData: [
      { date: "2025-04-10", open: 248.20, high: 252.10, close: 250.32, low: 247.50, volume: 21500000 },
      { date: "2025-04-09", open: 245.80, high: 248.50, close: 248.20, low: 245.30, volume: 18700000 },
      { date: "2025-04-08", open: 246.10, high: 247.90, close: 245.80, low: 244.20, volume: 19300000 },
      { date: "2025-04-07", open: 243.40, high: 246.60, close: 246.10, low: 243.10, volume: 20100000 },
      { date: "2025-04-06", open: 240.20, high: 244.20, close: 243.40, low: 239.80, volume: 17800000 },
      { date: "2025-04-05", open: 241.50, high: 242.30, close: 240.20, low: 238.90, volume: 16500000 },
      { date: "2025-04-04", open: 242.80, high: 244.10, close: 241.50, low: 241.00, volume: 17200000 }
    ],
    optionsData: {
      totalVolume: 850000,
      callVolume: 520000,
      putVolume: 330000,
      callPutRatio: 1.58,
      impliedVolatility: 22.5,
      topStrikes: [
        { strike: 255, type: 'call', volume: 78000, openInterest: 125000 },
        { strike: 260, type: 'call', volume: 65000, openInterest: 110000 },
        { strike: 250, type: 'put', volume: 59000, openInterest: 98000 },
        { strike: 245, type: 'put', volume: 48000, openInterest: 87000 },
        { strike: 265, type: 'call', volume: 42000, openInterest: 76000 }
      ]
    }
  },
  "MSFT": {
    id: "2",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing. The company was founded in 1975 and is headquartered in Redmond, Washington.",
    marketCap: 3200.5,
    sector: "Technology",
    industry: "Software—Infrastructure",
    peRatio: 38.25,
    eps: 11.01,
    dividendYield: 0.72,
    yearFounded: 1975,
    employees: 221000,
    headquarters: "Redmond, Washington, USA",
    ceo: "Satya Nadella",
    website: "https://www.microsoft.com",
    historicalData: [
      { date: "2025-04-10", open: 418.30, high: 422.40, close: 420.18, low: 417.90, volume: 19800000 },
      { date: "2025-04-09", open: 416.50, high: 419.20, close: 418.30, low: 415.70, volume: 17200000 },
      { date: "2025-04-08", open: 414.90, high: 417.30, close: 416.50, low: 414.20, volume: 18100000 },
      { date: "2025-04-07", open: 412.60, high: 415.80, close: 414.90, low: 412.10, volume: 16900000 },
      { date: "2025-04-06", open: 415.40, high: 416.20, close: 412.60, low: 411.50, volume: 15800000 },
      { date: "2025-04-05", open: 417.80, high: 418.90, close: 415.40, low: 414.30, volume: 16200000 },
      { date: "2025-04-04", open: 419.10, high: 421.30, close: 417.80, low: 417.10, volume: 18500000 }
    ],
    optionsData: {
      totalVolume: 780000,
      callVolume: 480000,
      putVolume: 300000,
      callPutRatio: 1.6,
      impliedVolatility: 20.8,
      topStrikes: [
        { strike: 425, type: 'call', volume: 72000, openInterest: 118000 },
        { strike: 430, type: 'call', volume: 61000, openInterest: 102000 },
        { strike: 415, type: 'put', volume: 55000, openInterest: 93000 },
        { strike: 410, type: 'put', volume: 45000, openInterest: 82000 },
        { strike: 435, type: 'call', volume: 40000, openInterest: 71000 }
      ]
    }
  },
  "TSLA": {
    id: "3",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    description: "Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, and energy generation and storage systems. The company operates in two segments, Automotive, and Energy Generation and Storage. It also provides vehicle service centers, supercharger stations, and self-driving capability.",
    marketCap: 760.3,
    sector: "Automotive",
    industry: "Auto Manufacturers",
    peRatio: 60.12,
    eps: 4.01,
    dividendYield: 0,
    yearFounded: 2003,
    employees: 127855,
    headquarters: "Austin, Texas, USA",
    ceo: "Elon Musk",
    website: "https://www.tesla.com",
    historicalData: [
      { date: "2025-04-10", open: 237.90, high: 242.80, close: 240.67, low: 236.50, volume: 29800000 },
      { date: "2025-04-09", open: 235.40, high: 238.70, close: 237.90, low: 234.20, volume: 27500000 },
      { date: "2025-04-08", open: 232.60, high: 236.10, close: 235.40, low: 231.80, volume: 30200000 },
      { date: "2025-04-07", open: 230.10, high: 233.50, close: 232.60, low: 229.40, volume: 28700000 },
      { date: "2025-04-06", open: 227.80, high: 231.20, close: 230.10, low: 226.90, volume: 25400000 },
      { date: "2025-04-05", open: 225.30, high: 228.40, close: 227.80, low: 224.60, volume: 26800000 },
      { date: "2025-04-04", open: 223.90, high: 226.70, close: 225.30, low: 222.80, volume: 28100000 }
    ],
    optionsData: {
      totalVolume: 1250000,
      callVolume: 820000,
      putVolume: 430000,
      callPutRatio: 1.91,
      impliedVolatility: 42.3,
      topStrikes: [
        { strike: 245, type: 'call', volume: 115000, openInterest: 175000 },
        { strike: 250, type: 'call', volume: 98000, openInterest: 160000 },
        { strike: 235, type: 'put', volume: 88000, openInterest: 145000 },
        { strike: 230, type: 'put', volume: 75000, openInterest: 130000 },
        { strike: 255, type: 'call', volume: 65000, openInterest: 110000 }
      ]
    }
  },
  // Add more stocks as needed
};
