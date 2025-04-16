import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Move, ArrowUp, ArrowDown, Plus, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import ChartTooltip from "@/components/tooltips/ChartTooltip";

interface OptionLeg {
  id: string;
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strike: number;
  premium: number;
  quantity: number;
}

const generatePayoffData = (legs: OptionLeg[], ticker: string, currentPrice: number) => {
  const data = [];
  const range = 0.3; // 30% range around current price
  const minPrice = currentPrice * (1 - range);
  const maxPrice = currentPrice * (1 + range);
  const step = (maxPrice - minPrice) / 30; // Increased from 20 to 30 data points for smoother line

  for (let price = minPrice; price <= maxPrice; price += step) {
    let totalProfit = 0;
    
    legs.forEach(leg => {
      let legProfit = 0;
      const multiplier = leg.action === 'buy' ? 1 : -1;
      
      if (leg.type === 'call') {
        legProfit = multiplier * (Math.max(0, price - leg.strike) - leg.premium);
      } else { // put
        legProfit = multiplier * (Math.max(0, leg.strike - price) - leg.premium);
      }
      
      totalProfit += legProfit * leg.quantity;
    });
    
    data.push({
      stockPrice: parseFloat(price.toFixed(2)),
      profit: parseFloat(totalProfit.toFixed(2))
    });
  }
  
  return data;
};

const calculateStrategyMetrics = (legs: OptionLeg[]) => {
  const netPremium = legs.reduce((sum, leg) => {
    return sum + (leg.action === 'buy' ? -1 : 1) * leg.premium * leg.quantity;
  }, 0);
  
  return {
    maxProfit: netPremium > 0 ? netPremium : "Unlimited",
    maxLoss: netPremium <= 0 ? -netPremium : "Unlimited",
    breakeven: legs.length > 0 ? 
      legs[0].strike + (legs[0].action === 'buy' ? legs[0].premium : -legs[0].premium) : 
      0,
    delta: 0.45,
    gamma: 0.03,
    theta: -0.015,
    vega: 0.25
  };
};

const defaultStockPrices = {
  AAPL: 250,
  SPY: 475,
  QQQ: 400
};

const StrategyBuilder = () => {
  const { toast } = useToast();
  const [ticker, setTicker] = useState("AAPL");
  const [currentPrice, setCurrentPrice] = useState(defaultStockPrices.AAPL);
  const [expiry, setExpiry] = useState("05/16/2025");
  const [legs, setLegs] = useState<OptionLeg[]>([
    { id: '1', type: 'call', action: 'buy', strike: 250, premium: 5, quantity: 1 }
  ]);
  const [payoffData, setPayoffData] = useState(generatePayoffData(legs, ticker, currentPrice));
  const [metrics, setMetrics] = useState(calculateStrategyMetrics(legs));
  const [draggedLeg, setDraggedLeg] = useState<number | null>(null);

  const handleTickerChange = (value: string) => {
    setTicker(value);
    const newPrice = defaultStockPrices[value as keyof typeof defaultStockPrices];
    setCurrentPrice(newPrice);
    
    const newLegs = legs.map(leg => ({
      ...leg,
      strike: Math.round(leg.strike * (newPrice / currentPrice) / 5) * 5
    }));
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, value, newPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleAddLeg = () => {
    const newLeg: OptionLeg = {
      id: Date.now().toString(),
      type: 'call',
      action: 'buy',
      strike: currentPrice,
      premium: 5,
      quantity: 1
    };
    
    const newLegs = [...legs, newLeg];
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
    
    toast({
      title: "Leg Added",
      description: `Added ${newLeg.action} ${newLeg.type} option at strike $${newLeg.strike}`,
    });
  };

  const handleDeleteLeg = (id: string) => {
    const newLegs = legs.filter(leg => leg.id !== id);
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleLegChange = (id: string, field: keyof OptionLeg, value: any) => {
    const newLegs = legs.map(leg => {
      if (leg.id === id) {
        return { ...leg, [field]: value };
      }
      return leg;
    });
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleCalculate = () => {
    setPayoffData(generatePayoffData(legs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(legs));
    
    toast({
      title: "Strategy Updated",
      description: `Strategy payoff has been recalculated for ${ticker}`,
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedLeg(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedLeg === null || draggedLeg === index) return;
    
    const newLegs = [...legs];
    const draggedItem = newLegs[draggedLeg];
    newLegs.splice(draggedLeg, 1);
    newLegs.splice(index, 0, draggedItem);
    
    setLegs(newLegs);
    setDraggedLeg(index);
  };

  const handleDragEnd = () => {
    setDraggedLeg(null);
    setPayoffData(generatePayoffData(legs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(legs));
  };

  const getStrategyName = () => {
    if (legs.length === 0) return "No Legs Added";
    if (legs.length === 1) {
      const leg = legs[0];
      return `${leg.action === 'buy' ? 'Long' : 'Short'} ${leg.type.charAt(0).toUpperCase() + leg.type.slice(1)}`;
    }
    if (legs.length === 2) {
      if (legs[0].type === 'call' && legs[1].type === 'call') {
        if (legs[0].action === 'buy' && legs[1].action === 'sell') {
          return "Bull Call Spread";
        }
        if (legs[0].action === 'sell' && legs[1].action === 'buy') {
          return "Bear Call Spread";
        }
      }
      if (legs[0].type === 'put' && legs[1].type === 'put') {
        if (legs[0].action === 'buy' && legs[1].action === 'sell') {
          return "Bear Put Spread";
        }
        if (legs[0].action === 'sell' && legs[1].action === 'buy') {
          return "Bull Put Spread";
        }
      }
      if (legs[0].type !== legs[1].type) {
        if (legs[0].action === 'buy' && legs[1].action === 'buy') {
          return "Straddle";
        }
      }
    }
    if (legs.length === 4) {
      return "Iron Condor";
    }
    return "Custom Strategy";
  };

  const enhancedPayoffData = payoffData.map(point => ({
    ...point,
    parentData: payoffData
  }));

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker">Ticker</Label>
          <Select
            value={ticker}
            onValueChange={handleTickerChange}
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
          <Label htmlFor="current-price">Current Price</Label>
          <Input
            id="current-price"
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry">Expiration Date</Label>
          <Select value={expiry} onValueChange={setExpiry}>
            <SelectTrigger id="expiry">
              <SelectValue placeholder="Select expiry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="04/25/2025">04/25/2025</SelectItem>
              <SelectItem value="05/16/2025">05/16/2025</SelectItem>
              <SelectItem value="05/30/2025">05/30/2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Strategy: {getStrategyName()}</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop legs to rearrange, add new legs, or modify existing ones
          </p>
        </div>
        <Button onClick={handleAddLeg} className="flex items-center gap-1">
          <Plus size={16} />
          Add Leg
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "40px" }}></TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Strike</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead style={{ width: "80px" }}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {legs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No option legs added. Click "Add Leg" to start building your strategy.
                </TableCell>
              </TableRow>
            ) : (
              legs.map((leg, index) => (
                <TableRow 
                  key={leg.id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="cursor-move"
                >
                  <TableCell className="p-2">
                    <Button variant="ghost" size="icon" className="cursor-move">
                      <Move size={16} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={leg.action}
                      onValueChange={(value) => handleLegChange(leg.id, 'action', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="sell">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={leg.type}
                      onValueChange={(value) => handleLegChange(leg.id, 'type', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="put">Put</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={leg.strike}
                      onChange={(e) => handleLegChange(leg.id, 'strike', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={leg.premium}
                      onChange={(e) => handleLegChange(leg.id, 'premium', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={leg.quantity}
                      onChange={(e) => handleLegChange(leg.id, 'quantity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteLeg(leg.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Button onClick={handleCalculate} className="w-full sm:w-auto">
        Calculate Strategy Performance
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg">Payoff Diagram</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[320px]">
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
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#1EAEDB" 
                  strokeWidth={2}
                  dot={false}
                  name={`${getStrategyName()} P/L`} 
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Strategy Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-optionpulse-navy p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Max Profit</div>
                <div className="text-base font-bold text-optionpulse-green-light">
                  {typeof metrics.maxProfit === 'number' ? `$${metrics.maxProfit.toFixed(2)}` : metrics.maxProfit}
                </div>
              </div>
              
              <div className="bg-optionpulse-navy p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Max Loss</div>
                <div className="text-base font-bold text-optionpulse-red-light">
                  {typeof metrics.maxLoss === 'number' ? `$${metrics.maxLoss.toFixed(2)}` : metrics.maxLoss}
                </div>
              </div>
              
              <div className="bg-optionpulse-navy p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Break Even</div>
                <div className="text-base font-bold text-white">${metrics.breakeven.toFixed(2)}</div>
              </div>
              
              <div className="bg-optionpulse-navy p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Risk/Reward Ratio</div>
                <div className="text-base font-bold">
                  {typeof metrics.maxLoss === 'number' && typeof metrics.maxProfit === 'number' 
                    ? (metrics.maxLoss / metrics.maxProfit).toFixed(2) 
                    : "N/A"}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Greeks (Composite)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Delta</span>
                  <Badge>{metrics.delta.toFixed(2)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gamma</span>
                  <Badge>{metrics.gamma.toFixed(3)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Theta</span>
                  <Badge>{metrics.theta.toFixed(3)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vega</span>
                  <Badge>{metrics.vega.toFixed(3)}</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <h4 className="text-sm font-medium">Strategy Characteristics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bullish</span>
                  <div className="flex space-x-1">
                    {metrics.delta > 0.3 ? (
                      <CheckCircle size={16} className="text-optionpulse-green" />
                    ) : (
                      <XCircle size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bearish</span>
                  <div className="flex space-x-1">
                    {metrics.delta < -0.3 ? (
                      <CheckCircle size={16} className="text-optionpulse-green" />
                    ) : (
                      <XCircle size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Theta</span>
                  <div className="flex space-x-1">
                    {metrics.theta < -0.01 ? (
                      <CheckCircle size={16} className="text-optionpulse-green" />
                    ) : (
                      <XCircle size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Gamma</span>
                  <div className="flex space-x-1">
                    {metrics.gamma > 0.02 ? (
                      <CheckCircle size={16} className="text-optionpulse-green" />
                    ) : (
                      <XCircle size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategyBuilder;
