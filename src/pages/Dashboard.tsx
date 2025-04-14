
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";
import VolatilityNotification from "@/components/notifications/VolatilityNotification";
import SentimentNotification from "@/components/notifications/SentimentNotification";
import SimulatedTrading from "@/components/trading/SimulatedTrading";
import DraggableWidget from "@/components/dashboard/DraggableWidget";
import OptionsChainWidget from "@/components/widgets/OptionsChainWidget";
import SentimentAlertWidget from "@/components/widgets/SentimentAlertWidget";
import { Info } from "lucide-react";
import { Responsive, WidthProvider, Layout as GridLayout } from "react-grid-layout";
import { useIsMobile } from "@/hooks/use-mobile";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const [showVolatilityAlert, setShowVolatilityAlert] = useState(false);
  const [showSentimentAlert, setShowSentimentAlert] = useState(false);
  const [isDragDropSupported, setIsDragDropSupported] = useState(true);
  const isMobile = useIsMobile();
  
  const layouts = {
    lg: [
      { i: "options-chain", x: 0, y: 0, w: 1, h: 2 },
      { i: "sentiment-alert", x: 1, y: 0, w: 1, h: 2 },
    ],
    md: [
      { i: "options-chain", x: 0, y: 0, w: 1, h: 2 },
      { i: "sentiment-alert", x: 1, y: 0, w: 1, h: 2 },
    ],
    sm: [
      { i: "options-chain", x: 0, y: 0, w: 1, h: 2 },
      { i: "sentiment-alert", x: 0, y: 2, w: 1, h: 2 },
    ],
    xs: [
      { i: "options-chain", x: 0, y: 0, w: 1, h: 2 },
      { i: "sentiment-alert", x: 0, y: 2, w: 1, h: 2 },
    ],
  };

  useEffect(() => {
    const volatilityTimer = setTimeout(() => {
      setShowVolatilityAlert(true);
    }, 1000);
    
    const sentimentTimer = setTimeout(() => {
      setShowSentimentAlert(true);
    }, 3000);  // Show sentiment alert after volatility alert

    try {
      const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const div = document.createElement('div');
      div.setAttribute('draggable', 'true');
      
      setIsDragDropSupported(isTouchSupported && typeof div.ondragstart !== 'undefined');
    } catch (error) {
      console.error("Error while checking drag-drop support:", error);
      setIsDragDropSupported(false);
    }

    return () => {
      clearTimeout(volatilityTimer);
      clearTimeout(sentimentTimer);
    };
  }, []);

  const handleLayoutChange = (currentLayout: GridLayout[], allLayouts: any) => {
    console.log("Layout changed:", currentLayout);
  };

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

        <div>
          <h2 className="text-xl font-bold mb-4">Custom Widgets</h2>
          {!isDragDropSupported && (
            <div className="mb-4 p-3 rounded-md bg-optionpulse-blue/10 border border-optionpulse-blue/30 flex items-center gap-2">
              <Info size={18} className="text-optionpulse-blue" />
              <p className="text-sm">Drag-and-drop not available in this version.</p>
            </div>
          )}

          {isDragDropSupported ? (
            <ResponsiveGridLayout
              className="layout"
              layouts={layouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
              cols={{ lg: 2, md: 2, sm: 1, xs: 1 }}
              rowHeight={150}
              margin={[16, 16]}
              onLayoutChange={handleLayoutChange}
              draggableHandle=".drag-handle"
              isDraggable={!isMobile || isDragDropSupported}
              isResizable={false}
            >
              <div key="options-chain">
                <DraggableWidget title="AAPL Options Chain">
                  <OptionsChainWidget />
                </DraggableWidget>
              </div>
              <div key="sentiment-alert">
                <DraggableWidget title="Market Sentiment">
                  <SentimentAlertWidget />
                </DraggableWidget>
              </div>
            </ResponsiveGridLayout>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DraggableWidget title="AAPL Options Chain" isDraggable={false}>
                <OptionsChainWidget />
              </DraggableWidget>
              <DraggableWidget title="Market Sentiment" isDraggable={false}>
                <SentimentAlertWidget />
              </DraggableWidget>
            </div>
          )}
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
