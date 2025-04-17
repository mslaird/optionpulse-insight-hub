
import { OptionLeg } from "./types";

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
