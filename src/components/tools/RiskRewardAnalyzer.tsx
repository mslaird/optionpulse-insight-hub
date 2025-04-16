
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

// Mock strategy data
const strategyData = {
  "long-call": {
    name: "Long Call",
    description: "Buying a call option hoping the stock price increases",
    maxProfit: "Unlimited",
    maxLoss: "Premium Paid",
    breakEven: "Strike + Premium",
    risk: "Limited to premium paid",
    reward: "Unlimited as stock price increases",
    sampleTrade: {
      ticker: "AAPL",
      strike: 250,
      premium: 5,
      expiry: "05/16/2025"
    },
    payoff: (price, strike, premium) => Math.max(0, price - strike) - premium
  },
  "long-put": {
    name: "Long Put",
    description: "Buying a put option hoping the stock price decreases",
    maxProfit: "Strike - Premium",
    maxLoss: "Premium Paid",
    breakEven: "Strike - Premium",
    risk: "Limited to premium paid",
    reward: "Up to strike price - premium as stock price decreases",
    sampleTrade: {
      ticker: "SPY",
      strike: 475,
      premium: 6,
      expiry: "05/16/2025"
    },
    payoff: (price, strike, premium) => Math.max(0, strike - price) - premium
  },
  "bull-call-spread": {
    name: "Bull Call Spread",
    description: "Buy a call at lower strike, sell a call at higher strike",
    maxProfit: "Width of strikes - net premium paid",
    maxLoss: "Net premium paid",
    breakEven: "Lower strike + net premium",
    risk: "Limited to net premium paid",
    reward: "Limited to width of strikes - net premium",
    sampleTrade: {
      ticker: "AAPL",
      strike: 250,
      highStrike: 270,
      premium: 5,
      soldPremium: 2,
      expiry: "05/16/2025"
    },
    payoff: (price, strike, premium, highStrike, soldPremium) => {
      const netPremium = premium - soldPremium;
      return Math.max(0, Math.min(price - strike, highStrike - strike)) - netPremium;
    }
  },
  "bear-put-spread": {
    name: "Bear Put Spread",
    description: "Buy a put at higher strike, sell a put at lower strike",
    maxProfit: "Width of strikes - net premium paid",
    maxLoss: "Net premium paid",
    breakEven: "Higher strike - net premium",
    risk: "Limited to net premium paid",
    reward: "Limited to width of strikes - net premium",
    sampleTrade: {
      ticker: "QQQ",
      strike: 400,
      lowStrike: 380,
      premium: 8,
      soldPremium: 3,
      expiry: "05/16/2025"
    },
    payoff: (price, strike, premium, lowStrike, soldPremium) => {
      const netPremium = premium - soldPremium;
      return Math.max(0, Math.min(strike - price, strike - lowStrike)) - netPremium;
    }
  },
  "iron-condor": {
    name: "Iron Condor",
    description: "Sell a put and call spread for premium income, benefit from low volatility",
    maxProfit: "Net premium received",
    maxLoss: "Width of widest spread - net premium received",
    breakEven: "Upper short strike + net premium / Lower short strike - net premium",
    risk: "Limited to width of widest spread - net premium",
    reward: "Limited to net premium received",
    sampleTrade: {
      ticker: "SPY",
      putStrike: 450,
      putLowStrike: 430,
      callStrike: 500,
      callHighStrike: 520,
      netPremium: 4,
      expiry: "05/16/2025"
    },
    payoff: (price, putStrike, putLowStrike, callStrike, callHighStrike, netPremium) => {
      if (price <= putLowStrike) return putLowStrike - putStrike - netPremium;
      if (price < putStrike) return price - putStrike - netPremium;
      if (price <= callStrike) return netPremium;
      if (price < callHighStrike) return netPremium - (price - callStrike);
      return netPremium - (callHighStrike - callStrike);
    }
  }
};

const generatePayoffData = (strategy, params) => {
  const data = [];
  let minPrice, maxPrice;
  let breakEvenPoint = 0;
  
  if (strategy === "long-call" || strategy === "long-put") {
    const { strike, premium } = params;
    minPrice = strike * 0.7;
    maxPrice = strike * 1.3;
    
    // Calculate break-even point
    if (strategy === "long-call") {
      breakEvenPoint = strike + premium;
    } else {
      breakEvenPoint = strike - premium;
    }
    
    for (let price = minPrice; price <= maxPrice; price += (maxPrice - minPrice) / 20) {
      let profit;
      if (strategy === "long-call") {
        profit = strategyData["long-call"].payoff(price, strike, premium);
      } else {
        profit = strategyData["long-put"].payoff(price, strike, premium);
      }
      
      data.push({
        stockPrice: parseFloat(price.toFixed(2)),
        profit: parseFloat(profit.toFixed(2))
      });
    }
  } else if (strategy === "bull-call-spread" || strategy === "bear-put-spread") {
    const { strike, highStrike, lowStrike, premium, soldPremium } = params;
    
    if (strategy === "bull-call-spread") {
      minPrice = strike * 0.7;
      maxPrice = highStrike * 1.3;
      breakEvenPoint = strike + (premium - soldPremium);
      
      for (let price = minPrice; price <= maxPrice; price += (maxPrice - minPrice) / 20) {
        const profit = strategyData["bull-call-spread"].payoff(price, strike, premium, highStrike, soldPremium);
        data.push({
          stockPrice: parseFloat(price.toFixed(2)),
          profit: parseFloat(profit.toFixed(2))
        });
      }
    } else {
      minPrice = lowStrike * 0.7;
      maxPrice = strike * 1.3;
      breakEvenPoint = strike - (premium - soldPremium);
      
      for (let price = minPrice; price <= maxPrice; price += (maxPrice - minPrice) / 20) {
        const profit = strategyData["bear-put-spread"].payoff(price, strike, premium, lowStrike, soldPremium);
        data.push({
          stockPrice: parseFloat(price.toFixed(2)),
          profit: parseFloat(profit.toFixed(2))
        });
      }
    }
  } else if (strategy === "iron-condor") {
    const { putStrike, putLowStrike, callStrike, callHighStrike, netPremium } = params;
    
    minPrice = putLowStrike * 0.7;
    maxPrice = callHighStrike * 1.3;
    // Iron condor has two break-even points, using the put side for now
    breakEvenPoint = putStrike - netPremium;
    
    for (let price = minPrice; price <= maxPrice; price += (maxPrice - minPrice) / 20) {
      const profit = strategyData["iron-condor"].payoff(
        price, putStrike, putLowStrike, callStrike, callHighStrike, netPremium
      );
      
      data.push({
        stockPrice: parseFloat(price.toFixed(2)),
        profit: parseFloat(profit.toFixed(2))
      });
    }
  }
  
  return { data, breakEvenPoint: parseFloat(breakEvenPoint.toFixed(2)) };
};

const RiskRewardAnalyzer = () => {
  const [selectedStrategy, setSelectedStrategy] = useState("long-call");
  const [ticker, setTicker] = useState(strategyData[selectedStrategy].sampleTrade.ticker);
  const [strike, setStrike] = useState(strategyData[selectedStrategy].sampleTrade.strike);
  const [premium, setPremium] = useState(strategyData[selectedStrategy].sampleTrade.premium);
  const [highStrike, setHighStrike] = useState(strategyData[selectedStrategy].sampleTrade.highStrike || 0);
  const [lowStrike, setLowStrike] = useState(strategyData[selectedStrategy].sampleTrade.lowStrike || 0);
  const [soldPremium, setSoldPremium] = useState(strategyData[selectedStrategy].sampleTrade.soldPremium || 0);
  
  const initialPayoff = generatePayoffData(selectedStrategy, strategyData[selectedStrategy].sampleTrade);
  const [payoffData, setPayoffData] = useState(initialPayoff.data);
  const [breakEvenPoint, setBreakEvenPoint] = useState(initialPayoff.breakEvenPoint);

  const handleStrategyChange = (value) => {
    setSelectedStrategy(value);
    const strategy = strategyData[value];
    setTicker(strategy.sampleTrade.ticker);
    setStrike(strategy.sampleTrade.strike);
    setPremium(strategy.sampleTrade.premium);
    
    if (value === "bull-call-spread") {
      setHighStrike(strategy.sampleTrade.highStrike);
      setSoldPremium(strategy.sampleTrade.soldPremium);
    } else if (value === "bear-put-spread") {
      setLowStrike(strategy.sampleTrade.lowStrike);
      setSoldPremium(strategy.sampleTrade.soldPremium);
    }
    
    const payoffResult = generatePayoffData(value, strategy.sampleTrade);
    setPayoffData(payoffResult.data);
    setBreakEvenPoint(payoffResult.breakEvenPoint);
  };

  const handleCalculate = () => {
    let params = {};
    
    if (selectedStrategy === "long-call" || selectedStrategy === "long-put") {
      params = { strike, premium };
    } else if (selectedStrategy === "bull-call-spread") {
      params = { strike, highStrike, premium, soldPremium };
    } else if (selectedStrategy === "bear-put-spread") {
      params = { strike, lowStrike, premium, soldPremium };
    } else if (selectedStrategy === "iron-condor") {
      params = {
        putStrike: strike - 25,
        putLowStrike: strike - 45,
        callStrike: strike + 25,
        callHighStrike: strike + 45,
        netPremium: 4
      };
    }
    
    const payoffResult = generatePayoffData(selectedStrategy, params);
    setPayoffData(payoffResult.data);
    setBreakEvenPoint(payoffResult.breakEvenPoint);
  };

  const enhancedPayoffData = payoffData.map(point => ({
    ...point,
    parentData: payoffData
  }));

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="strategy">Strategy</Label>
          <Select
            value={selectedStrategy}
            onValueChange={handleStrategyChange}
          >
            <SelectTrigger id="strategy">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long-call">Long Call</SelectItem>
              <SelectItem value="long-put">Long Put</SelectItem>
              <SelectItem value="bull-call-spread">Bull Call Spread</SelectItem>
              <SelectItem value="bear-put-spread">Bear Put Spread</SelectItem>
              <SelectItem value="iron-condor">Iron Condor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="bg-card/30 backdrop-blur-sm border-border/50 p-4">
        <CardContent className="p-0">
          <div className="text-lg font-semibold mb-2">{strategyData[selectedStrategy].name}</div>
          <p className="text-muted-foreground mb-4">{strategyData[selectedStrategy].description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-optionpulse-navy p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Max Profit</div>
              <div className="text-lg font-bold text-optionpulse-green-light">{strategyData[selectedStrategy].maxProfit}</div>
            </div>
            
            <div className="bg-optionpulse-navy p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Max Loss</div>
              <div className="text-lg font-bold text-optionpulse-red-light">{strategyData[selectedStrategy].maxLoss}</div>
            </div>
            
            <div className="bg-optionpulse-navy p-4 rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Break Even</div>
              <div className="text-lg font-bold text-white">{strategyData[selectedStrategy].breakEven}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-base font-medium mb-2">Risk</h4>
              <p className="text-sm text-muted-foreground">{strategyData[selectedStrategy].risk}</p>
            </div>
            
            <div>
              <h4 className="text-base font-medium mb-2">Reward</h4>
              <p className="text-sm text-muted-foreground">{strategyData[selectedStrategy].reward}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="ticker">Ticker</Label>
              <Select
                value={ticker}
                onValueChange={setTicker}
              >
                <SelectTrigger id="ticker">
                  <SelectValue placeholder="Select ticker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AAPL">AAPL</SelectItem>
                  <SelectItem value="SPY">SPY</SelectItem>
                  <SelectItem value="QQQ">QQQ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="strike">Strike Price ($)</Label>
              <Input
                id="strike"
                type="number"
                min="50"
                max="1000"
                value={strike}
                onChange={(e) => setStrike(parseFloat(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="premium">Premium ($)</Label>
              <Input
                id="premium"
                type="number"
                min="1"
                max="50"
                step="0.5"
                value={premium}
                onChange={(e) => setPremium(parseFloat(e.target.value))}
              />
            </div>
            
            {(selectedStrategy === "bull-call-spread") && (
              <div className="space-y-2">
                <Label htmlFor="highStrike">Higher Strike ($)</Label>
                <Input
                  id="highStrike"
                  type="number"
                  min={strike ? strike + 1 : 100}
                  max="1000"
                  value={highStrike}
                  onChange={(e) => setHighStrike(parseFloat(e.target.value))}
                />
              </div>
            )}
            
            {(selectedStrategy === "bear-put-spread") && (
              <div className="space-y-2">
                <Label htmlFor="lowStrike">Lower Strike ($)</Label>
                <Input
                  id="lowStrike"
                  type="number"
                  min="50"
                  max={strike ? strike - 1 : 900}
                  value={lowStrike}
                  onChange={(e) => setLowStrike(parseFloat(e.target.value))}
                />
              </div>
            )}
            
            {(selectedStrategy === "bull-call-spread" || selectedStrategy === "bear-put-spread") && (
              <div className="space-y-2">
                <Label htmlFor="soldPremium">Sold Premium ($)</Label>
                <Input
                  id="soldPremium"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={soldPremium}
                  onChange={(e) => setSoldPremium(parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>
          
          <Button onClick={handleCalculate} className="w-full sm:w-auto mb-6">
            Calculate Risk/Reward
          </Button>
          
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={enhancedPayoffData}
                margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="stockPrice" 
                  label={{ 
                    value: 'Stock Price ($)', 
                    position: 'insideBottom', 
                    offset: -20,
                    style: { 
                      textAnchor: 'middle', 
                      fontSize: '0.75rem' 
                    } 
                  }} 
                />
                <YAxis 
                  label={{ 
                    value: 'Profit/Loss ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { 
                      textAnchor: 'middle', 
                      fontSize: '0.75rem' 
                    } 
                  }} 
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend 
                  wrapperStyle={{ bottom: 0, left: 0, right: 0 }} 
                  verticalAlign="bottom" 
                  align="center"
                />
                
                {/* Display break-even point */}
                <ReferenceLine 
                  x={breakEvenPoint} 
                  stroke="#34D399" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  label={{
                    value: `Break Even: $${breakEvenPoint.toFixed(2)}`,
                    position: 'top',
                    fill: '#34D399',
                    fontSize: 12
                  }}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#1EAEDB" 
                  strokeWidth={2}
                  dot={false}
                  name={`${strategyData[selectedStrategy].name} P/L`} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskRewardAnalyzer;
