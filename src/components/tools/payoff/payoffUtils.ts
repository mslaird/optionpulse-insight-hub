
/**
 * Utility functions for generating option payoff diagrams
 */

/**
 * Generates payoff data points for various option strategies
 */
export const generatePayoffData = (strike: number, premium: number, strategy: string) => {
  const data = [];
  const range = 0.3; // 30% range around strike price
  const minPrice = strike * (1 - range);
  const maxPrice = strike * (1 + range);
  const step = (maxPrice - minPrice) / 10;

  for (let price = minPrice; price <= maxPrice; price += step) {
    let profit = 0;
    
    if (strategy === "call") {
      profit = Math.max(0, price - strike) - premium;
    } else if (strategy === "put") {
      profit = Math.max(0, strike - price) - premium;
    } else if (strategy === "call-spread") {
      // Bull call spread (long lower strike, short higher strike)
      const upperStrike = strike * 1.1;
      profit = Math.max(0, Math.min(price - strike, upperStrike - strike)) - premium;
    } else if (strategy === "put-spread") {
      // Bear put spread (long higher strike, short lower strike)
      const lowerStrike = strike * 0.9;
      profit = Math.max(0, Math.min(strike - price, strike - lowerStrike)) - premium;
    }
    
    data.push({
      stockPrice: parseFloat(price.toFixed(2)),
      profit: parseFloat(profit.toFixed(2))
    });
  }
  
  return data;
};

/**
 * Enhances payoff data with additional information
 */
export const enhancePayoffData = (payoffData: any[]) => {
  return payoffData.map(point => ({
    ...point,
    parentData: payoffData
  }));
};

/**
 * Formats strategy ID to display name
 */
export const formatStrategyName = (strategy: string): string => {
  switch (strategy) {
    case "call": return "Call Option";
    case "put": return "Put Option";
    case "call-spread": return "Bull Call Spread";
    case "put-spread": return "Bear Put Spread";
    default: return strategy.toUpperCase();
  }
};
