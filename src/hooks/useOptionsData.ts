
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { OptionsChainData } from "@/types/options";
import { createMockOptionsData } from "@/data/mockOptionsData";
import { validateOptionsData } from "@/utils/optionsDataValidator";

export const useOptionsData = (symbol: string, expirationDate?: string) => {
  return useQuery({
    queryKey: ['options', symbol, expirationDate],
    queryFn: async () => {
      console.log(`Fetching options data for ${symbol}... with expiry ${expirationDate || 'all'}`);
      
      try {
        const { data, error } = await supabase
          .from('option_chains')
          .select('data')
          .eq('ticker', symbol)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        if (!data) {
          console.error(`No option chain data found for ${symbol}`);
          throw new Error(`No option chain data found for ${symbol}`);
        }

        // First cast to unknown, then to OptionsChainData for type safety
        const rawData = data.data as unknown;
        console.log("Received data:", rawData);
        
        if (!validateOptionsData(rawData)) {
          console.warn(`Creating fallback data for ${symbol}`);
          return createMockOptionsData(symbol, expirationDate);
        }
        
        // Now we can safely cast it since validation passed
        const jsonData = rawData as OptionsChainData;
        
        // If an expiration date is provided, filter the options
        if (expirationDate) {
          console.log(`Filtering options for expiry date: ${expirationDate}`);
          const filteredOptions = jsonData.options.filter(option => 
            option.expiryDate === expirationDate
          );
          console.log(`Filtered ${filteredOptions.length} options out of ${jsonData.options.length}`);
          
          const filteredStrategies = jsonData.strategies.filter(strategy => 
            strategy.legs.length === 0 || 
            strategy.legs.some(leg => leg.expiryDate === expirationDate)
          );
          
          // Create a new object instead of using spread to ensure type safety
          const filteredData: OptionsChainData = {
            currentPrice: jsonData.currentPrice,
            options: filteredOptions,
            strategies: filteredStrategies
          };
          
          return filteredData;
        }
        
        return jsonData;
        
      } catch (error) {
        console.error("Error in useOptionsData:", error);
        return createMockOptionsData(symbol, expirationDate);
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  });
};
