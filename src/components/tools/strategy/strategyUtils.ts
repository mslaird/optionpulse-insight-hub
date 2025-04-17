
// This is now the main index file that exports all utility functions from the split files
import { isLeapsExpiry, calculateDefaultPremium } from "./leapsUtils";
import { generatePayoffData } from "./payoffUtils";
import { calculateStrategyMetrics } from "./metricsUtils";
import { getStrategyName } from "./namingUtils";
import { defaultStockPrices } from "./defaultValues";

// Re-export all utilities to maintain API compatibility
export {
  isLeapsExpiry,
  calculateDefaultPremium,
  generatePayoffData,
  calculateStrategyMetrics,
  getStrategyName,
  defaultStockPrices
};
