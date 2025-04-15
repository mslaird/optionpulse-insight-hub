
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AIAlert, mockAIAlerts, generateNewAlerts } from '@/data/mockAlertData';

interface AIAlertsContextType {
  alerts: AIAlert[];
  symbolFilter: string;
  expiryFilter: string;
  probabilityFilter: number;
  setSymbolFilter: (symbol: string) => void;
  setExpiryFilter: (expiry: string) => void;
  setProbabilityFilter: (probability: number) => void;
  refreshAlerts: () => void;
  filteredAlerts: AIAlert[];
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
  const [alerts, setAlerts] = useState<AIAlert[]>(mockAIAlerts);
  const [symbolFilter, setSymbolFilter] = useState<string>('all');
  const [expiryFilter, setExpiryFilter] = useState<string>('all');
  const [probabilityFilter, setProbabilityFilter] = useState<number>(0);

  // Filter alerts based on user selections
  const filteredAlerts = alerts.filter(alert => {
    const matchesSymbol = symbolFilter === 'all' || alert.symbol === symbolFilter;
    const matchesExpiry = expiryFilter === 'all' || alert.expiryDate === expiryFilter;
    const matchesProbability = alert.itmProbability >= probabilityFilter;
    
    return matchesSymbol && matchesExpiry && matchesProbability;
  });

  // Simulate refreshing data
  const refreshAlerts = () => {
    const newAlerts = generateNewAlerts();
    // Add new alerts to the beginning and limit total to 15
    setAlerts(prevAlerts => {
      const combinedAlerts = [...newAlerts, ...prevAlerts];
      // Remove the 'isNew' flag from previous alerts
      const updatedAlerts = combinedAlerts.map((alert, index) => {
        if (index >= newAlerts.length && alert.isNew) {
          return { ...alert, isNew: false };
        }
        return alert;
      });
      return updatedAlerts.slice(0, 15);
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
        setSymbolFilter,
        setExpiryFilter,
        setProbabilityFilter,
        refreshAlerts,
        filteredAlerts
      }}
    >
      {children}
    </AIAlertsContext.Provider>
  );
};
