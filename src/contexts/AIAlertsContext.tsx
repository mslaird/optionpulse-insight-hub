
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AIAlert, mockAIAlerts, mockLeapsAlerts, generateNewAlerts, isLeapsExpiry } from '@/data/mockAlertData';

interface AIAlertsContextType {
  alerts: AIAlert[];
  symbolFilter: string;
  expiryFilter: string;
  probabilityFilter: number;
  showLeapsOnly: boolean;
  setSymbolFilter: (symbol: string) => void;
  setExpiryFilter: (expiry: string) => void;
  setProbabilityFilter: (probability: number) => void;
  setShowLeapsOnly: (show: boolean) => void;
  refreshAlerts: () => void;
  filteredAlerts: AIAlert[];
  dashboardLeapsAlerts: AIAlert[];
}

const AIAlertsContext = createContext<AIAlertsContextType | undefined>(undefined);

export const useAIAlerts = () => {
  const context = useContext(AIAlertsContext);
  if (!context) {
    throw new Error('useAIAlerts must be used within an AIAlertsProvider');
  }
  return context;
};

interface AIAlertsProviderProps {
  children: ReactNode;
}

export const AIAlertsProvider = ({ children }: AIAlertsProviderProps) => {
  const [alerts, setAlerts] = useState<AIAlert[]>([...mockAIAlerts, ...mockLeapsAlerts]);
  const [symbolFilter, setSymbolFilter] = useState<string>('all');
  const [expiryFilter, setExpiryFilter] = useState<string>('all');
  const [probabilityFilter, setProbabilityFilter] = useState<number>(0);
  const [showLeapsOnly, setShowLeapsOnly] = useState<boolean>(false);

  // Filter alerts based on user selections
  const filteredAlerts = alerts.filter(alert => {
    const matchesSymbol = symbolFilter === 'all' || alert.symbol === symbolFilter;
    const matchesExpiry = expiryFilter === 'all' || alert.expiryDate === expiryFilter;
    const matchesProbability = alert.itmProbability >= probabilityFilter;
    const matchesLeaps = showLeapsOnly ? alert.isLeaps === true : true;
    
    return matchesSymbol && matchesExpiry && matchesProbability && matchesLeaps;
  });

  // Get only LEAPS alerts for the dashboard (limit to 2)
  const dashboardLeapsAlerts = alerts
    .filter(alert => alert.isLeaps === true)
    .sort((a, b) => b.itmProbability - a.itmProbability)
    .slice(0, 2);

  // Simulate refreshing data
  const refreshAlerts = () => {
    const newAlerts = generateNewAlerts();
    // Add new alerts to the beginning and limit total to avoid too many
    setAlerts(prevAlerts => {
      const combinedAlerts = [...newAlerts, ...prevAlerts];
      // Remove the 'isNew' flag from previous alerts
      const updatedAlerts = combinedAlerts.map((alert, index) => {
        if (index >= newAlerts.length && alert.isNew) {
          return { ...alert, isNew: false };
        }
        return alert;
      });
      return updatedAlerts.slice(0, 20); // Increased to accommodate LEAPS
    });
  };

  // Clear 'isNew' flag after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => ({ ...alert, isNew: false }))
      );
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [alerts]);

  return (
    <AIAlertsContext.Provider
      value={{
        alerts,
        symbolFilter,
        expiryFilter,
        probabilityFilter,
        showLeapsOnly,
        setSymbolFilter,
        setExpiryFilter,
        setProbabilityFilter,
        setShowLeapsOnly,
        refreshAlerts,
        filteredAlerts,
        dashboardLeapsAlerts
      }}
    >
      {children}
    </AIAlertsContext.Provider>
  );
};
