
export interface AIAlert {
  id: string;
  symbol: string;
  type: 'call' | 'put';
  strikePrice: number;
  currentPrice: number;
  expiryDate: string;
  itmProbability: number;
  sentiment: {
    direction: 'bullish' | 'bearish';
    percentage: number;
  };
  impliedVolatility: number;
  timestamp: string;
  isNew?: boolean;
}

export const mockAIAlerts: AIAlert[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'call',
    strikePrice: 250,
    currentPrice: 245.32,
    expiryDate: '4/25/2025',
    itmProbability: 82,
    sentiment: {
      direction: 'bullish',
      percentage: 75
    },
    impliedVolatility: 28.5,
    timestamp: '5m ago'
  },
  {
    id: '2',
    symbol: 'SPY',
    type: 'put',
    strikePrice: 420,
    currentPrice: 435.64,
    expiryDate: '5/15/2025',
    itmProbability: 42,
    sentiment: {
      direction: 'bearish',
      percentage: 65
    },
    impliedVolatility: 22.8,
    timestamp: '15m ago'
  },
  {
    id: '3',
    symbol: 'QQQ',
    type: 'call',
    strikePrice: 380,
    currentPrice: 358.21,
    expiryDate: '5/30/2025',
    itmProbability: 71,
    sentiment: {
      direction: 'bullish',
      percentage: 82
    },
    impliedVolatility: 25.3,
    timestamp: '37m ago'
  },
  {
    id: '4',
    symbol: 'AAPL',
    type: 'put',
    strikePrice: 230,
    currentPrice: 245.32,
    expiryDate: '4/25/2025',
    itmProbability: 35,
    sentiment: {
      direction: 'bearish',
      percentage: 58
    },
    impliedVolatility: 26.7,
    timestamp: '1h ago'
  },
  {
    id: '5',
    symbol: 'SPY',
    type: 'call',
    strikePrice: 450,
    currentPrice: 435.64,
    expiryDate: '5/30/2025',
    itmProbability: 65,
    sentiment: {
      direction: 'bullish',
      percentage: 72
    },
    impliedVolatility: 24.1,
    timestamp: '2h ago'
  },
  {
    id: '6',
    symbol: 'QQQ',
    type: 'put',
    strikePrice: 340,
    currentPrice: 358.21,
    expiryDate: '5/15/2025',
    itmProbability: 78,
    sentiment: {
      direction: 'bearish',
      percentage: 68
    },
    impliedVolatility: 29.8,
    timestamp: '3h ago'
  },
  {
    id: '7',
    symbol: 'AAPL',
    type: 'call',
    strikePrice: 255,
    currentPrice: 245.32,
    expiryDate: '5/15/2025',
    itmProbability: 76,
    sentiment: {
      direction: 'bullish',
      percentage: 85
    },
    impliedVolatility: 30.2,
    timestamp: '4h ago'
  },
  {
    id: '8',
    symbol: 'SPY',
    type: 'put',
    strikePrice: 425,
    currentPrice: 435.64,
    expiryDate: '4/25/2025',
    itmProbability: 68,
    sentiment: {
      direction: 'bearish',
      percentage: 64
    },
    impliedVolatility: 23.5,
    timestamp: '5h ago'
  },
  {
    id: '9',
    symbol: 'QQQ',
    type: 'call',
    strikePrice: 370,
    currentPrice: 358.21,
    expiryDate: '5/30/2025',
    itmProbability: 83,
    sentiment: {
      direction: 'bullish',
      percentage: 88
    },
    impliedVolatility: 27.4,
    timestamp: '6h ago'
  }
];

// Get unique expiry dates for filters
export const getUniqueExpiryDates = (): string[] => {
  const uniqueDates = new Set<string>();
  mockAIAlerts.forEach(alert => uniqueDates.add(alert.expiryDate));
  return Array.from(uniqueDates).sort();
};

// Get unique symbols for filters
export const getUniqueSymbols = (): string[] => {
  const uniqueSymbols = new Set<string>();
  mockAIAlerts.forEach(alert => uniqueSymbols.add(alert.symbol));
  return Array.from(uniqueSymbols).sort();
};

// Generate random new alerts (to simulate refresh)
export const generateNewAlerts = (): AIAlert[] => {
  const symbols = ['AAPL', 'SPY', 'QQQ'];
  const types: Array<'call' | 'put'> = ['call', 'put'];
  const expiries = ['4/25/2025', '5/15/2025', '5/30/2025'];
  const directions: Array<'bullish' | 'bearish'> = ['bullish', 'bearish'];
  
  // Create 1-3 new random alerts
  const numAlerts = Math.floor(Math.random() * 3) + 1;
  const newAlerts: AIAlert[] = [];
  
  for (let i = 0; i < numAlerts; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const expiryDate = expiries[Math.floor(Math.random() * expiries.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    let currentPrice = 0;
    if (symbol === 'AAPL') currentPrice = 245.32 + (Math.random() * 10 - 5);
    if (symbol === 'SPY') currentPrice = 435.64 + (Math.random() * 10 - 5);
    if (symbol === 'QQQ') currentPrice = 358.21 + (Math.random() * 10 - 5);
    
    const strikeOffset = (Math.random() * 20) - 10;
    const strikePrice = Math.round(currentPrice + strikeOffset);
    
    const itmProbability = Math.floor(Math.random() * 40) + 60; // 60-99%
    const sentimentPercentage = Math.floor(Math.random() * 30) + 60; // 60-89%
    const impliedVolatility = 20 + Math.random() * 20; // 20-40%
    
    newAlerts.push({
      id: `new-${Date.now()}-${i}`,
      symbol,
      type,
      strikePrice,
      currentPrice,
      expiryDate,
      itmProbability,
      sentiment: {
        direction,
        percentage: sentimentPercentage
      },
      impliedVolatility,
      timestamp: 'Just now',
      isNew: true
    });
  }
  
  return newAlerts;
};
