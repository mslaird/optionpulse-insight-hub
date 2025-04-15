
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";
import VolatilityNotification from "@/components/notifications/VolatilityNotification";
import SentimentNotification from "@/components/notifications/SentimentNotification";
import SimulatedTrading from "@/components/trading/SimulatedTrading";
import StaticAlertWidget from "@/components/dashboard/StaticAlertWidget";
import AIAlertsWidget from "@/components/dashboard/AIAlertsWidget";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import explanations from "@/data/explanations";
import { AIAlertsProvider } from "@/contexts/AIAlertsContext";

// Create strategy explanations object
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
  }
};

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
    <AIAlertsProvider>
      <Layout>
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor market data and options opportunities</p>
          </div>
          
          <MarketOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <OptionsChainPreview />
              <div className="absolute top-4 right-4">
                <ExplanationTooltip 
                  title={explanations.greeks.title}
                  content={explanations.greeks.content}
                />
              </div>
            </div>
            <div className="relative">
              <GreeksChart />
              <div className="absolute top-4 right-4">
                <ExplanationTooltip 
                  title={explanations.greeks.title}
                  content={explanations.greeks.content}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <AIAlertsWidget />
              <div className="absolute top-4 right-4">
                <ExplanationTooltip 
                  title={explanations.sentiment.title}
                  content={explanations.sentiment.content}
                />
              </div>
            </div>
            <div className="relative">
              <SimulatedTrading />
              <div className="absolute top-4 right-4 flex space-x-1">
                <ExplanationTooltip 
                  title={strategyExplanations.coveredCall.title}
                  content={strategyExplanations.coveredCall.content}
                  iconClass="text-[#00FF7F]"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <VolatilityAlerts />
              <div className="absolute top-4 right-4">
                <ExplanationTooltip 
                  title={explanations.volatility.title}
                  content={explanations.volatility.content}
                />
              </div>
            </div>
            <div className="relative">
              <StaticAlertWidget />
              <div className="absolute top-4 right-4">
                <ExplanationTooltip 
                  title={explanations.sentiment.title}
                  content={explanations.sentiment.content}
                />
              </div>
            </div>
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
    </AIAlertsProvider>
  );
};

export default Dashboard;
