
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockStocks } from "@/data/mockStockData";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Bell, DollarSign, Briefcase, Info, Plus, Trash2 } from "lucide-react";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import strategyDefinitions from "@/data/strategyDefinitions";

// Mock account data
const DEFAULT_ACCOUNT_BALANCE = 100000;

// Predefined strategies with their legs
const predefinedStrategies = {
  "iron-condor-spy": {
    name: "Iron Condor (SPY)",
    ticker: "SPY",
    legs: [
      { type: "call", action: "sell", strike: 510, premium: 4.25, quantity: 1 },
      { type: "call", action: "buy", strike: 515, premium: 2.85, quantity: 1 },
      { type: "put", action: "sell", strike: 490, premium: 4.50, quantity: 1 },
      { type: "put", action: "buy", strike: 485, premium: 3.10, quantity: 1 }
    ],
    description: "A four-legged strategy with limited risk and limited profit potential. Profits when the underlying stock trades in a range between the short strikes."
  },
  "bull-call-spread-aapl": {
    name: "Bull Call Spread (AAPL)",
    ticker: "AAPL",
    legs: [
      { type: "call", action: "buy", strike: 250, premium: 5.35, quantity: 1 },
      { type: "call", action: "sell", strike: 260, premium: 2.15, quantity: 1 }
    ],
    description: "A vertical spread strategy that involves buying a lower strike call and selling a higher strike call. Profits when the stock rises."
  },
  "bear-put-spread-msft": {
    name: "Bear Put Spread (MSFT)",
    ticker: "MSFT",
    legs: [
      { type: "put", action: "buy", strike: 420, premium: 6.20, quantity: 1 },
      { type: "put", action: "sell", strike: 410, premium: 3.40, quantity: 1 }
    ],
    description: "A vertical spread strategy that involves buying a higher strike put and selling a lower strike put. Profits when the stock falls."
  },
  "long-straddle-tsla": {
    name: "Long Straddle (TSLA)",
    ticker: "TSLA",
    legs: [
      { type: "call", action: "buy", strike: 240, premium: 8.45, quantity: 1 },
      { type: "put", action: "buy", strike: 240, premium: 7.80, quantity: 1 }
    ],
    description: "Involves buying a call and put at the same strike price and expiration. Profits from significant price movement in either direction."
  },
  "butterfly-spy": {
    name: "Butterfly Spread (SPY)",
    ticker: "SPY",
    legs: [
      { type: "call", action: "buy", strike: 470, premium: 10.25, quantity: 1 },
      { type: "call", action: "sell", strike: 480, premium: 5.50, quantity: 2 },
      { type: "call", action: "buy", strike: 490, premium: 2.35, quantity: 1 }
    ],
    description: "A three-legged strategy with limited risk and reward. Maximum profit at the middle strike price."
  }
};

// Current stock prices for calculations
const currentPrices = {
  "AAPL": 250.32,
  "MSFT": 420.18,
  "TSLA": 240.67,
  "SPY": 475.32,
  "QQQ": 400.18
};

interface StrategyLeg {
  type: "call" | "put";
  action: "buy" | "sell";
  strike: number;
  premium: number;
  quantity: number;
}

// Calculate payoff for a specific option leg at a given price
const calculateLegPayoff = (leg: StrategyLeg, price: number): number => {
  const multiplier = leg.action === "buy" ? 1 : -1;
  const contractMultiplier = 100; // Each option contract is for 100 shares
  
  let payoff = 0;
  if (leg.type === "call") {
    payoff = Math.max(0, price - leg.strike) - leg.premium;
  } else { // put
    payoff = Math.max(0, leg.strike - price) - leg.premium;
  }
  
  return multiplier * payoff * leg.quantity * contractMultiplier;
};

// Calculate total payoff for all legs at a given price
const calculateTotalPayoff = (legs: StrategyLeg[], price: number): number => {
  return legs.reduce((total, leg) => total + calculateLegPayoff(leg, price), 0);
};

// Generate payoff data points for a range of prices
const generatePayoffData = (legs: StrategyLeg[], currentPrice: number) => {
  const data = [];
  const range = 0.1; // 10% range on each side
  const minPrice = currentPrice * (1 - range);
  const maxPrice = currentPrice * (1 + range);
  const step = (maxPrice - minPrice) / 40;
  
  for (let price = minPrice; price <= maxPrice; price += step) {
    const totalPayoff = calculateTotalPayoff(legs, price);
    data.push({
      price: parseFloat(price.toFixed(2)),
      payoff: parseFloat(totalPayoff.toFixed(2))
    });
  }
  
  return data;
};

// Calculate the cost of the strategy (negative for credit, positive for debit)
const calculateStrategyCost = (legs: StrategyLeg[]): number => {
  let cost = 0;
  legs.forEach(leg => {
    const multiplier = leg.action === "buy" ? 1 : -1;
    cost += multiplier * leg.premium * leg.quantity * 100; // 100 shares per contract
  });
  return parseFloat(cost.toFixed(2));
};

// Calculate max profit and max loss for the strategy
const calculateStrategyMetrics = (legs: StrategyLeg[], currentPrice: number) => {
  // Generate payoff data for a wider range to find max profit/loss
  const payoffData = generatePayoffData(legs, currentPrice);
  const payoffs = payoffData.map(d => d.payoff);
  
  const maxProfit = Math.max(...payoffs);
  const maxLoss = Math.min(...payoffs);
  
  return {
    maxProfit,
    maxLoss: maxLoss < 0 ? Math.abs(maxLoss) : 0, // Convert to positive number for display
    breakEven: payoffData.find(d => Math.abs(d.payoff) < 1)?.price || currentPrice,
    // Mock Greek values
    delta: parseFloat((Math.random() * 2 - 1).toFixed(2)),
    gamma: parseFloat((Math.random() * 0.1).toFixed(3)),
    theta: parseFloat((-Math.random() * 0.5).toFixed(2)),
    vega: parseFloat((Math.random() * 0.5).toFixed(2))
  };
};

const OptionStrategyTrader = () => {
  const { toast } = useToast();
  const [accountBalance, setAccountBalance] = useState(DEFAULT_ACCOUNT_BALANCE);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [legs, setLegs] = useState<StrategyLeg[]>([]);
  const [ticker, setTicker] = useState<string>("SPY");
  const [currentPrice, setCurrentPrice] = useState<number>(currentPrices["SPY"]);
  const [expiry, setExpiry] = useState<string>("2025-06-20");
  const [payoffData, setPayoffData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [tradeExecuted, setTradeExecuted] = useState<boolean>(false);
  
  // Filtered stock list (only stocks and ETFs)
  const stockOptions = mockStocks.filter(stock => stock.type === 'stock' || stock.type === 'etf');

  // Update current price when ticker changes
  useEffect(() => {
    if (ticker && currentPrices[ticker]) {
      setCurrentPrice(currentPrices[ticker]);
    }
  }, [ticker]);

  // Load predefined strategy
  const loadStrategy = (strategyKey: string) => {
    const strategy = predefinedStrategies[strategyKey];
    if (strategy) {
      setTicker(strategy.ticker);
      setCurrentPrice(currentPrices[strategy.ticker]);
      setLegs(strategy.legs);
      setSelectedStrategy(strategyKey);
      
      // Calculate payoff and metrics
      const newPayoffData = generatePayoffData(strategy.legs, currentPrices[strategy.ticker]);
      setPayoffData(newPayoffData);
      setMetrics(calculateStrategyMetrics(strategy.legs, currentPrices[strategy.ticker]));
      
      // Reset confirmation
      setShowConfirmation(false);
      setTradeExecuted(false);
    }
  };

  // Add a new leg to the strategy
  const addLeg = () => {
    const newLeg: StrategyLeg = {
      type: "call",
      action: "buy",
      strike: currentPrice,
      premium: Math.round(currentPrice * 0.02 * 100) / 100, // Rough estimate of premium
      quantity: 1
    };
    
    const updatedLegs = [...legs, newLeg];
    setLegs(updatedLegs);
    
    // Update payoff data and metrics
    const newPayoffData = generatePayoffData(updatedLegs, currentPrice);
    setPayoffData(newPayoffData);
    setMetrics(calculateStrategyMetrics(updatedLegs, currentPrice));
  };

  // Remove a leg from the strategy
  const removeLeg = (index: number) => {
    const updatedLegs = legs.filter((_, i) => i !== index);
    setLegs(updatedLegs);
    
    // Update payoff data and metrics
    if (updatedLegs.length > 0) {
      const newPayoffData = generatePayoffData(updatedLegs, currentPrice);
      setPayoffData(newPayoffData);
      setMetrics(calculateStrategyMetrics(updatedLegs, currentPrice));
    } else {
      setPayoffData([]);
      setMetrics(null);
    }
  };

  // Update leg properties
  const updateLeg = (index: number, field: keyof StrategyLeg, value: any) => {
    const updatedLegs = [...legs];
    updatedLegs[index] = { ...updatedLegs[index], [field]: value };
    setLegs(updatedLegs);
    
    // Update payoff data and metrics
    const newPayoffData = generatePayoffData(updatedLegs, currentPrice);
    setPayoffData(newPayoffData);
    setMetrics(calculateStrategyMetrics(updatedLegs, currentPrice));
  };

  // Calculate strategy cost
  const strategyCost = calculateStrategyCost(legs);

  // Execute trade
  const executeTrade = () => {
    if (legs.length === 0) {
      toast({
        title: "Error",
        description: "No option legs added to the strategy.",
        variant: "destructive",
      });
      return;
    }

    if (strategyCost > accountBalance) {
      toast({
        title: "Insufficient funds",
        description: `Your account balance $${accountBalance.toLocaleString()} is insufficient for this trade ($${Math.abs(strategyCost).toLocaleString()})`,
        variant: "destructive",
      });
      return;
    }

    // Update account balance
    const newBalance = accountBalance - strategyCost;
    setAccountBalance(newBalance);
    
    // Show confirmation
    setShowConfirmation(true);
    setTradeExecuted(true);
    
    // Show toast notification
    toast({
      title: "Trade Executed Successfully",
      description: `Your ${getStrategyName()} strategy has been executed for ${ticker} at $${currentPrice.toFixed(2)}`,
      variant: "default",
      className: "bg-optionpulse-navy border-optionpulse-blue/30 text-white",
    });
  };

  // Get strategy name based on legs
  const getStrategyName = (): string => {
    if (selectedStrategy && predefinedStrategies[selectedStrategy]) {
      return predefinedStrategies[selectedStrategy].name;
    }
    
    // Detect strategy based on legs
    if (legs.length === 4) {
      const callSell = legs.find(leg => leg.type === "call" && leg.action === "sell");
      const callBuy = legs.find(leg => leg.type === "call" && leg.action === "buy");
      const putSell = legs.find(leg => leg.type === "put" && leg.action === "sell");
      const putBuy = legs.find(leg => leg.type === "put" && leg.action === "buy");
      
      if (callSell && callBuy && putSell && putBuy) {
        return "Iron Condor";
      }
    } else if (legs.length === 2) {
      if (legs[0].type === legs[1].type) {
        if (legs[0].type === "call") {
          if (legs[0].action !== legs[1].action) {
            return "Bull Call Spread";
          }
        } else if (legs[0].type === "put") {
          if (legs[0].action !== legs[1].action) {
            return "Bear Put Spread";
          }
        }
      } else if (legs[0].strike === legs[1].strike && legs[0].action === "buy" && legs[1].action === "buy") {
        return "Long Straddle";
      }
    } else if (legs.length === 3) {
      const buyLegCount = legs.filter(leg => leg.action === "buy").length;
      const sellLegCount = legs.filter(leg => leg.action === "sell").length;
      
      if (buyLegCount === 2 && sellLegCount === 1 && legs.filter(leg => leg.action === "sell")[0].quantity === 2) {
        return "Butterfly Spread";
      }
    }
    
    return "Custom Strategy";
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 w-full sm:w-3/4 mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Briefcase size={18} className="text-optionpulse-blue" />
          Advanced Options Strategy Trader
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Account Balance */}
          <div className="bg-optionpulse-navy p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="text-xl font-semibold text-white">${accountBalance.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/education">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-optionpulse-blue/10 border-optionpulse-blue/20 hover:bg-optionpulse-blue/20">
                  <BookOpen size={14} />
                  <span className="hidden sm:inline">Education Hub</span>
                </Button>
              </Link>
              <Link to="/alerts">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-optionpulse-blue/10 border-optionpulse-blue/20 hover:bg-optionpulse-blue/20">
                  <Bell size={14} />
                  <span className="hidden sm:inline">Alerts</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Strategy Selector */}
          <div className="space-y-2">
            <Label htmlFor="strategy" className="text-sm text-muted-foreground">
              Select Predefined Strategy
            </Label>
            <Select 
              value={selectedStrategy} 
              onValueChange={loadStrategy}
            >
              <SelectTrigger id="strategy" className="w-full bg-background/50">
                <SelectValue placeholder="Choose a strategy or build custom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iron-condor-spy">Iron Condor (SPY)</SelectItem>
                <SelectItem value="bull-call-spread-aapl">Bull Call Spread (AAPL)</SelectItem>
                <SelectItem value="bear-put-spread-msft">Bear Put Spread (MSFT)</SelectItem>
                <SelectItem value="long-straddle-tsla">Long Straddle (TSLA)</SelectItem>
                <SelectItem value="butterfly-spy">Butterfly Spread (SPY)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Strategy Description */}
          {selectedStrategy && predefinedStrategies[selectedStrategy] && (
            <div className="bg-muted/20 rounded-lg p-4 flex items-start gap-3">
              <Info size={18} className="text-optionpulse-blue mt-0.5" />
              <div>
                <p className="text-sm font-medium">{predefinedStrategies[selectedStrategy].name}</p>
                <p className="text-xs text-muted-foreground mt-1">{predefinedStrategies[selectedStrategy].description}</p>
              </div>
            </div>
          )}
          
          {/* Strategy Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Strategy Builder</h3>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addLeg}
                  className="flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add Leg
                </Button>
              </div>
            </div>
            
            {/* Strategy Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="ticker" className="text-sm text-muted-foreground">
                  Ticker
                </Label>
                <Select 
                  value={ticker} 
                  onValueChange={setTicker}
                >
                  <SelectTrigger id="ticker" className="w-full bg-background/50">
                    <SelectValue placeholder="Select Ticker" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockOptions.map((stock) => (
                      <SelectItem key={stock.id} value={stock.ticker}>
                        {stock.ticker} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentPrice" className="text-sm text-muted-foreground">
                  Current Price
                </Label>
                <Input
                  id="currentPrice"
                  type="number"
                  step="0.01"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm text-muted-foreground">
                  Expiration Date
                </Label>
                <Select 
                  value={expiry} 
                  onValueChange={setExpiry}
                >
                  <SelectTrigger id="expiry" className="w-full bg-background/50">
                    <SelectValue placeholder="Select Expiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-05-16">May 16, 2025</SelectItem>
                    <SelectItem value="2025-06-20">June 20, 2025</SelectItem>
                    <SelectItem value="2025-07-18">July 18, 2025</SelectItem>
                    <SelectItem value="2025-09-19">September 19, 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Option Legs */}
            {legs.length > 0 ? (
              <div className="space-y-4">
                {legs.map((leg, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center bg-black/20 p-3 rounded-lg">
                    <div className="col-span-2">
                      <Select 
                        value={leg.action} 
                        onValueChange={(value) => updateLeg(index, 'action', value)}
                      >
                        <SelectTrigger className="w-full bg-background/50 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="sell">Sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Select 
                        value={leg.type} 
                        onValueChange={(value) => updateLeg(index, 'type', value)}
                      >
                        <SelectTrigger className="w-full bg-background/50 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="put">Put</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="1"
                        min="1"
                        value={leg.quantity}
                        onChange={(e) => updateLeg(index, 'quantity', parseInt(e.target.value))}
                        className="bg-background/50 h-9"
                        placeholder="Qty"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.5"
                        value={leg.strike}
                        onChange={(e) => updateLeg(index, 'strike', parseFloat(e.target.value))}
                        className="bg-background/50 h-9"
                        placeholder="Strike"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={leg.premium}
                        onChange={(e) => updateLeg(index, 'premium', parseFloat(e.target.value))}
                        className="bg-background/50 h-9"
                        placeholder="Premium"
                      />
                    </div>
                    
                    <div className="col-span-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeLeg(index)}
                        className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/20 rounded-lg p-4 text-center text-muted-foreground text-sm">
                No option legs added yet. Select a predefined strategy or add legs manually.
              </div>
            )}

            {/* Payoff Chart and Strategy Metrics */}
            {legs.length > 0 && (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-black/20 p-4 rounded-lg h-[300px]">
                  <h3 className="text-base font-medium mb-3">Strategy Payoff Diagram</h3>
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={payoffData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="price" 
                        label={{ value: 'Stock Price ($)', position: 'insideBottomRight', offset: -5 }}
                        domain={['dataMin', 'dataMax']}
                      />
                      <YAxis 
                        label={{ value: 'Profit/Loss ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip content={<ChartTooltip valueLabel="P/L" />} />
                      <Line 
                        type="monotone" 
                        dataKey="payoff" 
                        stroke="#1EAEDB" 
                        strokeWidth={2}
                        dot={false}
                        name={`${getStrategyName()} P/L`}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <h3 className="text-base font-medium mb-3">Strategy Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-optionpulse-navy p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Strategy Cost</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        strategyCost > 0 ? "text-optionpulse-red-light" : "text-optionpulse-green-light"
                      )}>
                        {strategyCost > 0 ? `-$${Math.abs(strategyCost).toLocaleString()}` : `+$${Math.abs(strategyCost).toLocaleString()}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {strategyCost > 0 ? "Debit" : "Credit"}
                      </p>
                    </div>
                    
                    {metrics && (
                      <div className="bg-optionpulse-navy p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Max Profit</p>
                        <p className="text-lg font-semibold text-optionpulse-green-light">
                          ${metrics.maxProfit.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {metrics && (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-optionpulse-navy p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Max Loss</p>
                          <p className="text-lg font-semibold text-optionpulse-red-light">
                            ${metrics.maxLoss.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-optionpulse-navy p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">Break Even</p>
                          <p className="text-lg font-semibold">
                            ${metrics.breakEven.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Greeks (Estimated)</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Delta</span>
                            <Badge variant="outline">{metrics.delta}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Gamma</span>
                            <Badge variant="outline">{metrics.gamma}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Theta</span>
                            <Badge variant="outline">{metrics.theta}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Vega</span>
                            <Badge variant="outline">{metrics.vega}</Badge>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* Trade Execution Button */}
            <div className="mt-4">
              <Button 
                onClick={executeTrade} 
                disabled={legs.length === 0 || tradeExecuted}
                className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80 text-white transition-colors"
              >
                <DollarSign size={18} className="mr-2" />
                {tradeExecuted ? "Trade Executed" : "Execute Strategy Trade"}
              </Button>
            </div>
            
            {/* Trade Confirmation */}
            {showConfirmation && (
              <div className={cn(
                "mt-4 p-4 rounded-lg border bg-black/30 transition-all duration-300 animate-in fade-in",
                "border-optionpulse-green/30"
              )}>
                <h3 className="text-sm font-semibold text-optionpulse-green mb-2">Trade Executed Successfully</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Strategy:</span>
                    <span className="font-medium">{getStrategyName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticker:</span>
                    <span className="font-medium">{ticker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Legs:</span>
                    <span className="font-medium">{legs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiration:</span>
                    <span className="font-medium">{new Date(expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-muted/20">
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className={cn(
                      "font-semibold",
                      strategyCost > 0 ? "text-optionpulse-red-light" : "text-optionpulse-green-light"
                    )}>
                      {strategyCost > 0 ? `-$${Math.abs(strategyCost).toLocaleString()}` : `+$${Math.abs(strategyCost).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Balance:</span>
                    <span className="font-semibold text-optionpulse-blue">${accountBalance.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setLegs([]);
                      setSelectedStrategy("");
                      setPayoffData([]);
                      setMetrics(null);
                      setShowConfirmation(false);
                      setTradeExecuted(false);
                    }}
                  >
                    Create New Strategy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs bg-optionpulse-blue/10 border-optionpulse-blue/20 hover:bg-optionpulse-blue/20"
                    asChild
                  >
                    <Link to="/dashboard">
                      View Dashboard
                      <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Link to Strategy Builder */}
            <div className="mt-4 text-center">
              <Link to="/tools" className="text-xs text-muted-foreground hover:text-optionpulse-blue inline-flex items-center">
                Need more advanced analysis? Use our full Strategy Builder
                <ArrowRight size={12} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionStrategyTrader;
