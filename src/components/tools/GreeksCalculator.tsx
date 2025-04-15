
import React, { useState } from "react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Mock data for options contracts
const mockContracts = {
  AAPL: [
    { expiry: "04/25/2025", strike: 225, callDelta: 0.65, callGamma: 0.032, callTheta: -0.015, callVega: 0.24, putDelta: -0.35, putGamma: 0.032, putTheta: -0.012, putVega: 0.24 },
    { expiry: "04/25/2025", strike: 250, callDelta: 0.51, callGamma: 0.035, callTheta: -0.018, callVega: 0.28, putDelta: -0.49, putGamma: 0.035, putTheta: -0.015, putVega: 0.28 },
    { expiry: "04/25/2025", strike: 275, callDelta: 0.33, callGamma: 0.028, callTheta: -0.016, callVega: 0.25, putDelta: -0.67, putGamma: 0.028, putTheta: -0.014, putVega: 0.25 },
    { expiry: "05/16/2025", strike: 225, callDelta: 0.68, callGamma: 0.025, callTheta: -0.012, callVega: 0.31, putDelta: -0.32, putGamma: 0.025, putTheta: -0.009, putVega: 0.31 },
    { expiry: "05/16/2025", strike: 250, callDelta: 0.55, callGamma: 0.030, callTheta: -0.015, callVega: 0.35, putDelta: -0.45, putGamma: 0.030, putTheta: -0.013, putVega: 0.35 },
    { expiry: "05/16/2025", strike: 275, callDelta: 0.37, callGamma: 0.027, callTheta: -0.013, callVega: 0.32, putDelta: -0.63, putGamma: 0.027, putTheta: -0.011, putVega: 0.32 },
    { expiry: "05/30/2025", strike: 225, callDelta: 0.70, callGamma: 0.021, callTheta: -0.010, callVega: 0.36, putDelta: -0.30, putGamma: 0.021, putTheta: -0.007, putVega: 0.36 },
    { expiry: "05/30/2025", strike: 250, callDelta: 0.58, callGamma: 0.026, callTheta: -0.013, callVega: 0.39, putDelta: -0.42, putGamma: 0.026, putTheta: -0.010, putVega: 0.39 },
    { expiry: "05/30/2025", strike: 275, callDelta: 0.39, callGamma: 0.024, callTheta: -0.011, callVega: 0.37, putDelta: -0.61, putGamma: 0.024, putTheta: -0.009, putVega: 0.37 }
  ],
  SPY: [
    { expiry: "04/25/2025", strike: 450, callDelta: 0.62, callGamma: 0.029, callTheta: -0.017, callVega: 0.26, putDelta: -0.38, putGamma: 0.029, putTheta: -0.014, putVega: 0.26 },
    { expiry: "04/25/2025", strike: 475, callDelta: 0.49, callGamma: 0.033, callTheta: -0.019, callVega: 0.29, putDelta: -0.51, putGamma: 0.033, putTheta: -0.016, putVega: 0.29 },
    { expiry: "04/25/2025", strike: 500, callDelta: 0.31, callGamma: 0.027, callTheta: -0.017, callVega: 0.24, putDelta: -0.69, putGamma: 0.027, putTheta: -0.015, putVega: 0.24 },
    { expiry: "05/16/2025", strike: 450, callDelta: 0.65, callGamma: 0.024, callTheta: -0.014, callVega: 0.33, putDelta: -0.35, putGamma: 0.024, putTheta: -0.011, putVega: 0.33 },
    { expiry: "05/16/2025", strike: 475, callDelta: 0.53, callGamma: 0.028, callTheta: -0.016, callVega: 0.36, putDelta: -0.47, putGamma: 0.028, putTheta: -0.014, putVega: 0.36 },
    { expiry: "05/16/2025", strike: 500, callDelta: 0.35, callGamma: 0.025, callTheta: -0.014, callVega: 0.33, putDelta: -0.65, putGamma: 0.025, putTheta: -0.012, putVega: 0.33 }
  ],
  QQQ: [
    { expiry: "04/25/2025", strike: 380, callDelta: 0.63, callGamma: 0.030, callTheta: -0.016, callVega: 0.25, putDelta: -0.37, putGamma: 0.030, putTheta: -0.013, putVega: 0.25 },
    { expiry: "04/25/2025", strike: 400, callDelta: 0.50, callGamma: 0.034, callTheta: -0.018, callVega: 0.30, putDelta: -0.50, putGamma: 0.034, putTheta: -0.015, putVega: 0.30 },
    { expiry: "04/25/2025", strike: 420, callDelta: 0.32, callGamma: 0.029, callTheta: -0.016, callVega: 0.26, putDelta: -0.68, putGamma: 0.029, putTheta: -0.013, putVega: 0.26 },
    { expiry: "05/16/2025", strike: 380, callDelta: 0.67, callGamma: 0.026, callTheta: -0.013, callVega: 0.32, putDelta: -0.33, putGamma: 0.026, putTheta: -0.010, putVega: 0.32 },
    { expiry: "05/16/2025", strike: 400, callDelta: 0.54, callGamma: 0.029, callTheta: -0.015, callVega: 0.37, putDelta: -0.46, putGamma: 0.029, putTheta: -0.012, putVega: 0.37 },
    { expiry: "05/16/2025", strike: 420, callDelta: 0.36, callGamma: 0.026, callTheta: -0.013, callVega: 0.34, putDelta: -0.64, putGamma: 0.026, putTheta: -0.010, putVega: 0.34 }
  ]
};

const GreeksCalculator = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [expiry, setExpiry] = useState("04/25/2025");
  const [strike, setStrike] = useState(250);
  const [optionType, setOptionType] = useState("call");
  const [greeksData, setGreeksData] = useState<any>(null);

  const handleCalculate = () => {
    const availableStrikes = mockContracts[ticker as keyof typeof mockContracts]
      .filter(contract => contract.expiry === expiry)
      .map(contract => contract.strike);

    // Find the closest strike price
    const closestStrike = availableStrikes.reduce((prev, curr) => {
      return Math.abs(curr - strike) < Math.abs(prev - strike) ? curr : prev;
    }, availableStrikes[0]);

    const contract = mockContracts[ticker as keyof typeof mockContracts]
      .find(c => c.expiry === expiry && c.strike === closestStrike);

    if (contract) {
      if (strike !== closestStrike) {
        toast({
          title: "Strike price adjusted",
          description: `Using closest available strike: $${closestStrike}`,
          variant: "default"
        });
        setStrike(closestStrike);
      }
      
      setGreeksData({
        ticker,
        strike: closestStrike,
        expiry,
        optionType,
        delta: optionType === "call" ? contract.callDelta : contract.putDelta,
        gamma: optionType === "call" ? contract.callGamma : contract.putGamma,
        theta: optionType === "call" ? contract.callTheta : contract.putTheta,
        vega: optionType === "call" ? contract.callVega : contract.putVega,
        currentPrice: ticker === "AAPL" ? 250 : ticker === "SPY" ? 475 : 400,
        iv: 0.25 + Math.random() * 0.15,
        daysToExpiry: Math.round((new Date(expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      });
    }
  };

  const getAvailableExpirations = () => {
    return Array.from(new Set(mockContracts[ticker as keyof typeof mockContracts].map(c => c.expiry)));
  };

  const getAvailableStrikes = () => {
    return Array.from(new Set(
      mockContracts[ticker as keyof typeof mockContracts]
        .filter(c => c.expiry === expiry)
        .map(c => c.strike)
    ));
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker">Ticker</Label>
          <Select
            value={ticker}
            onValueChange={(value) => {
              setTicker(value);
              setExpiry(getAvailableExpirations()[0]);
              setStrike(getAvailableStrikes()[0]);
            }}
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
          <Label htmlFor="expiry">Expiration Date</Label>
          <Select 
            value={expiry}
            onValueChange={(value) => {
              setExpiry(value);
              setStrike(
                mockContracts[ticker as keyof typeof mockContracts]
                  .filter(c => c.expiry === value)[0].strike
              );
            }}
          >
            <SelectTrigger id="expiry">
              <SelectValue placeholder="Select expiry" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableExpirations().map(exp => (
                <SelectItem key={exp} value={exp}>{exp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="strike">Strike Price ($)</Label>
          <Select 
            value={strike.toString()}
            onValueChange={(value) => setStrike(parseInt(value))}
          >
            <SelectTrigger id="strike">
              <SelectValue placeholder="Select strike" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableStrikes().map(strike => (
                <SelectItem key={strike} value={strike.toString()}>${strike}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="optionType">Option Type</Label>
          <Select
            value={optionType}
            onValueChange={(value) => setOptionType(value)}
          >
            <SelectTrigger id="optionType">
              <SelectValue placeholder="Select option type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="put">Put</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleCalculate} className="w-full sm:w-auto">
        Calculate Greeks
      </Button>

      {greeksData && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="text-lg font-semibold mb-4">
                {ticker} {optionType === "call" ? "Call" : "Put"} Option (${strike} Strike, Expiry: {expiry})
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-optionpulse-navy p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                  <div className="text-xl font-bold">${greeksData.currentPrice.toFixed(2)}</div>
                </div>
                <div className="bg-optionpulse-navy p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Implied Volatility</div>
                  <div className="text-xl font-bold">{(greeksData.iv * 100).toFixed(2)}%</div>
                </div>
                <div className="bg-optionpulse-navy p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Days to Expiry</div>
                  <div className="text-xl font-bold">{greeksData.daysToExpiry}</div>
                </div>
                <div className="bg-optionpulse-navy p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Risk-Free Rate</div>
                  <div className="text-xl font-bold">5.00%</div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Greek</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Delta</TableCell>
                    <TableCell className="font-mono">{greeksData.delta.toFixed(4)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {optionType === "call" ? "Positive" : "Negative"} change in option price for a $1 increase in stock price
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gamma</TableCell>
                    <TableCell className="font-mono">{greeksData.gamma.toFixed(4)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      Rate of change of delta with respect to stock price
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Theta</TableCell>
                    <TableCell className="font-mono">{greeksData.theta.toFixed(4)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      Rate of option value decay per day
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vega</TableCell>
                    <TableCell className="font-mono">{greeksData.vega.toFixed(4)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      Option price sensitivity to a 1% change in implied volatility
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GreeksCalculator;
