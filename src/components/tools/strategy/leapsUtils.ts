
import { isLeapsExpiry as isLeapsExpiryFromData } from "@/data/mockAlertData";

// Re-export the isLeapsExpiry function to consolidate imports
export const isLeapsExpiry = isLeapsExpiryFromData;

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
