
/**
 * Utility functions for generating option payoff diagrams
 */

/**
 * Generates payoff data points for various option strategies
 */
export const generatePayoffData = (strike: number, premium: number, strategy: string, showLeaps = false) => {
  const data = [];
  const range = showLeaps ? 0.5 : 0.3; // 50% range for LEAPS, 30% for standard options
  const minPrice = strike * (1 - range);
  const maxPrice = strike * (1 + range);
  const step = (maxPrice - minPrice) / (showLeaps ? 20 : 15); // More data points for LEAPS
  
  // Calculate breakeven point
  let breakEvenPoint = strike;
  if (strategy === "call") {
    breakEvenPoint = strike + premium;
  } else if (strategy === "put") {
    breakEvenPoint = strike - premium;
  } else if (strategy === "call-spread") {
    breakEvenPoint = strike + premium;
  } else if (strategy === "put-spread") {
    breakEvenPoint = strike - premium;
  }

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
    
    // Scale profit for LEAPS (they typically have larger movements)
    if (showLeaps) {
      // LEAPS will have more dramatic profit/loss due to larger premiums
      profit = profit * (strategy === "call" || strategy === "call-spread" ? 1.5 : 1.2);
    }
    
    // We don't set breakeven flag on the regular data points anymore
    data.push({
      stockPrice: parseFloat(price.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      breakeven: null
    });
  }
  
  // Add a single, specific data point exactly at the breakeven
  // Calculate profit at breakeven - should be very close to zero
  let breakEvenProfit = 0;
  
  data.push({
    stockPrice: parseFloat(breakEvenPoint.toFixed(2)),
    profit: breakEvenProfit,
    breakeven: 0
  });
  
  // Sort to ensure the breakeven point is in the right position
  return data.sort((a, b) => a.stockPrice - b.stockPrice);
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

/**
 * Gets mock LEAPS data for a specific ticker
 */
export const getLeapsData = (ticker: string) => {
  // Simplified LEAPS data with high strikes, long expiries and high premiums
  switch (ticker) {
    case "AAPL":
      return {
        strikes: [200, 250, 300],
        expirations: ["01/15/2026", "06/18/2026", "01/21/2027"],
        premiums: [32.5, 25.8, 20.4]
      };
    case "SPY":
      return {
        strikes: [450, 500, 550, 600, 650, 700],
        expirations: ["01/15/2026", "06/18/2026", "01/21/2027"],
        premiums: [48.7, 42.3, 38.1, 31.5, 25.2, 19.8]
      };
    case "QQQ":
      return {
        strikes: [380, 400, 450, 500, 550],
        expirations: ["01/15/2026", "06/18/2026", "01/21/2027"],
        premiums: [42.6, 38.9, 32.7, 26.4, 21.2]
      };
    default:
      return {
        strikes: [250, 300, 350],
        expirations: ["01/15/2026", "06/18/2026", "01/21/2027"],
        premiums: [30.0, 25.0, 20.0]
      };
  }
};
