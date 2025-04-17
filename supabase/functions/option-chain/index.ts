
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const ALPHA_VANTAGE_API_KEY = Deno.env.get('ALPHA_VANTAGE_API_KEY')!;
const SUPABASE_URL = 'https://frbptbubfqdknmjgdlsp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fetchOptionChain(ticker: string) {
  const url = `https://www.alphavantage.co/query?function=OPTIONS_CHAIN&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  try {
    console.log(`Fetching option chain for ${ticker}...`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error(`Alpha Vantage API error for ${ticker}:`, data.error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching option chain for ${ticker}:`, error);
    return null;
  }
}

async function updateOptionsCache(ticker: string, data: any) {
  try {
    const { error } = await supabaseAdmin
      .from('option_chains')
      .upsert({
        ticker,
        data,
        fetched_at: new Date().toISOString()
      }, {
        onConflict: 'ticker'
      });
      
    if (error) throw error;
    console.log(`Successfully cached option chain for ${ticker}`);
    return true;
  } catch (error) {
    console.error(`Error caching option chain for ${ticker}:`, error);
    return false;
  }
}

async function getLastUpdated(ticker: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('option_chains')
      .select('fetched_at')
      .eq('ticker', ticker)
      .maybeSingle();
      
    if (error || !data) {
      console.log(`No previous data found for ${ticker}`);
      return null;
    }
    
    return new Date(data.fetched_at);
  } catch (error) {
    console.error(`Error checking last update for ${ticker}:`, error);
    return null;
  }
}

async function shouldUpdate(ticker: string) {
  // Check when the ticker was last updated
  const lastUpdated = await getLastUpdated(ticker);
  
  // If never updated or updated more than 4 hours ago, update it
  if (!lastUpdated) return true;
  
  const now = new Date();
  const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
  
  // With external scheduler, we can be more conservative 
  // Only fetch if data is more than 4 hours old
  return hoursSinceUpdate >= 4;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let ticker: string | null = null;
    
    // Process the request based on the endpoint or body content
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        ticker = body.ticker || null;
      } catch (e) {
        console.error("Error parsing request body:", e);
      }
    }
    
    if (!ticker) {
      if (url.searchParams.has('ticker')) {
        ticker = url.searchParams.get('ticker');
      } else {
        // Default to AAPL if no ticker specified (for backward compatibility)
        ticker = 'AAPL';
      }
    }
    
    const allowedTickers = ['AAPL', 'SPY', 'QQQ'];
    
    if (!allowedTickers.includes(ticker)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ticker. Only AAPL, SPY, and QQQ are supported.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if we need to update the data
    const needsUpdate = await shouldUpdate(ticker);
    
    if (needsUpdate) {
      console.log(`Updating data for ${ticker} (scheduled from Cron-Job.org)...`);
      const data = await fetchOptionChain(ticker);
      
      if (data) {
        // Update cache with new data
        await updateOptionsCache(ticker, data);
        
        return new Response(
          JSON.stringify({ 
            status: 'success', 
            message: `${ticker} option chain data updated successfully`,
            cached: false
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            status: 'error', 
            message: `Failed to fetch ${ticker} option chain data from Alpha Vantage`
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      console.log(`Skipping update for ${ticker} - data is still fresh`);
      
      // Get data from cache for the frontend
      const { data: cachedData, error: cacheError } = await supabaseAdmin
        .from('option_chains')
        .select('data, fetched_at')
        .eq('ticker', ticker)
        .maybeSingle();
        
      if (cachedData && !cacheError) {
        return new Response(
          JSON.stringify({ 
            status: 'success',
            message: `Using cached data for ${ticker}`,
            data: cachedData.data, 
            cached: true,
            cachedAt: cachedData.fetched_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ 
            status: 'error', 
            message: `No cached data found for ${ticker}`
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
  } catch (error) {
    console.error('Error in option-chain function:', error);
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: error.message
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
