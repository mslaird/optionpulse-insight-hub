import { useState, useEffect } from "react";
import { DollarSign, Wallet, Info, Zap, BookMarked, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStocks } from "@/data/mockStockData";
import { cn } from "@/lib/utils";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { mockLeapsAlerts } from "@/data/mockAlertData";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock options data including LEAPS
const mockOptionsData = {
  AAPL: {
    standard: {
      bid: 10,
      ask: 11,
      strike: 150
    },
    leaps: [{
      bid: 32.5,
      ask: 34.0,
      strike: 200,
      expiry: "Jan 2026",
      iv: 18.5,
      delta: 0.65,
      theta: -0.045
    }, {
      bid: 48.7,
      ask: 50.2,
      strike: 250,
      expiry: "Jan 2026",
      iv: 20.2,
      delta: 0.72,
      theta: -0.038
    }, {
      bid: 29.3,
      ask: 30.6,
      strike: 300,
      expiry: "Jun 2026",
      iv: 22.4,
      delta: 0.58,
      theta: -0.032
    }, {
      bid: 58.4,
      ask: 60.1,
      strike: 280,
      expiry: "Jan 2027",
      iv: 16.8,
      delta: 0.78,
      theta: -0.025
    }]
  },
  SPY: {
    standard: {
      bid: 8.5,
      ask: 9.2,
      strike: 450
    },
    leaps: [{
      bid: 45.2,
      ask: 46.8,
      strike: 480,
      expiry: "Jan 2026",
      iv: 15.8,
      delta: 0.61,
      theta: -0.042
    }, {
      bid: 63.5,
      ask: 65.2,
      strike: 550,
      expiry: "Jan 2026",
      iv: 18.5,
      delta: 0.56,
      theta: -0.036
    }, {
      bid: 38.9,
      ask: 40.3,
      strike: 600,
      expiry: "Jun 2026",
      iv: 21.2,
      delta: 0.45,
      theta: -0.029
    }, {
      bid: 75.6,
      ask: 77.3,
      strike: 520,
      expiry: "Jan 2027",
      iv: 16.5,
      delta: 0.69,
      theta: -0.022
    }]
  },
  TSLA: {
    standard: {
      bid: 15.2,
      ask: 16.0,
      strike: 240
    },
    leaps: []
  },
  MSFT: {
    standard: {
      bid: 12.5,
      ask: 13.1,
      strike: 325
    },
    leaps: []
  },
  QQQ: {
    standard: {
      bid: 13.8,
      ask: 14.5,
      strike: 400
    },
    leaps: [{
      bid: 42.6,
      ask: 44.2,
      strike: 420,
      expiry: "Jan 2026",
      iv: 17.2,
      delta: 0.58,
      theta: -0.040
    }, {
      bid: 56.8,
      ask: 58.4,
      strike: 500,
      expiry: "Jan 2026",
      iv: 19.8,
      delta: 0.52,
      theta: -0.035
    }, {
      bid: 35.4,
      ask: 37.1,
      strike: 550,
      expiry: "Jun 2026",
      iv: 22.3,
      delta: 0.41,
      theta: -0.027
    }, {
      bid: 68.5,
      ask: 70.2,
      strike: 480,
      expiry: "Jan 2027",
      iv: 15.9,
      delta: 0.64,
      theta: -0.020
    }]
  }
};

// Option types
const optionTypes = [{
  value: "call",
  label: "Call"
}, {
  value: "put",
  label: "Put"
}];

// Expiry types
const expiryTypes = [{
  value: "standard",
  label: "Standard (30-90 days)"
}, {
  value: "leaps",
  label: "LEAPS (Long-term)"
}];

// LEAPS expiry dates
const leapsExpiryDates = [{
  value: "Jan 2026",
  label: "January 2026"
}, {
  value: "Jun 2026",
  label: "June 2026"
}, {
  value: "Jan 2027",
  label: "January 2027"
}];

// Strategy explanations
const strategyExplanations = {
  nakedCall: {
    title: "Naked Call",
    content: "A naked call is selling a call option without owning the underlying stock, risking unlimited loss if the stock price rises significantly. Example: Sell AAPL $150 call for $5 premium; if AAPL rises to $200, you must buy at $200 to sell at $150, losing $45/share."
  },
  nakedPut: {
    title: "Naked Put",
    content: "A naked put is selling a put option without holding cash to buy the stock, risking loss if the stock price falls. Example: Sell AAPL $150 put for $5 premium; if AAPL drops to $100, you must buy at $150, losing $45/share."
  },
  cashSecuredPut: {
    title: "Cash-Secured Put",
    content: "A cash-secured put is selling a put option while holding enough cash to buy the stock if assigned. Example: Sell AAPL $150 put for $5 premium, hold $15,000 cash; if AAPL drops to $100, you buy at $150, but your cost basis is $145 after the premium."
  },
  coveredCall: {
    title: "Covered Call",
    content: "A covered call is selling a call option while owning the underlying stock, earning a premium but capping upside potential. Example: Own 100 AAPL shares at $150, sell $160 call for $5 premium; if AAPL rises to $170, you sell at $160, missing $10/share but keeping the $5 premium."
  },
  leaps: {
    title: "LEAPS Options",
    content: "LEAPS (Long-term Equity Anticipation Securities) are options with expirations longer than a year. They provide leverage to long-term price movements with lower capital requirements than stock ownership. Example: Buy AAPL $250 call LEAPS expiring in Jan 2026 for $32, gaining exposure to $25,000 of stock with just $3,200."
  }
};
const SimulatedTrading = () => {
  const {
    toast
  } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTradeSummary, setShowTradeSummary] = useState(false);
  const [accountValue, setAccountValue] = useState(100000);

  // Form state
  const [selectedTicker, setSelectedTicker] = useState("AAPL");
  const [optionType, setOptionType] = useState("call");
  const [expiryType, setExpiryType] = useState("standard");
  const [leapsExpiry, setLeapsExpiry] = useState("Jan 2026");
  const [strikePrice, setStrikePrice] = useState("150");
  const [quantity, setQuantity] = useState("1");
  const [selectedLeapsOption, setSelectedLeapsOption] = useState(null);

  // PnL state for display
  const [estimatedPnL, setEstimatedPnL] = useState({
    value: 0,
    percent: 0,
    greeks: {
      delta: 0,
      theta: 0
    }
  });

  // Trading history
  const [tradeHistory, setTradeHistory] = useState([]);

  // Filtered stock list (only stocks, not strategies)
  const stockOptions = mockStocks.filter(stock => stock.type === 'stock' || stock.type === 'etf');

  // Update strike price based on ticker and expiry type
  useEffect(() => {
    if (expiryType === "standard") {
      setStrikePrice(mockOptionsData[selectedTicker]?.standard?.strike.toString() || "150");
    } else if (expiryType === "leaps" && mockOptionsData[selectedTicker]?.leaps?.length > 0) {
      const firstLeap = mockOptionsData[selectedTicker].leaps[0];
      setStrikePrice(firstLeap.strike.toString());
      setLeapsExpiry(firstLeap.expiry);
      setSelectedLeapsOption(firstLeap);
    }
  }, [selectedTicker, expiryType]);

  // Update selectedLeapsOption when expiry or strike changes
  useEffect(() => {
    if (expiryType === "leaps") {
      const leapsOptions = mockOptionsData[selectedTicker]?.leaps || [];
      const matchingOption = leapsOptions.find(option => option.expiry === leapsExpiry && option.strike === parseFloat(strikePrice));
      if (matchingOption) {
        setSelectedLeapsOption(matchingOption);
      } else if (leapsOptions.length > 0) {
        // If no exact match, find closest strike
        const closestOption = leapsOptions.filter(option => option.expiry === leapsExpiry).sort((a, b) => Math.abs(a.strike - parseFloat(strikePrice)) - Math.abs(b.strike - parseFloat(strikePrice)))[0];
        if (closestOption) {
          setSelectedLeapsOption(closestOption);
          setStrikePrice(closestOption.strike.toString());
        }
      }
    }
  }, [leapsExpiry, strikePrice, selectedTicker, expiryType]);

  // Generate available strikes based on ticker and expiry
  const getAvailableStrikes = () => {
    if (expiryType === "standard") {
      const baseStrike = mockOptionsData[selectedTicker]?.standard?.strike || 150;
      return Array.from({
        length: 7
      }, (_, i) => baseStrike + (i - 3) * 10);
    } else {
      return mockOptionsData[selectedTicker]?.leaps.filter(option => option.expiry === leapsExpiry).map(option => option.strike) || [];
    }
  };

  // Calculate estimated P&L
  const calculateEstimatedPnL = () => {
    const stockPrice = mockStocks.find(stock => stock.ticker === selectedTicker)?.price || 0;
    let optionPrice = 0;
    let delta = 0;
    let theta = 0;
    if (expiryType === "standard") {
      optionPrice = mockOptionsData[selectedTicker]?.standard?.bid || 0;
      delta = 0.5; // Default delta for standard options
      theta = -0.05; // Default theta for standard options
    } else if (selectedLeapsOption) {
      optionPrice = selectedLeapsOption.bid;
      delta = selectedLeapsOption.delta;
      theta = selectedLeapsOption.theta;
    }
    const qty = parseInt(quantity) || 0;
    const cost = optionPrice * 100 * qty;
    const projectedChange = optionType === "call" ? Math.max(0, stockPrice * 1.1 - parseFloat(strikePrice)) * 100 * qty : Math.max(0, parseFloat(strikePrice) - stockPrice * 0.9) * 100 * qty;
    const pnlValue = projectedChange - cost;
    const pnlPercent = cost > 0 ? pnlValue / cost * 100 : 0;
    return {
      value: pnlValue,
      percent: pnlPercent,
      greeks: {
        delta,
        theta
      }
    };
  };
  const handleSimulateTrade = () => {
    setIsSimulating(true);
    setShowTradeSummary(false);

    // Simulate API call delay
    setTimeout(() => {
      setIsSimulating(false);
      setShowTradeSummary(true);

      // Calculate cost and update account value
      const cost = calculateTotalCost();
      const newAccountValue = accountValue - cost;
      setAccountValue(newAccountValue);

      // Calculate estimated P&L
      const pnl = calculateEstimatedPnL();
      setEstimatedPnL(pnl);

      // Add to trade history
      const newTrade = {
        id: Date.now(),
        ticker: selectedTicker,
        type: optionType,
        strike: strikePrice,
        expiry: expiryType === "standard" ? "30-90 days" : leapsExpiry,
        quantity: parseInt(quantity),
        cost: cost,
        timestamp: new Date().toLocaleString(),
        isLeaps: expiryType === "leaps"
      };
      setTradeHistory([newTrade, ...tradeHistory]);

      // Show toast notification for trade confirmation
      toast({
        title: `${expiryType === "leaps" ? "LEAPS" : "Standard"} Option Trade Simulated`,
        description: `${quantity} ${selectedTicker} $${strikePrice} ${optionType}, expiry: ${expiryType === "leaps" ? leapsExpiry : "30-90 days"}`,
        variant: "default",
        className: "bg-black/80 border-[#00B7EB]/30 text-white"
      });
    }, 1000);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    let bid = 0;
    if (expiryType === "standard") {
      bid = mockOptionsData[selectedTicker]?.standard?.bid || 0;
    } else if (selectedLeapsOption) {
      bid = selectedLeapsOption.bid;
    }
    const qty = parseInt(quantity) || 0;
    return bid * 100 * qty;
  };

  // Find a recommended LEAPS alert for the selected ticker
  const getRecommendedLeapsAlert = () => {
    return mockLeapsAlerts.find(alert => alert.symbol === selectedTicker && alert.itmProbability >= 65);
  };
  const recommendedAlert = getRecommendedLeapsAlert();
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <DollarSign size={18} className="text-optionpulse-blue" />
          Simulated Trading
          {expiryType === "leaps" && (
            <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
              LEAPS
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Account Value:</span>
              <span className="font-semibold text-white">${accountValue.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <Link to="/tools/strategy-builder" className="my-0">
                <Button variant="link" size="sm" className="text-optionpulse-blue p-0 mx-[10px]">
                  Strategy Builder
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
              <Link to="/journal">
                <Button variant="link" size="sm" className="text-optionpulse-blue p-0">
                  <BookMarked size={14} className="mr-1" />
                  Trade Journal
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="w-full sm:w-auto">
              <Button variant={expiryType === "standard" ? "default" : "outline"} onClick={() => setExpiryType("standard")} className="w-full sm:w-auto">
                Standard Options
              </Button>
            </div>
            <div className="w-full sm:w-auto">
              <Button variant={expiryType === "leaps" ? "default" : "outline"} onClick={() => setExpiryType("leaps")} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white">
                <Zap size={16} className="mr-2" />
                LEAPS (Long-term)
              </Button>
            </div>
          </div>
          
          {expiryType === "leaps" && recommendedAlert && (
            <div className="mb-4 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <div className="flex items-start">
                <Zap size={18} className="mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-emerald-400 font-medium">Recommended LEAPS Alert</p>
                  <p className="text-sm text-muted-foreground">
                    {recommendedAlert.symbol} ${recommendedAlert.strikePrice} {recommendedAlert.type},&nbsp;
                    <span className="text-emerald-400">{recommendedAlert.itmProbability}% ITM</span> by {recommendedAlert.expiryDate}
                  </p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-emerald-400"
                    onClick={() => {
                      setSelectedTicker(recommendedAlert.symbol);
                      setOptionType(recommendedAlert.type);
                      setStrikePrice(recommendedAlert.strikePrice.toString());
                      // Find closest expiry date
                      const closestExpiry = leapsExpiryDates.find(exp => exp.label.includes(recommendedAlert.expiryDate.split('/')[2]))?.value || "Jan 2026";
                      setLeapsExpiry(closestExpiry);
                    }}
                  >
                    Test this alert
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm text-muted-foreground">
                Select Ticker
              </Label>
              <Select value={selectedTicker} onValueChange={setSelectedTicker}>
                <SelectTrigger id="ticker" className="w-full bg-background/50">
                  <SelectValue placeholder="Select Ticker" />
                </SelectTrigger>
                <SelectContent>
                  {stockOptions
                    .filter(
                      stock =>
                        expiryType !== "leaps" ||
                        (Object.keys(mockOptionsData).includes(stock.ticker) &&
                          mockOptionsData[stock.ticker]?.leaps?.length > 0)
                    )
                    .map(stock => (
                      <SelectItem key={stock.id} value={stock.ticker}>
                        {stock.ticker} - {stock.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="optionType" className="text-sm text-muted-foreground">
                Option Type
              </Label>
              <Select value={optionType} onValueChange={setOptionType}>
                <SelectTrigger id="optionType" className="w-full bg-background/50">
                  <SelectValue placeholder="Select Option Type" />
                </SelectTrigger>
                <SelectContent>
                  {optionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {expiryType === "leaps" && (
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-sm text-muted-foreground">
                LEAPS Expiration
              </Label>
              <Select value={leapsExpiry} onValueChange={setLeapsExpiry}>
                <SelectTrigger id="expiry" className="w-full bg-background/50">
                  <SelectValue placeholder="Select Expiration" />
                </SelectTrigger>
                <SelectContent>
                  {leapsExpiryDates
                    .filter(date => {
                      // Only show expiry dates that have options for this ticker
                      const hasOptions = mockOptionsData[selectedTicker]?.leaps?.some(
                        option => option.expiry === date.value
                      );
                      return hasOptions;
                    })
                    .map(date => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strike" className="text-sm text-muted-foreground">
                Strike Price ($)
              </Label>
              {expiryType === "leaps" ? (
                <Select value={strikePrice} onValueChange={value => setStrikePrice(value)}>
                  <SelectTrigger id="strike" className="w-full bg-background/50">
                    <SelectValue placeholder="Select Strike" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableStrikes().map(strike => (
                      <SelectItem key={strike} value={strike.toString()}>
                        ${strike}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="strike"
                  type="number"
                  value={strikePrice}
                  onChange={e => setStrikePrice(e.target.value)}
                  className="bg-background/50"
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm text-muted-foreground">
                Quantity (Contracts)
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
          
          {expiryType === "leaps" && selectedLeapsOption && (
            <div className="mt-2 p-3 rounded-lg bg-optionpulse-navy/50 border border-optionpulse-blue/20">
              <h4 className="text-sm font-medium mb-2">LEAPS Option Details</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Bid/Ask:</span>
                  <span className="text-xs">${selectedLeapsOption.bid} / ${selectedLeapsOption.ask}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Implied Volatility:</span>
                  <span className="text-xs">{selectedLeapsOption.iv}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Delta:</span>
                  <span className="text-xs">{selectedLeapsOption.delta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Theta:</span>
                  <span className="text-xs">{selectedLeapsOption.theta}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-optionpulse-blue">Tip:</span> LEAPS provide leverage for long-term market moves with lower capital requirements.
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <Button
              onClick={handleSimulateTrade}
              disabled={isSimulating}
              className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80 text-white transition-colors"
            >
              <Wallet size={18} className="mr-2" />
              {isSimulating ? "Processing..." : "Simulate Trade"}
            </Button>
          </div>
          
          {showTradeSummary && (
            <div
              className={cn(
                "mt-4 p-4 rounded-lg border bg-black/30 transition-all duration-300 animate-in fade-in",
                expiryType === "leaps" ? "border-emerald-500/30" : "border-optionpulse-blue/30"
              )}
            >
              <h3
                className={cn(
                  "text-sm font-semibold mb-2",
                  expiryType === "leaps" ? "text-emerald-400" : "text-optionpulse-blue"
                )}
              >
                Trade Summary
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instrument:</span>
                  <span className="font-medium">
                    {selectedTicker} ${strikePrice} {optionType}
                    {expiryType === "leaps" && ` (${leapsExpiry})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium:</span>
                  <span className="font-medium">
                    $
                    {expiryType === "leaps" && selectedLeapsOption
                      ? selectedLeapsOption.bid
                      : mockOptionsData[selectedTicker]?.standard?.bid || 0} per share
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contracts:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Greeks:</span>
                  <span className="font-medium">
                    Δ: {estimatedPnL.greeks.delta.toFixed(2)}, θ: {estimatedPnL.greeks.theta.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-muted/20">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span
                    className={cn(
                      "font-semibold",
                      expiryType === "leaps" ? "text-emerald-400" : "text-optionpulse-blue"
                    )}
                  >
                    ${calculateTotalCost().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-muted/20">
                  <span className="text-muted-foreground">Est. P&L:</span>
                  <span
                    className={cn(
                      "font-semibold",
                      estimatedPnL.value >= 0 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    ${estimatedPnL.value.toFixed(2)} ({estimatedPnL.percent.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-muted/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Trade has been logged to your journal</span>
                  <Link to="/education">
                    <Button variant="link" size="sm" className="h-7 px-0 text-xs">
                      Learn more about {expiryType === "leaps" ? "LEAPS strategies" : "options trading"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {tradeHistory.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-medium mb-2">Recent Trades</h3>
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {tradeHistory.slice(0, 3).map(trade => (
                  <div
                    key={trade.id}
                    className={cn(
                      "p-2 rounded-lg border text-xs",
                      trade.isLeaps ? "border-emerald-500/30 bg-emerald-500/5" : "border-optionpulse-blue/30 bg-optionpulse-blue/5"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium">{trade.ticker} ${trade.strike} {trade.type}</span>
                        {trade.isLeaps && (
                          <Badge className="ml-2 h-4 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                            LEAPS
                          </Badge>
                        )}
                      </div>
                      <span className="text-muted-foreground">{trade.timestamp}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Qty: {trade.quantity}, Exp: {trade.expiry}</span>
                      <span>${trade.cost.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default SimulatedTrading;
