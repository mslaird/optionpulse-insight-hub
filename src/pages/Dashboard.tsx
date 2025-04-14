import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";
import SentimentAnalysis from "@/components/dashboard/SentimentAnalysis";
import SimulatedTrading from "@/components/dashboard/SimulatedTrading";
import { useToast } from "@/hooks/use-toast";
import { DraggableWidget } from "@/components/dashboard/DraggableWidget";
import { useDraggableDashboard } from "@/hooks/use-draggable-dashboard";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { toast } = useToast();
  const { widgets, moveWidget, toggleWidgetVisibility } = useDraggableDashboard();
  const isMobileDevice = useIsMobile();
  const backendOptions = isMobile ? { enableMouseEvents: true } : {};
  
  useEffect(() => {
    // Show a welcome toast on first load
    toast({
      title: "Welcome to OptionPulse",
      description: "Drag and drop widgets to customize your dashboard",
    });
  }, [toast]);

  // Render the appropriate component based on widget type
  const renderWidget = (widgetType: string) => {
    switch (widgetType) {
      case 'market-overview':
        return <MarketOverview />;
      case 'options-chain-preview':
        return <OptionsChainPreview />;
      case 'greeks-chart':
        return <GreeksChart />;
      case 'volatility-alerts':
        return <VolatilityAlerts />;
      case 'sentiment-analysis':
        return <SentimentAnalysis />;
      default:
        return null;
    }
  };

  // Only show widgets that are marked as visible
  const visibleWidgets = widgets.filter(widget => widget.visible);

  return (
    <Layout>
      <Toaster />
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor market data and options opportunities</p>
        </div>
        
        <SimulatedTrading />
        
        <DndProvider 
          backend={isMobile ? TouchBackend : HTML5Backend}
          options={backendOptions}
        >
          <div className="space-y-6">
            {isMobileDevice && (
              <p className="text-xs text-muted-foreground italic">
                Drag and drop the widgets to reorder them
              </p>
            )}
            
            {visibleWidgets.map((widget, index) => (
              <DraggableWidget
                key={widget.id}
                widget={widget}
                index={index}
                moveWidget={moveWidget}
                toggleVisibility={toggleWidgetVisibility}
              >
                {renderWidget(widget.type)}
              </DraggableWidget>
            ))}
          </div>
        </DndProvider>
      </div>
    </Layout>
  );
};

export default Dashboard;
