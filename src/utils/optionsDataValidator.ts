
import { OptionsChainData } from "@/types/options";

export const validateOptionsData = (jsonData: unknown): jsonData is OptionsChainData => {
  if (typeof jsonData !== 'object' || jsonData === null) {
    console.error("Invalid data format: not an object");
    return false;
  }

  const typedData = jsonData as Record<string, unknown>;
  
  if (!Array.isArray(typedData.options) || !Array.isArray(typedData.strategies)) {
    console.error("Invalid data structure: missing options or strategies arrays");
    return false;
  }

  if (typeof typedData.currentPrice !== 'number' && typedData.currentPrice !== undefined) {
    console.error("Invalid currentPrice format");
    return false;
  }

  return true;
};
