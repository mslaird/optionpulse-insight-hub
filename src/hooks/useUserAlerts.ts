
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export const useUserAlerts = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['alerts', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  });
};
