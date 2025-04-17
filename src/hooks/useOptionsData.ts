
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { OptionContract, OptionStrategy } from "@/types/options";

interface OptionsChainData {
  options: OptionContract[];
  strategies: OptionStrategy[];
}

export const useOptionsData = (symbol: string) => {
  return useQuery({
    queryKey: ['options', symbol],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('option_chains')
        .select('data')
        .eq('ticker', symbol)
        .single();

      if (error) throw error;
      
      if (!data) {
        throw new Error(`No option chain data found for ${symbol}`);
      }

      // Handle the type conversion more safely
      const jsonData = data.data;
      
      // Validate that the data has the expected shape
      if (typeof jsonData === 'object' && jsonData !== null) {
        // More explicit type checking for the properties
        const typedData = jsonData as Record<string, unknown>;
        
        if (Array.isArray(typedData.options) && Array.isArray(typedData.strategies)) {
          // Now we can safely cast to our interface
          return {
            options: typedData.options as OptionContract[],
            strategies: typedData.strategies as OptionStrategy[]
          };
        }
      }
      
      // If data doesn't match the expected format, throw an error
      throw new Error(`Invalid options data format for ${symbol}`);
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });
};
