
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  RefreshCw
} from "lucide-react";

// Mock data for high-volatility options
const mockHighVolatilityOptions = [
  { id: 1, ticker: "AAPL", strike: 250, expiry: "04/25/2025", iv: 0.32, callPrice: 15.75, putPrice: 12.40, ivPercentile: 85, recentChange: 0.05, sentiment: "bullish" },
  { id: 2, ticker: "AAPL", strike: 275, expiry: "04/25/2025", iv: 0.35, callPrice: 8.20, putPrice: 18.60, ivPercentile: 88, recentChange: 0.07, sentiment: "bearish" },
  { id: 3, ticker: "AAPL", strike: 225, expiry: "05/16/2025", iv: 0.29, callPrice: 23.40, putPrice: 8.50, ivPercentile: 75, recentChange: 0.03, sentiment: "bullish" },
  { id: 4, ticker: "SPY", strike: 450, expiry: "04/25/2025", iv: 0.28, callPrice: 36.20, putPrice: 10.50, ivPercentile: 82, recentChange: 0.04, sentiment: "bullish" },
  { id: 5, ticker: "SPY", strike: 475, expiry: "04/25/2025", iv: 0.31, callPrice: 19.80, putPrice: 17.30, ivPercentile: 86, recentChange: 0.06, sentiment: "neutral" },
  { id: 6, ticker: "SPY", strike: 500, expiry: "05/16/2025", iv: 0.33, callPrice: 14.60, putPrice: 28.90, ivPercentile: 90, recentChange: 0.08, sentiment: "bearish" },
  { id: 7, ticker: "QQQ", strike: 380, expiry: "04/25/2025", iv: 0.34, callPrice: 25.10, putPrice: 12.70, ivPercentile: 89, recentChange: 0.06, sentiment: "bullish" },
  { id: 8, ticker: "QQQ", strike: 400, expiry: "04/25/2025", iv: 0.37, callPrice: 15.90, putPrice: 22.50, ivPercentile: 92, recentChange: 0.09, sentiment: "bearish" },
  { id: 9, ticker: "QQQ", strike: 420, expiry: "05/16/2025", iv: 0.35, callPrice: 10.30, putPrice: 27.80, ivPercentile: 87, recentChange: 0.07, sentiment: "bearish" },
  { id: 10, ticker: "AAPL", strike: 250, expiry: "05/30/2025", iv: 0.30, callPrice: 18.40, putPrice: 14.90, ivPercentile: 80, recentChange: 0.04, sentiment: "neutral" },
  { id: 11, ticker: "SPY", strike: 475, expiry: "05/30/2025", iv: 0.29, callPrice: 24.70, putPrice: 20.30, ivPercentile: 78, recentChange: 0.03, sentiment: "neutral" },
  { id: 12, ticker: "QQQ", strike: 400, expiry: "05/30/2025", iv: 0.32, callPrice: 20.10, putPrice: 18.80, ivPercentile: 83, recentChange: 0.05, sentiment: "bullish" },
];

const VolatilityScanner = () => {
  const [filteredData, setFilteredData] = useState(mockHighVolatilityOptions);
  const [tickerFilter, setTickerFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [minIVFilter, setMinIVFilter] = useState(25);
  const [sortColumn, setSortColumn] = useState("iv");
  const [sortDirection, setSortDirection] = useState("desc");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleRefresh = () => {
    // Simulate refreshing data by adding random variation to IV values
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Apply filters and sorting
  React.useEffect(() => {
    let result = [...mockHighVolatilityOptions];
    
    // Apply ticker filter
    if (tickerFilter !== "all") {
      result = result.filter(option => option.ticker === tickerFilter);
    }
    
    // Apply expiry filter
    if (expiryFilter !== "all") {
      result = result.filter(option => option.expiry === expiryFilter);
    }
    
    // Apply minimum IV filter
    result = result.filter(option => option.iv * 100 >= minIVFilter);
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortColumn === "iv") {
        comparison = a.iv - b.iv;
      } else if (sortColumn === "ivPercentile") {
        comparison = a.ivPercentile - b.ivPercentile;
      } else if (sortColumn === "ticker") {
        comparison = a.ticker.localeCompare(b.ticker);
      } else if (sortColumn === "strike") {
        comparison = a.strike - b.strike;
      } else if (sortColumn === "expiry") {
        comparison = new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
      } else if (sortColumn === "recentChange") {
        comparison = a.recentChange - b.recentChange;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredData(result);
  }, [tickerFilter, expiryFilter, minIVFilter, sortColumn, sortDirection, refreshKey]);

  // Get unique expiry dates for the filter dropdown
  const uniqueExpiryDates = Array.from(new Set(mockHighVolatilityOptions.map(option => option.expiry)));

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker-filter">Filter by Ticker</Label>
          <Select value={tickerFilter} onValueChange={setTickerFilter}>
            <SelectTrigger id="ticker-filter">
              <SelectValue placeholder="All Tickers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickers</SelectItem>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="SPY">SPY</SelectItem>
              <SelectItem value="QQQ">QQQ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expiry-filter">Filter by Expiry</Label>
          <Select value={expiryFilter} onValueChange={setExpiryFilter}>
            <SelectTrigger id="expiry-filter">
              <SelectValue placeholder="All Expiries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expiries</SelectItem>
              {uniqueExpiryDates.map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="min-iv">Minimum IV (%)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="min-iv"
              type="number"
              min="0"
              max="100"
              value={minIVFilter}
              onChange={(e) => setMinIVFilter(parseInt(e.target.value))}
            />
            <span className="font-medium">%</span>
          </div>
        </div>
        
        <div className="flex items-end">
          <Button onClick={handleRefresh} className="w-full flex items-center justify-center gap-2">
            <RefreshCw size={16} />
            <span>Refresh Data</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "ticker" ? "text-primary" : ""}`}
                onClick={() => handleSort("ticker")}
              >
                Ticker
                {sortColumn === "ticker" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "strike" ? "text-primary" : ""}`}
                onClick={() => handleSort("strike")}
              >
                Strike
                {sortColumn === "strike" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "expiry" ? "text-primary" : ""}`}
                onClick={() => handleSort("expiry")}
              >
                Expiry
                {sortColumn === "expiry" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "iv" ? "text-primary" : ""}`}
                onClick={() => handleSort("iv")}
              >
                IV
                {sortColumn === "iv" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "ivPercentile" ? "text-primary" : ""}`}
                onClick={() => handleSort("ivPercentile")}
              >
                IV Percentile
                {sortColumn === "ivPercentile" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead>Call Price</TableHead>
              <TableHead>Put Price</TableHead>
              <TableHead 
                className={`cursor-pointer ${sortColumn === "recentChange" ? "text-primary" : ""}`}
                onClick={() => handleSort("recentChange")}
              >
                Recent IV Change
                {sortColumn === "recentChange" && (
                  <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </TableHead>
              <TableHead>Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No options found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.ticker}</TableCell>
                  <TableCell>${option.strike}</TableCell>
                  <TableCell>{option.expiry}</TableCell>
                  <TableCell>
                    <Badge className={option.iv >= 0.32 ? "bg-optionpulse-blue" : "bg-muted"}>
                      {(option.iv * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={option.ivPercentile >= 85 ? "border-optionpulse-red text-optionpulse-red" : ""}>
                      {option.ivPercentile}%
                    </Badge>
                  </TableCell>
                  <TableCell>${option.callPrice.toFixed(2)}</TableCell>
                  <TableCell>${option.putPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={option.recentChange > 0.05 ? "text-optionpulse-red" : "text-white"}>
                        +{(option.recentChange * 100).toFixed(1)}%
                      </span>
                      {option.recentChange >= 0.06 && <Sparkles size={14} className="ml-1 text-optionpulse-red" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    {option.sentiment === "bullish" ? (
                      <div className="flex items-center text-optionpulse-green">
                        <ArrowUpRight size={16} className="mr-1" />
                        Bullish
                      </div>
                    ) : option.sentiment === "bearish" ? (
                      <div className="flex items-center text-optionpulse-red">
                        <ArrowDownRight size={16} className="mr-1" />
                        Bearish
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Neutral</div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VolatilityScanner;
