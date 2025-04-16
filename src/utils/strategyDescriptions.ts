
export const getStrategyDescription = (strategyType: string): string => {
  const descriptions: Record<string, string> = {
    'credit-spread': 'A strategy where you sell an option and buy another option of the same type but at a different strike price, resulting in a net credit. Limited profit but higher probability of success.',
    'debit-spread': 'A strategy where you buy an option and sell another option of the same type but at a different strike price, resulting in a net debit. Limited profit but defined risk.',
    'iron-condor': 'A four-legged options strategy that combines a bull put spread and a bear call spread, creating a range where the strategy is profitable. Generates income when the underlying asset stays within a range.',
    'straddle': 'Involves buying both a call and a put option at the same strike price and expiration date. Profits from large price movements in either direction.',
    'strangle': 'Similar to a straddle but uses different strike prices, typically out-of-the-money options. Cheaper than a straddle but requires a larger price movement to be profitable.',
    'leaps-call': 'Long-term equity anticipation securities (LEAPS) calls are options with expirations more than a year away. They provide leveraged exposure to price increases with less capital than owning the stock.',
    'leaps-put': 'Long-term equity anticipation securities (LEAPS) puts are options with expirations more than a year away. They provide protection against long-term price decreases or can be used to bet on downside moves.',
    'covered-call': 'A strategy where you own the underlying stock and sell call options against it to generate income. Limits upside potential but increases overall yield.',
    'cash-secured-put': 'A strategy where you sell a put option and set aside the cash needed to buy the stock if assigned. Generates income and potentially acquires stock at a lower effective price.',
    'naked-call': 'A high-risk strategy where you sell call options without owning the underlying stock. Unlimited risk if the stock price rises significantly.',
    'wheel': 'A strategy involving selling cash-secured puts until assignment, then selling covered calls on the assigned shares. Aims to generate consistent income through premium collection.'
  };
  
  return descriptions[strategyType] || 'No description available for this strategy type.';
};
