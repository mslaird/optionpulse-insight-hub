
import { OptionLeg } from "./types";

export const generatePayoffData = (legs: OptionLeg[], ticker: string, currentPrice: number) => {
  const data = [];
  const range = 0.3; // 30% range around current price
  const minPrice = currentPrice * (1 - range);
  const maxPrice = currentPrice * (1 + range);
  const step = (maxPrice - minPrice) / 30; // 30 data points for smoother line

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

export const calculateStrategyMetrics = (legs: OptionLeg[]) => {
  const netPremium = legs.reduce((sum, leg) => {
    return sum + (leg.action === 'buy' ? -1 : 1) * leg.premium * leg.quantity;
  }, 0);
  
  return {
    maxProfit: netPremium > 0 ? netPremium : "Unlimited",
    maxLoss: netPremium <= 0 ? -netPremium : "Unlimited",
    breakeven: legs.length > 0 ? 
      legs[0].strike + (legs[0].action === 'buy' ? legs[0].premium : -legs[0].premium) : 
      0,
    delta: 0.45,
    gamma: 0.03,
    theta: -0.015,
    vega: 0.25
  };
};

export const getStrategyName = (legs: OptionLeg[]) => {
  if (legs.length === 0) return "No Legs Added";
  if (legs.length === 1) {
    const leg = legs[0];
    return `${leg.action === 'buy' ? 'Long' : 'Short'} ${leg.type.charAt(0).toUpperCase() + leg.type.slice(1)}`;
  }
  if (legs.length === 2) {
    if (legs[0].type === 'call' && legs[1].type === 'call') {
      if (legs[0].action === 'buy' && legs[1].action === 'sell') {
        return "Bull Call Spread";
      }
      if (legs[0].action === 'sell' && legs[1].action === 'buy') {
        return "Bear Call Spread";
      }
    }
    if (legs[0].type === 'put' && legs[1].type === 'put') {
      if (legs[0].action === 'buy' && legs[1].action === 'sell') {
        return "Bear Put Spread";
      }
      if (legs[0].action === 'sell' && legs[1].action === 'buy') {
        return "Bull Put Spread";
      }
    }
    if (legs[0].type !== legs[1].type) {
      if (legs[0].action === 'buy' && legs[1].action === 'buy') {
        return "Straddle";
      }
    }
  }
  if (legs.length === 4) {
    return "Iron Condor";
  }
  return "Custom Strategy";
};

export const defaultStockPrices = {
  AAPL: 250,
  SPY: 475,
  QQQ: 400
};
