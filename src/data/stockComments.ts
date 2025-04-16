
export interface StockComment {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  stock: string;
}

export const stockComments: StockComment[] = [
  {
    id: 1,
    user: {
      name: "Option Guru",
      username: "optionguru",
      avatar: "https://ui-avatars.com/api/?name=Option+Guru&background=0D8ABC&color=fff"
    },
    content: "AAPL $250 call IV at 30%, too high for my taste. Waiting for a pullback before entering a position.",
    timestamp: "2025-04-16",
    stock: "AAPL"
  },
  {
    id: 2,
    user: {
      name: "Delta Trader",
      username: "deltatrader",
      avatar: "https://ui-avatars.com/api/?name=Delta+Trader&background=2A9D8F&color=fff"
    },
    content: "Earnings coming up next month. I'm expecting a beat based on iPhone sales in China. Anyone playing calls?",
    timestamp: "2025-04-15",
    stock: "AAPL"
  },
  {
    id: 3,
    user: {
      name: "Theta Gang",
      username: "thetagang",
      avatar: "https://ui-avatars.com/api/?name=Theta+Gang&background=E9C46A&color=333"
    },
    content: "Selling cash-secured puts at $240 strike. Premium is juicy right now with the increased volatility.",
    timestamp: "2025-04-14",
    stock: "AAPL"
  },
  {
    id: 4,
    user: {
      name: "LEAP Investor",
      username: "leapinvestor",
      avatar: "https://ui-avatars.com/api/?name=LEAP+Investor&background=F4A261&color=333"
    },
    content: "Holding Jan 2027 $270 calls. Betting big on Vision Pro and AI developments.",
    timestamp: "2025-04-13",
    stock: "AAPL"
  },
  {
    id: 5,
    user: {
      name: "Iron Condor",
      username: "ironcondor",
      avatar: "https://ui-avatars.com/api/?name=Iron+Condor&background=E76F51&color=fff"
    },
    content: "AAPL has been range-bound for weeks. Perfect for iron condors between $230-$270.",
    timestamp: "2025-04-12",
    stock: "AAPL"
  },
  {
    id: 6,
    user: {
      name: "SPY Hunter",
      username: "spyhunter",
      avatar: "https://ui-avatars.com/api/?name=SPY+Hunter&background=264653&color=fff"
    },
    content: "SPY hitting all-time highs again. This rally feels extended, considering buying some protective puts.",
    timestamp: "2025-04-16",
    stock: "SPY"
  },
  {
    id: 7,
    user: {
      name: "Volatility Surfer",
      username: "volsurfer",
      avatar: "https://ui-avatars.com/api/?name=Vol+Surfer&background=2A9D8F&color=fff"
    },
    content: "VIX below 15 while SPY keeps climbing. Unusual divergence that makes me cautious.",
    timestamp: "2025-04-15",
    stock: "SPY"
  },
  {
    id: 8,
    user: {
      name: "ETF Strategist",
      username: "etfstrat",
      avatar: "https://ui-avatars.com/api/?name=ETF+Strategist&background=E9C46A&color=333"
    },
    content: "SPY weighted heavily toward tech. Consider sector rotation strategies if we see weakness in the tech giants.",
    timestamp: "2025-04-14",
    stock: "SPY"
  },
  {
    id: 9,
    user: {
      name: "Macro Trader",
      username: "macrotrader",
      avatar: "https://ui-avatars.com/api/?name=Macro+Trader&background=F4A261&color=333"
    },
    content: "Fed meeting minutes coming out tomorrow. Expect SPY volatility regardless of content.",
    timestamp: "2025-04-13",
    stock: "SPY"
  },
  {
    id: 10,
    user: {
      name: "Spread Eagle",
      username: "spreadeagle",
      avatar: "https://ui-avatars.com/api/?name=Spread+Eagle&background=E76F51&color=fff"
    },
    content: "Running bull call spreads on SPY, $470/$485 for June expiration. Risk/reward looks favorable.",
    timestamp: "2025-04-12",
    stock: "SPY"
  },
  {
    id: 11,
    user: {
      name: "Tech Bull",
      username: "techbull",
      avatar: "https://ui-avatars.com/api/?name=Tech+Bull&background=264653&color=fff"
    },
    content: "QQQ continuing to outperform SPY. Tech earnings have been stellar across the board.",
    timestamp: "2025-04-16",
    stock: "QQQ"
  },
  {
    id: 12,
    user: {
      name: "Semiconductor Analyst",
      username: "semiguy",
      avatar: "https://ui-avatars.com/api/?name=Semi+Analyst&background=2A9D8F&color=fff"
    },
    content: "AI chip demand driving QQQ higher. NVDA, AMD, and INTC all posting gains on new product announcements.",
    timestamp: "2025-04-15",
    stock: "QQQ"
  },
  {
    id: 13,
    user: {
      name: "Ratio Spreader",
      username: "ratiospread",
      avatar: "https://ui-avatars.com/api/?name=Ratio+Spreader&background=E9C46A&color=333"
    },
    content: "QQQ ratio spread working well - 2:1 $400/$415 calls for May expiration. Managing gamma carefully.",
    timestamp: "2025-04-14",
    stock: "QQQ"
  },
  {
    id: 14,
    user: {
      name: "Growth Investor",
      username: "growthinvest",
      avatar: "https://ui-avatars.com/api/?name=Growth+Investor&background=F4A261&color=333"
    },
    content: "QQQ rotation from large-cap to mid-cap tech happening. Watch for changing leadership within the index.",
    timestamp: "2025-04-13",
    stock: "QQQ"
  },
  {
    id: 15,
    user: {
      name: "Pattern Day Trader",
      username: "pdtrader",
      avatar: "https://ui-avatars.com/api/?name=Pattern+Trader&background=E76F51&color=fff"
    },
    content: "QQQ showing classic cup and handle formation on the daily. Targeting $425 if it breaks out.",
    timestamp: "2025-04-12",
    stock: "QQQ"
  }
];
