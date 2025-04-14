
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";
import VolatilityNotification from "@/components/notifications/VolatilityNotification";

const Dashboard = () => {
  const [showAlert, setShowAlert] = useState(false);

  // Show the volatility alert after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 1000);

    return () => clearTimeout(timer);
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
        
        <VolatilityAlerts />

        {showAlert && (
          <VolatilityNotification
            symbol="SPY"
            currentVolatility={20}
            previousVolatility={15}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
