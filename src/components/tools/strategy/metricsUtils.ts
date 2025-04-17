
import { OptionLeg } from "./types";
import { isLeapsExpiry } from "./leapsUtils";

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
