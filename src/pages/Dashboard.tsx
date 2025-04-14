
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";
import VolatilityNotification from "@/components/notifications/VolatilityNotification";
import SentimentNotification from "@/components/notifications/SentimentNotification";
import SimulatedTrading from "@/components/trading/SimulatedTrading";
import StaticOptionsWidget from "@/components/dashboard/StaticOptionsWidget";

const Dashboard = () => {
  const [showVolatilityAlert, setShowVolatilityAlert] = useState(false);
  const [showSentimentAlert, setShowSentimentAlert] = useState(false);

  // Show the alerts after short delays
  useEffect(() => {
    const volatilityTimer = setTimeout(() => {
      setShowVolatilityAlert(true);
    }, 1000);
    
    const sentimentTimer = setTimeout(() => {
      setShowSentimentAlert(true);
    }, 3000);  // Show sentiment alert after volatility alert

    return () => {
      clearTimeout(volatilityTimer);
      clearTimeout(sentimentTimer);
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor market data and options opportunities</p>
        </div>
        
        <MarketOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OptionsChainPreview />
          <GreeksChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolatilityAlerts />
          <SimulatedTrading />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <StaticOptionsWidget />
        </div>

        {showVolatilityAlert && (
          <VolatilityNotification
            symbol="SPY"
            currentVolatility={20}
            previousVolatility={15}
            onClose={() => setShowVolatilityAlert(false)}
          />
        )}
        
        {showSentimentAlert && (
          <SentimentNotification
            symbol="AAPL"
            sentiment={75}
            instrumentType="calls"
            onClose={() => setShowSentimentAlert(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
