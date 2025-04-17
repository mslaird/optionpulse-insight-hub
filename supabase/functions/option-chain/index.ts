
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
      .single();
      
    if (error) {
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
  
  // If never updated or updated more than 6 hours ago, update it
  if (!lastUpdated) return true;
  
  const now = new Date();
  const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
  
  // Alpha Vantage has a limit of 25 calls per day (~1 per hour)
  // With 3 tickers, we can safely update each one every 3-6 hours
  return hoursSinceUpdate >= 6;
}

async function updateAllTickers(force = false) {
  const allowedTickers = ['AAPL', 'SPY', 'QQQ'];
  const results = {};
  
  for (const ticker of allowedTickers) {
    // Check if we should update this ticker
    if (force || await shouldUpdate(ticker)) {
      console.log(`Updating ${ticker} option chain data...`);
      const data = await fetchOptionChain(ticker);
      
      if (data) {
        await updateOptionsCache(ticker, data);
        results[ticker] = 'updated';
      } else {
        results[ticker] = 'failed';
      }
    } else {
      console.log(`Skipping ${ticker} update - recently updated`);
      results[ticker] = 'skipped';
    }
  }
  
  return results;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Handle scheduled updates (can be triggered by a simple HTTP scheduler)
    if (url.pathname.endsWith('/scheduled-update')) {
      console.log('Running scheduled update of option chains');
      const results = await updateAllTickers();
      
      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle force update (admin only)
    if (url.pathname.endsWith('/force-update')) {
      console.log('Running forced update of all option chains');
      const results = await updateAllTickers(true);
      
      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle regular requests for specific tickers
    const { ticker } = await req.json();
    const allowedTickers = ['AAPL', 'SPY', 'QQQ'];
    
    if (!allowedTickers.includes(ticker)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ticker. Only AAPL, SPY, and QQQ are supported.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try to get from cache first
    const { data: cachedData, error: cacheError } = await supabaseAdmin
      .from('option_chains')
      .select('data, fetched_at')
      .eq('ticker', ticker)
      .single();
      
    // If we have cached data that's not too old, return it
    if (cachedData && !cacheError) {
      const cachedAt = new Date(cachedData.fetched_at);
      const now = new Date();
      const hoursSinceUpdate = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceUpdate < 24) {  // Cache valid for 24 hours
        console.log(`Returning cached data for ${ticker} (${hoursSinceUpdate.toFixed(1)} hours old)`);
        return new Response(
          JSON.stringify({ 
            data: cachedData.data,
            cached: true,
            cachedAt: cachedData.fetched_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // If no valid cache, fetch fresh data
    console.log(`No valid cache for ${ticker}, fetching fresh data`);
    const data = await fetchOptionChain(ticker);
    
    if (data) {
      // Update cache in background
      EdgeRuntime.waitUntil(updateOptionsCache(ticker, data));
      
      return new Response(
        JSON.stringify({ data, cached: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // If API call fails but we have old cached data, return that with a warning
      if (cachedData && !cacheError) {
        return new Response(
          JSON.stringify({ 
            data: cachedData.data, 
            cached: true,
            cachedAt: cachedData.fetched_at,
            warning: 'Fresh data fetch failed. Returning outdated cached data.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to fetch option chain data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in option-chain function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
