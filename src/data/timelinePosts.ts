
// Mock data for timeline posts
export interface TimelinePost {
  id: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

export const mockTimelinePosts: TimelinePost[] = [
  {
    id: 1,
    author: {
      name: "TraderX",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "trader_x"
    },
    timestamp: "2025-04-16T10:00:00Z",
    content: "SPY $600 LEAPS call, 80% ITM by 2027. The economic indicators are pointing to continued growth.",
    likes: 25,
    comments: 5,
    tags: ["LEAPS", "SPY", "calls"]
  },
  {
    id: 2,
    author: {
      name: "OptionsMaster",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "options_master"
    },
    timestamp: "2025-04-15T14:30:00Z",
    content: "Just executed a perfect iron condor on TSLA. Collected $1200 premium with defined risk of $3000.",
    likes: 42,
    comments: 12,
    tags: ["iron-condor", "TSLA"]
  },
  {
    id: 3,
    author: {
      name: "ThetaGang",
      avatar: "https://i.pravatar.cc/150?img=3",
      username: "theta_gang"
    },
    timestamp: "2025-04-14T09:15:00Z",
    content: "Selling covered calls on AAPL has been my consistent strategy for the past year. 18% annualized return so far!",
    likes: 31,
    comments: 8,
    tags: ["covered-calls", "AAPL"]
  },
  {
    id: 4,
    author: {
      name: "VolatilityHunter",
      avatar: "https://i.pravatar.cc/150?img=4",
      username: "vol_hunter"
    },
    timestamp: "2025-04-14T16:45:00Z",
    content: "Long straddle on NVDA before earnings. Expecting big move, don't care which direction!",
    likes: 19,
    comments: 6,
    tags: ["straddle", "NVDA", "earnings"]
  },
  {
    id: 5,
    author: {
      name: "SpreadTactician",
      avatar: "https://i.pravatar.cc/150?img=5",
      username: "spread_king"
    },
    timestamp: "2025-04-13T11:20:00Z",
    content: "Bull call spread on AMD $120/$130 for June expiration. Great risk/reward in this market.",
    likes: 24,
    comments: 4,
    tags: ["bull-call-spread", "AMD"]
  },
  {
    id: 6,
    author: {
      name: "PutSeller",
      avatar: "https://i.pravatar.cc/150?img=6",
      username: "cash_secured_puts"
    },
    timestamp: "2025-04-12T13:10:00Z",
    content: "Cash secured puts on quality stocks during market dips. Got assigned MSFT at $350, no complaints!",
    likes: 37,
    comments: 9,
    tags: ["cash-secured-puts", "MSFT"]
  },
  {
    id: 7,
    author: {
      name: "DeltaNeutral",
      avatar: "https://i.pravatar.cc/150?img=7",
      username: "delta_neutral"
    },
    timestamp: "2025-04-11T10:30:00Z",
    content: "Market neutral with butterfly spreads on SPX. Beautiful profit graph with limited risk.",
    likes: 29,
    comments: 7,
    tags: ["butterfly-spread", "SPX", "market-neutral"]
  },
  {
    id: 8,
    author: {
      name: "LEAPSInvestor",
      avatar: "https://i.pravatar.cc/150?img=8",
      username: "leaps_investor"
    },
    timestamp: "2025-04-10T15:45:00Z",
    content: "Rolled my GOOG LEAPS to 2027 expiration. Deep ITM calls are my retirement strategy.",
    likes: 33,
    comments: 5,
    tags: ["LEAPS", "GOOG", "ITM"]
  },
  {
    id: 9,
    author: {
      name: "VegaGuru",
      avatar: "https://i.pravatar.cc/150?img=9",
      username: "vega_guru"
    },
    timestamp: "2025-04-10T09:20:00Z",
    content: "Calendar spread on META before product announcement. Selling front month IV and buying back month.",
    likes: 22,
    comments: 6,
    tags: ["calendar-spread", "META", "vega"]
  },
  {
    id: 10,
    author: {
      name: "OptionAlpha",
      avatar: "https://i.pravatar.cc/150?img=10",
      username: "option_alpha"
    },
    timestamp: "2025-04-09T14:15:00Z",
    content: "Short strangle on low-volatility ETFs is my bread and butter. Consistent premium collection.",
    likes: 18,
    comments: 4,
    tags: ["short-strangle", "ETF", "theta"]
  },
  {
    id: 11,
    author: {
      name: "PutBuyerPro",
      avatar: "https://i.pravatar.cc/150?img=11",
      username: "insurance_buyer"
    },
    timestamp: "2025-04-09T11:30:00Z",
    content: "Portfolio protection with SPY puts. Small premiums for peace of mind in uncertain markets.",
    likes: 27,
    comments: 8,
    tags: ["protective-puts", "SPY", "hedging"]
  },
  {
    id: 12,
    author: {
      name: "IronCondorMaster",
      avatar: "https://i.pravatar.cc/150?img=12",
      username: "condor_master"
    },
    timestamp: "2025-04-08T16:40:00Z",
    content: "Iron condors on low volatility stocks is the secret to consistent returns. 2% monthly with defined risk.",
    likes: 44,
    comments: 15,
    tags: ["iron-condor", "theta", "monthly-income"]
  },
  {
    id: 13,
    author: {
      name: "CallScalper",
      avatar: "https://i.pravatar.cc/150?img=13",
      username: "call_scalper"
    },
    timestamp: "2025-04-08T10:05:00Z",
    content: "0DTE SPX call options on FOMC days. High risk but incredible returns when timed right.",
    likes: 21,
    comments: 11,
    tags: ["0DTE", "SPX", "FOMC"]
  },
  {
    id: 14,
    author: {
      name: "DiagonalStrategy",
      avatar: "https://i.pravatar.cc/150?img=14",
      username: "diagonal_strat"
    },
    timestamp: "2025-04-07T13:25:00Z",
    content: "Diagonal spreads on AMZN combining LEAPS with short-term call writes. Best of both worlds.",
    likes: 19,
    comments: 5,
    tags: ["diagonal-spread", "AMZN", "LEAPS"]
  },
  {
    id: 15,
    author: {
      name: "ThetaCollector",
      avatar: "https://i.pravatar.cc/150?img=15",
      username: "theta_collector"
    },
    timestamp: "2025-04-07T11:10:00Z",
    content: "Weekly covered call strategy on ETFs is yielding 22% annualized. Consistent income machine.",
    likes: 38,
    comments: 9,
    tags: ["covered-calls", "ETF", "weekly"]
  },
  {
    id: 16,
    author: {
      name: "RatioSpreader",
      avatar: "https://i.pravatar.cc/150?img=16",
      username: "ratio_spreader"
    },
    timestamp: "2025-04-06T14:50:00Z",
    content: "1:2 ratio put spread on QQQ. Collecting premium while setting up for potential big win if market dips slightly.",
    likes: 16,
    comments: 4,
    tags: ["ratio-spread", "QQQ", "puts"]
  },
  {
    id: 17,
    author: {
      name: "LEAPSTrader",
      avatar: "https://i.pravatar.cc/150?img=17",
      username: "leaps_trader"
    },
    timestamp: "2025-04-06T09:30:00Z",
    content: "Rolling AAPL LEAPS up and out after the big move. $250 strike for 2027 expiration. Long-term bullish.",
    likes: 29,
    comments: 7,
    tags: ["LEAPS", "AAPL", "roll-up"]
  },
  {
    id: 18,
    author: {
      name: "VolatilitySurfer",
      avatar: "https://i.pravatar.cc/150?img=18",
      username: "vol_surfer"
    },
    timestamp: "2025-04-05T15:40:00Z",
    content: "Long butterfly on SPY for next week. Low cost, defined risk, excellent reward potential at the sweet spot.",
    likes: 23,
    comments: 6,
    tags: ["butterfly", "SPY", "defined-risk"]
  },
  {
    id: 19,
    author: {
      name: "ThetaDecay",
      avatar: "https://i.pravatar.cc/150?img=19",
      username: "theta_decay"
    },
    timestamp: "2025-04-05T11:15:00Z",
    content: "Credit spreads on high IV meme stocks before earnings. Risk defined, premium juicy. Been working great!",
    likes: 35,
    comments: 13,
    tags: ["credit-spread", "high-IV", "earnings"]
  },
  {
    id: 20,
    author: {
      name: "SpreadMaster",
      avatar: "https://i.pravatar.cc/150?img=20",
      username: "spread_master"
    },
    timestamp: "2025-04-04T13:20:00Z",
    content: "Call debit spreads on TSLA for the AI conference. Bullish with defined risk, perfect for this event.",
    likes: 41,
    comments: 10,
    tags: ["debit-spread", "TSLA", "event-driven"]
  }
];
