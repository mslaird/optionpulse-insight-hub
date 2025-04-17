
import { useState, useEffect } from "react";

// Mock data type definition
interface OptionData {
  id: number;
  ticker: string;
  strike: number;
  expiry: string;
  iv: number;
  callPrice: number;
  putPrice: number;
  ivPercentile: number;
  recentChange: number;
  sentiment: string;
}

// Mock data for high-volatility options
const mockHighVolatilityOptions: OptionData[] = [
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

export const useVolatilityScanner = () => {
  const [filteredData, setFilteredData] = useState<OptionData[]>(mockHighVolatilityOptions);
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

  // Get unique expiry dates for the filter dropdown
  const uniqueExpiryDates = Array.from(
    new Set(mockHighVolatilityOptions.map(option => option.expiry))
  );

  // Apply filters and sorting
  useEffect(() => {
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

  return {
    filteredData,
    tickerFilter,
    setTickerFilter,
    expiryFilter,
    setExpiryFilter,
    minIVFilter,
    setMinIVFilter,
    sortColumn,
    sortDirection,
    uniqueExpiryDates,
    handleSort,
    handleRefresh
  };
};
