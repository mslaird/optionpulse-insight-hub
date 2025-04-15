
interface StrategyDefinition {
  id: string;
  name: string;
  type: 'options' | 'stock' | 'futures' | 'forex';
  description: string;
  creator: string;
  yearCreated?: string;
  howItWorks: string;
  riskLevel: 'low' | 'medium' | 'high';
  marketOutlook: 'bullish' | 'bearish' | 'neutral' | 'volatile';
  key: string;
}

const strategyDefinitions: Record<string, StrategyDefinition> = {
  coveredCall: {
    id: "covered-call",
    name: "Covered Call",
    type: "options",
    key: "covered-call",
    description: "A covered call is an options strategy where you sell call options while owning the underlying stock. This generates premium income while capping potential upside.",
    creator: "Unknown, but widely popularized by institutional investors in the 1970s",
    yearCreated: "1970s",
    howItWorks: "1. Own at least 100 shares of the underlying stock\n2. Sell a call option against those shares\n3. Collect premium upfront\n4. If stock stays below strike price, keep premium as profit\n5. If stock rises above strike price, shares may be called away, but profit is strike price plus premium minus original cost basis",
    riskLevel: "low",
    marketOutlook: "neutral"
  },
  protectivePut: {
    id: "protective-put",
    name: "Protective Put",
    type: "options",
    key: "protective-put",
    description: "A protective put is an options strategy where you buy put options while owning the underlying stock. This acts as insurance against significant downside risk.",
    creator: "Attributed to financial institutions in the 1980s",
    yearCreated: "1980s",
    howItWorks: "1. Own shares of the underlying stock\n2. Buy a put option at a strike price that offers desired protection\n3. Pay premium upfront\n4. If stock price falls below the strike price, the put option increases in value, offsetting stock losses\n5. If stock price rises, the put option expires worthless, but stock gains are unlimited",
    riskLevel: "low",
    marketOutlook: "bullish"
  },
  ironCondor: {
    id: "iron-condor",
    name: "Iron Condor",
    type: "options",
    key: "iron-condor",
    description: "An iron condor is an options strategy that involves selling an out-of-the-money put spread and an out-of-the-money call spread with the same expiration date. It profits from low volatility and the underlying asset staying within a range.",
    creator: "Attributed to professional options traders in the 1990s",
    yearCreated: "1990s",
    howItWorks: "1. Sell an out-of-the-money put and buy a further out-of-the-money put (bull put spread)\n2. Sell an out-of-the-money call and buy a further out-of-the-money call (bear call spread)\n3. Collect net premium upfront\n4. Maximum profit occurs when the underlying asset closes between the sold strikes at expiration\n5. Maximum loss is limited to the difference between strikes minus the net premium received",
    riskLevel: "medium",
    marketOutlook: "neutral"
  },
  butterflySpread: {
    id: "butterfly-spread",
    name: "Butterfly Spread",
    type: "options",
    key: "butterfly-spread",
    description: "A butterfly spread is an options strategy that uses four option contracts with three strike prices to profit from low volatility in the underlying asset.",
    creator: "Developed by professional options traders in the 1980s",
    yearCreated: "1980s",
    howItWorks: "1. Buy one in-the-money call (or put) at a lower strike price\n2. Sell two at-the-money calls (or puts)\n3. Buy one out-of-the-money call (or put) at a higher strike price\n4. Maximum profit occurs when the underlying asset closes exactly at the middle strike price at expiration\n5. Maximum loss is limited to the net premium paid",
    riskLevel: "medium",
    marketOutlook: "neutral"
  },
  longStraddle: {
    id: "long-straddle",
    name: "Long Straddle",
    type: "options",
    key: "long-straddle",
    description: "A long straddle is an options strategy where you simultaneously buy a call and a put option with the same strike price and expiration date. It profits from large price movements in either direction.",
    creator: "Attributed to early options traders in the 1970s",
    yearCreated: "1970s",
    howItWorks: "1. Buy a call option at the strike price (usually at-the-money)\n2. Buy a put option at the same strike price and expiration\n3. Pay premium upfront for both options\n4. Profit when the underlying asset moves significantly in either direction\n5. Break-even points are at strike price plus/minus the total premium paid",
    riskLevel: "medium",
    marketOutlook: "volatile"
  },
  wheelStrategy: {
    id: "wheel-strategy",
    name: "The Wheel Strategy",
    type: "options",
    key: "wheel-strategy",
    description: "The Wheel is a popular options strategy that involves selling cash-secured puts until assignment, then selling covered calls on the assigned shares, and repeating the process to generate consistent income.",
    creator: "Unknown, popularized in online trading communities in the 2010s",
    yearCreated: "2010s",
    howItWorks: "1. Sell cash-secured puts on a stock you wouldn't mind owning\n2. If the stock price stays above the strike price, collect premium and repeat\n3. If assigned shares, start selling covered calls against those shares\n4. If shares get called away, return to step 1\n5. Generate income through continuous premium collection",
    riskLevel: "medium",
    marketOutlook: "neutral"
  },
  poorMansCallSpread: {
    id: "poor-mans-call-spread",
    name: "Poor Man's Covered Call",
    type: "options",
    key: "poor-mans-covered-call",
    description: "A Poor Man's Covered Call (PMCC) is a low-cost alternative to a traditional covered call. Instead of owning the stock outright, you buy a deep in-the-money LEAP call option and sell shorter-term call options against it.",
    creator: "Unknown, popularized by retail traders seeking lower capital requirements",
    yearCreated: "2000s",
    howItWorks: "1. Buy a deep in-the-money, long-term call option (LEAP)\n2. Sell shorter-term, out-of-the-money call options against it\n3. Collect premium from the short calls\n4. Roll or close positions as needed\n5. Requires less capital than traditional covered calls",
    riskLevel: "medium",
    marketOutlook: "bullish"
  },
  calendarSpread: {
    id: "calendar-spread",
    name: "Calendar Spread",
    type: "options",
    key: "calendar-spread",
    description: "A calendar spread (also called a time spread) involves buying and selling options of the same strike price but with different expiration dates. It profits from time decay of the shorter-dated option.",
    creator: "Developed by professional options traders in the 1980s",
    yearCreated: "1980s",
    howItWorks: "1. Buy a longer-term option (call or put)\n2. Sell a shorter-term option of the same type and strike price\n3. Pay a net debit for the spread\n4. Profit as the shorter-term option loses value faster due to time decay\n5. Maximum profit typically occurs when the underlying asset price is at the strike price at the expiration of the short option",
    riskLevel: "medium",
    marketOutlook: "neutral"
  },
  diagonalSpread: {
    id: "diagonal-spread",
    name: "Diagonal Spread",
    type: "options",
    key: "diagonal-spread",
    description: "A diagonal spread combines elements of both vertical and calendar spreads, using options with different strike prices and different expiration dates.",
    creator: "Advanced development of calendar spreads by professional traders",
    yearCreated: "1990s",
    howItWorks: "1. Buy a longer-term option (typically in-the-money)\n2. Sell a shorter-term option with a different strike price (typically out-of-the-money)\n3. Pay a net debit for the spread\n4. Profit from time decay of the shorter-term option and/or favorable movement of the underlying asset\n5. Management often involves rolling the short option as it approaches expiration",
    riskLevel: "medium",
    marketOutlook: "neutral"
  },
  jade: {
    id: "jade-lizard",
    name: "Jade Lizard",
    type: "options",
    key: "jade-lizard",
    description: "A Jade Lizard is an options strategy that combines a short put with a short call spread (short call and long call). It aims to collect premium with no upside risk.",
    creator: "Kirk Du Plessis and the tastytrade team",
    yearCreated: "2010s",
    howItWorks: "1. Sell a put option (typically out-of-the-money)\n2. Sell a call option at a higher strike price\n3. Buy a call option at an even higher strike price\n4. Collect a net credit for the entire position\n5. Maximum profit is the net credit received when all options expire worthless\n6. When properly structured, eliminates upside risk",
    riskLevel: "medium",
    marketOutlook: "neutral"
  }
};

export default strategyDefinitions;
