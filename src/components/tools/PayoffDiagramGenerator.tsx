import React, { useState } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock payoff data generator
const generatePayoffData = (strike: number, premium: number, strategy: string) => {
  const data = [];
  const range = 0.3; // 30% range around strike price
  const minPrice = strike * (1 - range);
  const maxPrice = strike * (1 + range);
  const step = (maxPrice - minPrice) / 10;

  for (let price = minPrice; price <= maxPrice; price += step) {
    let profit = 0;
    
    if (strategy === "call") {
      profit = Math.max(0, price - strike) - premium;
    } else if (strategy === "put") {
      profit = Math.max(0, strike - price) - premium;
    } else if (strategy === "call-spread") {
      // Bull call spread (long lower strike, short higher strike)
      const upperStrike = strike * 1.1;
      profit = Math.max(0, Math.min(price - strike, upperStrike - strike)) - premium;
    } else if (strategy === "put-spread") {
      // Bear put spread (long higher strike, short lower strike)
      const lowerStrike = strike * 0.9;
      profit = Math.max(0, Math.min(strike - price, strike - lowerStrike)) - premium;
    }
    
    data.push({
      stockPrice: parseFloat(price.toFixed(2)),
      profit: parseFloat(profit.toFixed(2))
    });
  }
  
  return data;
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const stockPrice = label;
    const profit = payload[0].value;
    const maxProfit = Math.max(...payload[0].payload.parentData.map((d: any) => d.profit));
    const percentageOfMaxProfit = ((profit / maxProfit) * 100).toFixed(2);
    
    return (
      <div className="bg-background border border-border/50 rounded-lg p-2 text-sm shadow-lg">
        <p className="font-medium">Stock Price: ${stockPrice}</p>
        <p className="text-primary">P/L: ${profit} ({percentageOfMaxProfit}%)</p>
      </div>
    );
  }

  return null;
};

const PayoffDiagramGenerator = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [strike, setStrike] = useState(250);
  const [premium, setPremium] = useState(5);
  const [strategy, setStrategy] = useState("call");
  const [payoffData, setPayoffData] = useState(generatePayoffData(250, 5, "call"));

  const handleGeneratePayoff = () => {
    setPayoffData(generatePayoffData(strike, premium, strategy));
  };

  // Add parent data reference to each data point for tooltip calculations
  const enhancedPayoffData = payoffData.map(point => ({
    ...point,
    parentData: payoffData
  }));

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker">Ticker</Label>
          <Select
            value={ticker}
            onValueChange={(value) => setTicker(value)}
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
          <Label htmlFor="strategy">Strategy</Label>
          <Select
            value={strategy}
            onValueChange={(value) => setStrategy(value)}
          >
            <SelectTrigger id="strategy">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Call Option</SelectItem>
              <SelectItem value="put">Put Option</SelectItem>
              <SelectItem value="call-spread">Bull Call Spread</SelectItem>
              <SelectItem value="put-spread">Bear Put Spread</SelectItem>
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
      </div>
      
      <Button onClick={handleGeneratePayoff} className="w-full sm:w-auto">
        Generate Payoff Diagram
      </Button>
      
      <Card className="w-full h-[400px] p-4">
        <CardContent className="p-0 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={enhancedPayoffData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="stockPrice" 
                label={{ value: 'Stock Price ($)', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Profit/Loss ($)', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#1EAEDB" 
                activeDot={{ r: 8 }} 
                name={`${ticker} ${strategy.toUpperCase()} ($${strike} Strike, $${premium} Premium)`} 
              />
              <Line 
                type="monotone" 
                dataKey="breakeven" 
                stroke="#34D399" 
                strokeDasharray="5 5" 
                dot={false} 
                name="Break Even"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-optionpulse-navy p-4">
          <CardContent className="p-0">
            <div className="text-sm font-medium text-muted-foreground">Max Profit</div>
            <div className="text-xl font-bold text-optionpulse-green-light">${strategy === "call" || strategy === "put" ? "Unlimited" : (strike * 0.1 - premium).toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-optionpulse-navy p-4">
          <CardContent className="p-0">
            <div className="text-sm font-medium text-muted-foreground">Max Loss</div>
            <div className="text-xl font-bold text-optionpulse-red-light">${premium.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-optionpulse-navy p-4">
          <CardContent className="p-0">
            <div className="text-sm font-medium text-muted-foreground">Break Even</div>
            <div className="text-xl font-bold text-white">
              ${strategy === "call" || strategy === "call-spread" 
                ? (strike + premium).toFixed(2) 
                : (strike - premium).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayoffDiagramGenerator;
