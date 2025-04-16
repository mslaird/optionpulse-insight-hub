
/**
 * Utility function that returns descriptions for different option strategy types
 */
export const getStrategyDescription = (type: string): string => {
  switch(type) {
    case "credit-spread":
      return "A credit spread is an options strategy where you simultaneously buy and sell options of the same type and expiration date, but at different strike prices. Credit spreads generate immediate income (a credit) at the cost of taking on defined risk.";
    case "debit-spread":
      return "A debit spread is an options strategy where you simultaneously buy and sell options of the same type and expiration date, but at different strike prices. Unlike credit spreads, debit spreads require an initial investment (a debit) but have potential for profit if the underlying moves favorably.";
    case "iron-condor":
      return "An iron condor is a multi-leg options strategy that combines a bull put spread and a bear call spread. It's designed to profit from low volatility in the underlying asset, where the price stays within a specific range.";
    case "straddle":
      return "A straddle is an options strategy that involves buying both a call and a put option at the same strike price and expiration date. It's designed to profit from significant price movement in either direction.";
    case "strangle":
      return "A strangle is similar to a straddle but uses different strike prices for the call and put options. It's typically cheaper than a straddle but requires a larger price movement to be profitable.";
    case "leaps-call":
      return "LEAPS (Long-term Equity Anticipation Securities) calls are options with expiration dates longer than a year away. They provide exposure to long-term bullish movements with less capital than owning the stock outright.";
    case "leaps-put":
      return "LEAPS puts are long-term put options with expiration dates greater than a year away. They're used for long-term bearish positions or as insurance against major market downturns.";
    default:
      return "An options strategy that involves multiple option contracts to create a specific risk/reward profile.";
  }
};
