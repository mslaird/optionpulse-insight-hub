
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AlertType } from "@/pages/Alerts";

// Define alert data structure
export interface AlertData {
  id: number;
  symbol: string;
  message: string;
  timestamp: string;
  type: AlertType;
  priority: "high" | "medium" | "low";
  sentiment?: number; // 0-100, higher is more bullish
  probability?: number; // 0-100, probability of being in-the-money
  expiryDate?: string;
}

// Mock data for AI-driven alerts
const mockAlertsData: AlertData[] = [
  {
    id: 1,
    symbol: "SPY",
    message: "IV spiked 5% - currently at 20%",
    timestamp: "Just now",
    type: "volatility",
    priority: "high"
  },
  {
    id: 2,
    symbol: "AAPL",
    message: "IV spiked 10% - good time to sell a put?",
    timestamp: "2h ago",
    type: "volatility",
    priority: "high"
  },
  {
    id: 3,
    symbol: "TSLA", 
    message: "Unusual options activity detected",
    timestamp: "4h ago",
    type: "volatility",
    priority: "medium"
  },
  {
    id: 4,
    symbol: "MSFT",
    message: "IV crushed 15% after earnings",
    timestamp: "8h ago",
    type: "volatility",
    priority: "low"
  },
  {
    id: 5,
    symbol: "AAPL",
    message: "$250 call, 80% ITM by 4/25/2025",
    timestamp: "1h ago",
    type: "prediction",
    priority: "high",
    sentiment: 75,
    probability: 80,
    expiryDate: "4/25/2025"
  },
  {
    id: 6,
    symbol: "SPY",
    message: "$500 call, 65% ITM by 5/15/2025",
    timestamp: "3h ago",
    type: "prediction",
    priority: "medium",
    sentiment: 60,
    probability: 65,
    expiryDate: "5/15/2025"
  },
  {
    id: 7,
    symbol: "QQQ",
    message: "$450 put, 72% ITM by 6/20/2025",
    timestamp: "12h ago",
    type: "prediction",
    priority: "medium",
    sentiment: 35,
    probability: 72,
    expiryDate: "6/20/2025"
  },
  {
    id: 8,
    symbol: "AAPL",
    message: "$220 call, 55% ITM by 7/18/2025",
    timestamp: "5h ago",
    type: "prediction",
    priority: "low",
    sentiment: 65,
    probability: 55,
    expiryDate: "7/18/2025"
  },
  {
    id: 9,
    symbol: "NVDA",
    message: "IV rank at 90th percentile - high premium selling opportunity",
    timestamp: "6h ago",
    type: "volatility",
    priority: "high"
  }
];

// Create context with default values
type AlertsContextType = {
  alerts: AlertData[];
  filterBySymbol: (symbol: string | null) => void;
  filterByExpiry: (expiry: string | null) => void;
  currentSymbolFilter: string | null;
  currentExpiryFilter: string | null;
  availableSymbols: string[];
  availableExpiries: string[];
};

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

// Provider component
export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertData[]>(mockAlertsData);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertData[]>(mockAlertsData);
  const [currentSymbolFilter, setCurrentSymbolFilter] = useState<string | null>(null);
  const [currentExpiryFilter, setCurrentExpiryFilter] = useState<string | null>(null);

  // Extract available symbols and expiries from data
  const availableSymbols = Array.from(new Set(mockAlertsData.map(alert => alert.symbol)));
  const availableExpiries = Array.from(
    new Set(
      mockAlertsData
        .filter(alert => alert.expiryDate)
        .map(alert => alert.expiryDate as string)
    )
  );

  // Filter alerts by symbol
  const filterBySymbol = (symbol: string | null) => {
    setCurrentSymbolFilter(symbol);
  };

  // Filter alerts by expiry date
  const filterByExpiry = (expiry: string | null) => {
    setCurrentExpiryFilter(expiry);
  };

  // Apply filters when they change
  useEffect(() => {
    let result = [...mockAlertsData];
    
    if (currentSymbolFilter) {
      result = result.filter(alert => alert.symbol === currentSymbolFilter);
    }
    
    if (currentExpiryFilter) {
      result = result.filter(alert => alert.expiryDate === currentExpiryFilter);
    }
    
    setFilteredAlerts(result);
  }, [currentSymbolFilter, currentExpiryFilter]);

  return (
    <AlertsContext.Provider 
      value={{ 
        alerts: filteredAlerts, 
        filterBySymbol, 
        filterByExpiry,
        currentSymbolFilter,
        currentExpiryFilter,
        availableSymbols,
        availableExpiries
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

// Custom hook for using the alerts context
export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
};
