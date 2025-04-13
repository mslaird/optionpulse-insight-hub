
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sliders, BarChart3, Filter, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import OptionsFilter from "@/components/options/OptionsFilter";
import StockSelector from "@/components/options/StockSelector";

const OptionsChain = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [expirationDate, setExpirationDate] = useState("2025-05-16");
  const [optionType, setOptionType] = useState("all");
  const [showOpportunities, setShowOpportunities] = useState(true);

  // Mock data for stock price and change
  const stockPrice = 178.39;
  const stockChange = 1.25;
  const stockChangePercent = 0.71;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="text-optionpulse-blue" />
              Options Chain
            </h1>
            <p className="text-muted-foreground">Analyze options and discover trading opportunities</p>
          </div>
          <StockSelector selectedStock={selectedStock} onSelectStock={setSelectedStock} />
        </div>
        
        <div className="glass-card p-4 rounded-lg flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${stockPrice.toFixed(2)}</span>
            <span className={cn(
              "flex items-center gap-1 text-sm",
              stockChange > 0 ? "text-optionpulse-green" : "text-optionpulse-red"
            )}>
              {stockChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stockChange > 0 ? "+" : ""}{stockChange.toFixed(2)} ({stockChangePercent.toFixed(2)}%)
            </span>
          </div>
          
          <OptionsFilter 
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            optionType={optionType}
            setOptionType={setOptionType}
            showOpportunities={showOpportunities}
            setShowOpportunities={setShowOpportunities}
          />
        </div>
        
        <OptionsChainTable 
          stock={selectedStock} 
          expirationDate={expirationDate} 
          optionType={optionType}
          showOpportunities={showOpportunities}
        />
      </div>
    </Layout>
  );
};

// Options Chain Table Component
const OptionsChainTable = ({ 
  stock, 
  expirationDate, 
  optionType,
  showOpportunities
}: { 
  stock: string;
  expirationDate: string;
  optionType: string;
  showOpportunities: boolean;
}) => {
  // Mock data for options chain
  const callOptions = [
    { strike: 170, lastPrice: 12.85, bid: 12.70, ask: 12.95, change: 0.35, volume: 1243, openInterest: 5642, iv: 28.5, opportunity: "covered-call" },
    { strike: 175, lastPrice: 8.65, bid: 8.50, ask: 8.75, change: 0.20, volume: 2154, openInterest: 8934, iv: 27.8, opportunity: null },
    { strike: 180, lastPrice: 5.35, bid: 5.25, ask: 5.45, change: -0.15, volume: 3265, openInterest: 12456, iv: 26.4, opportunity: "covered-call" },
    { strike: 185, lastPrice: 3.15, bid: 3.05, ask: 3.25, change: -0.25, volume: 1876, openInterest: 9876, iv: 25.9, opportunity: null },
    { strike: 190, lastPrice: 1.75, bid: 1.65, ask: 1.80, change: -0.30, volume: 967, openInterest: 7653, iv: 24.7, opportunity: null },
  ];
  
  const putOptions = [
    { strike: 170, lastPrice: 4.25, bid: 4.15, ask: 4.35, change: -0.20, volume: 876, openInterest: 4532, iv: 29.2, opportunity: "cash-secured-put" },
    { strike: 175, lastPrice: 6.35, bid: 6.25, ask: 6.45, change: -0.15, volume: 1245, openInterest: 6543, iv: 28.5, opportunity: null },
    { strike: 180, lastPrice: 9.15, bid: 9.05, ask: 9.25, change: -0.10, volume: 2134, openInterest: 8765, iv: 27.9, opportunity: "cash-secured-put" },
    { strike: 185, lastPrice: 12.85, bid: 12.75, ask: 12.95, change: 0.25, volume: 1598, openInterest: 5432, iv: 29.5, opportunity: null },
    { strike: 190, lastPrice: 17.45, bid: 17.35, ask: 17.55, change: 0.40, volume: 763, openInterest: 3421, iv: 31.2, opportunity: null },
  ];
  
  // Filter options based on selected type
  let displayOptions = [];
  if (optionType === "calls" || optionType === "all") {
    displayOptions.push(...callOptions.map(option => ({ ...option, type: "CALL" })));
  }
  if (optionType === "puts" || optionType === "all") {
    displayOptions.push(...putOptions.map(option => ({ ...option, type: "PUT" })));
  }
  
  // Filter opportunities if selected
  if (showOpportunities) {
    displayOptions = displayOptions.filter(option => option.opportunity !== null);
  }
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Sliders size={18} className="text-optionpulse-blue" />
          {stock} Options - {expirationDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Strike</TableHead>
                <TableHead>Last</TableHead>
                <TableHead>Bid</TableHead>
                <TableHead>Ask</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Open Int</TableHead>
                <TableHead>IV</TableHead>
                <TableHead>Opportunity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayOptions.map((option, index) => (
                <TableRow 
                  key={`${option.type}-${option.strike}-${index}`}
                  className={cn(
                    option.opportunity && "bg-optionpulse-blue/5 hover:bg-optionpulse-blue/10"
                  )}
                >
                  <TableCell>
                    <Badge variant={option.type === "CALL" ? "default" : "outline"} className={option.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"}>
                      {option.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${option.strike}</TableCell>
                  <TableCell>${option.lastPrice.toFixed(2)}</TableCell>
                  <TableCell>${option.bid.toFixed(2)}</TableCell>
                  <TableCell>${option.ask.toFixed(2)}</TableCell>
                  <TableCell className={option.change > 0 ? "text-optionpulse-green" : "text-optionpulse-red"}>
                    {option.change > 0 ? "+" : ""}{option.change.toFixed(2)}
                  </TableCell>
                  <TableCell>{option.volume.toLocaleString()}</TableCell>
                  <TableCell>{option.openInterest.toLocaleString()}</TableCell>
                  <TableCell>{option.iv.toFixed(1)}%</TableCell>
                  <TableCell>
                    {option.opportunity === "covered-call" && (
                      <Badge variant="outline" className="border-optionpulse-green text-optionpulse-green">
                        Covered Call
                      </Badge>
                    )}
                    {option.opportunity === "cash-secured-put" && (
                      <Badge variant="outline" className="border-optionpulse-blue text-optionpulse-blue">
                        Cash-Secured Put
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsChain;
