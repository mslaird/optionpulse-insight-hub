
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { OptionContract, OptionStrategy } from "@/types/options";

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

      return data.data;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
  });
};
