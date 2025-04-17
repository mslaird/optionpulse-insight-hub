
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { OptionsChainData } from "@/types/options";
import { createMockOptionsData } from "@/data/mockOptionsData";
import { validateOptionsData, transformOptionsData } from "@/utils/optionsDataValidator";

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

        // First cast to unknown to safely handle the data
        const rawData = data.data as unknown;
        console.log("Received data:", rawData);
        
        // Check if the data matches our application format
        if (validateOptionsData(rawData)) {
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
        } 
        
        // If the data is in API format, transform it
        if (typeof rawData === 'object' && rawData !== null) {
          const apiData = rawData as Record<string, unknown>;
          if (Array.isArray(apiData.puts) && Array.isArray(apiData.calls)) {
            // Transform the API data to our application format
            const transformedData = transformOptionsData(apiData, symbol, expirationDate);
            console.log(`Transformed data has ${transformedData.options.length} options`);
            return transformedData;
          }
        }
        
        console.warn(`Creating fallback data for ${symbol}`);
        return createMockOptionsData(symbol, expirationDate);
        
      } catch (error) {
        console.error("Error in useOptionsData:", error);
        const mockData = createMockOptionsData(symbol, expirationDate);
        console.log(`Created mock data with ${mockData.options.length} options`);
        return mockData;
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  });
};
