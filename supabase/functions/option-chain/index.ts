
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const ALPHA_VANTAGE_API_KEY = Deno.env.get('ALPHA_VANTAGE_API_KEY')!;
const SUPABASE_URL = 'https://frbptbubfqdknmjgdlsp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchOptionChain(ticker: string) {
  const url = `https://www.alphavantage.co/query?function=OPTIONS_CHAIN&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  
  try {
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
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
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
  } catch (error) {
    console.error(`Error caching option chain for ${ticker}:`, error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticker } = await req.json();
    const allowedTickers = ['AAPL', 'SPY', 'QQQ'];
    
    if (!allowedTickers.includes(ticker)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ticker. Only AAPL, SPY, and QQQ are supported.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await fetchOptionChain(ticker);
    if (data) {
      // Update cache in background
      EdgeRuntime.waitUntil(updateOptionsCache(ticker, data));
      
      return new Response(
        JSON.stringify({ data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch option chain data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
