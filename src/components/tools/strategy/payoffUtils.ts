
import { OptionLeg } from "./types";

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
