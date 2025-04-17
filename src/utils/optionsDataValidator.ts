
import { OptionsChainData } from "@/types/options";

export const validateOptionsData = (jsonData: unknown): jsonData is OptionsChainData => {
  if (typeof jsonData !== 'object' || jsonData === null) {
    console.error("Invalid data format: not an object");
    return false;
  }

  const typedData = jsonData as Record<string, unknown>;
  
  // Check if data follows our expected format with options and strategies
  if (Array.isArray(typedData.options) && Array.isArray(typedData.strategies)) {
    if (typeof typedData.currentPrice !== 'number' && typedData.currentPrice !== undefined) {
      console.error("Invalid currentPrice format");
      return false;
    }
    return true;
  }
  
  // Check if data follows the API format with puts and calls
  if (Array.isArray(typedData.puts) && Array.isArray(typedData.calls) && Array.isArray(typedData.strikes)) {
    console.log("Data is in API format with puts and calls arrays");
    return false; // Still return false as we need to transform it
  }
  
  console.error("Invalid data structure: missing options/strategies or puts/calls arrays");
  return false;
};

// Transform API data format to our application's format
export const transformOptionsData = (apiData: any, symbol: string, expirationDate?: string): OptionsChainData => {
  console.log("Transforming API data format to application format");
  
  const options = [];
  const currentPrice = 180.75; // Default price, should be fetched from API
  
  // Process puts
  if (Array.isArray(apiData.puts)) {
    for (let i = 0; i < apiData.puts.length; i++) {
      const put = apiData.puts[i];
      const strike = apiData.strikes[i] || 0;
      
      if (Object.keys(put).length > 0) {
        options.push({
          strike,
          type: 'PUT',
          lastPrice: put.lastPrice || 0,
          bid: put.bid || 0,
          ask: put.ask || 0,
          change: put.change || 0,
          volume: put.volume || 0,
          openInterest: put.openInterest || 0,
          iv: put.impliedVolatility ? put.impliedVolatility * 100 : 0,
          opportunity: null,
          premium: "medium",
          moneyness: strike < currentPrice ? "itm" : "otm",
          delta: put.delta || 0,
          gamma: put.gamma || 0,
          theta: put.theta || 0,
          vega: put.vega || 0,
          expiryDate: expirationDate || (apiData.expiryDates && apiData.expiryDates[0]) || "2025-05-16"
        });
      }
    }
  }
  
  // Process calls
  if (Array.isArray(apiData.calls)) {
    for (let i = 0; i < apiData.calls.length; i++) {
      const call = apiData.calls[i];
      const strike = apiData.strikes[i] || 0;
      
      if (Object.keys(call).length > 0) {
        options.push({
          strike,
          type: 'CALL',
          lastPrice: call.lastPrice || 0,
          bid: call.bid || 0,
          ask: call.ask || 0,
          change: call.change || 0,
          volume: call.volume || 0,
          openInterest: call.openInterest || 0,
          iv: call.impliedVolatility ? call.impliedVolatility * 100 : 0,
          opportunity: null,
          premium: "medium",
          moneyness: strike > currentPrice ? "otm" : "itm",
          delta: call.delta || 0,
          gamma: call.gamma || 0,
          theta: call.theta || 0,
          vega: call.vega || 0,
          expiryDate: expirationDate || (apiData.expiryDates && apiData.expiryDates[0]) || "2025-05-16"
        });
      }
    }
  }
  
  return {
    currentPrice,
    options,
    strategies: [] // Initialize with empty strategies
  };
};
