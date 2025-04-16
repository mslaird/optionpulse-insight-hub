
import { OptionLeg } from "./types";
import { isLeapsExpiry } from "@/data/mockAlertData";

export const generatePayoffData = (legs: OptionLeg[], ticker: string, currentPrice: number, showLeaps = false) => {
  const data = [];
  
  // Adjust range based on LEAPS vs standard options
  const range = showLeaps ? 0.5 : 0.3; // 50% range for LEAPS, 30% for standard
  const minPrice = currentPrice * (1 - range);
  const maxPrice = currentPrice * (1 + range);
  const step = (maxPrice - minPrice) / 50; // More data points for smoother lines
  
  for (let price = minPrice; price <= maxPrice; price += step) {
    let totalProfit = 0;
    
    legs.forEach(leg => {
      let legProfit = 0;
      const multiplier = leg.action === 'buy' ? 1 : -1;
      
      if (leg.type === 'call') {
        legProfit = multiplier * (Math.max(0, price - leg.strike) - leg.premium);
      } else { // put
        legProfit = multiplier * (Math.max(0, leg.strike - price) - leg.premium);
      }
      
      totalProfit += legProfit * leg.quantity;
    });
    
    data.push({
      stockPrice: parseFloat(price.toFixed(2)),
      profit: parseFloat(totalProfit.toFixed(2))
    });
  }
  
  return data;
};

export const calculateStrategyMetrics = (legs: OptionLeg[], showLeaps = false, expiry = '') => {
  // Calculate net premium
  const netPremium = legs.reduce((sum, leg) => {
    return sum + (leg.action === 'buy' ? -1 : 1) * leg.premium * leg.quantity;
  }, 0);
  
  // Default values
  let delta = 0.45;
  let gamma = 0.03;
  let theta = -0.015;
  let vega = 0.25;
  
  // Adjust Greeks for LEAPS
  if (showLeaps && expiry && isLeapsExpiry(expiry)) {
    // LEAPS typically have higher vega, lower gamma and lower theta
    delta = 0.6; // LEAPS are more directional (higher delta)
    gamma = 0.01; // LEAPS have lower gamma (less change in delta per $1 move)
    theta = -0.006; // LEAPS have less time decay per day (lower absolute theta)
    vega = 0.4; // LEAPS have higher vega (more sensitive to volatility changes)
  }
  
  // Calculate breakeven (simplified - actual would consider all legs)
  const breakeven = legs.length > 0 ? 
    legs[0].strike + (legs[0].action === 'buy' ? legs[0].premium : -legs[0].premium) : 
    0;
  
  return {
    maxProfit: netPremium > 0 ? netPremium : "Unlimited",
    maxLoss: netPremium <= 0 ? -netPremium : "Unlimited",
    breakeven,
    delta,
    gamma,
    theta,
    vega
  };
};

export const getStrategyName = (legs: OptionLeg[], isLeaps = false) => {
  if (legs.length === 0) return "No Legs Added";
  
  // Prefix for LEAPS strategies
  const leapsPrefix = isLeaps ? "LEAPS " : "";
  
  if (legs.length === 1) {
    const leg = legs[0];
    return `${leapsPrefix}${leg.action === 'buy' ? 'Long' : 'Short'} ${leg.type.charAt(0).toUpperCase() + leg.type.slice(1)}`;
  }
  
  if (legs.length === 2) {
    if (legs[0].type === 'call' && legs[1].type === 'call') {
      if (legs[0].action === 'buy' && legs[1].action === 'sell') {
        return `${leapsPrefix}Bull Call Spread`;
      }
      if (legs[0].action === 'sell' && legs[1].action === 'buy') {
        return `${leapsPrefix}Bear Call Spread`;
      }
    }
    if (legs[0].type === 'put' && legs[1].type === 'put') {
      if (legs[0].action === 'buy' && legs[1].action === 'sell') {
        return `${leapsPrefix}Bear Put Spread`;
      }
      if (legs[0].action === 'sell' && legs[1].action === 'buy') {
        return `${leapsPrefix}Bull Put Spread`;
      }
    }
    if (legs[0].type !== legs[1].type) {
      if (legs[0].action === 'buy' && legs[1].action === 'buy') {
        return `${leapsPrefix}Straddle`;
      }
      if (legs[0].action === 'buy' && legs[1].action === 'buy' && isLeaps) {
        return `${leapsPrefix}Diagonal Spread`;
      }
    }
  }
  
  if (legs.length === 4) {
    return `${leapsPrefix}Iron Condor`;
  }
  
  return `${leapsPrefix}Custom Strategy`;
};

export const defaultStockPrices = {
  AAPL: 250,
  SPY: 475,
  QQQ: 400
};

// Helper for calculating default premium based on option type and whether it's LEAPS
export const calculateDefaultPremium = (strike: number, currentPrice: number, type: 'call' | 'put', isLeaps = false) => {
  let premium;
  const volatilityFactor = isLeaps ? 0.2 : 0.1; // LEAPS have higher premiums due to longer duration
  
  if (type === 'call') {
    premium = Math.max(0, currentPrice - strike) + (currentPrice * volatilityFactor);
  } else { // put
    premium = Math.max(0, strike - currentPrice) + (currentPrice * volatilityFactor);
  }
  
  return parseFloat(premium.toFixed(2));
};
