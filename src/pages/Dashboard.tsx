
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
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

// Define types for the dynamic imports
type HTML5BackendType = typeof import('react-dnd-html5-backend').HTML5Backend;
type TouchBackendType = typeof import('react-dnd-touch-backend').TouchBackend;

const Dashboard = () => {
  const { toast } = useToast();
  const { widgets, moveWidget, toggleWidgetVisibility } = useDraggableDashboard();
  const isMobileDevice = useIsMobile();
  const [dndBackend, setDndBackend] = useState<HTML5BackendType | TouchBackendType | null>(null);
  const [backendOptions, setBackendOptions] = useState<{enableMouseEvents?: boolean}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the appropriate backend based on device type
    const loadBackend = async () => {
      try {
        if (isMobile) {
          // Dynamic import of TouchBackend
          const touchModule = await import('react-dnd-touch-backend');
          setDndBackend(touchModule.TouchBackend);
          setBackendOptions({ enableMouseEvents: true });
        } else {
          // Dynamic import of HTML5Backend
          const html5Module = await import('react-dnd-html5-backend');
          setDndBackend(html5Module.HTML5Backend);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load DnD backend:', error);
        setIsLoading(false);
      }
    };

    loadBackend();
  }, [isMobile]);

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

  // If the DnD backend is still loading, render a simple non-draggable version
  if (isLoading) {
    return (
      <Layout>
        <Toaster />
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor market data and options opportunities</p>
          </div>
          
          <SimulatedTrading />
          
          <div className="space-y-6">
            {visibleWidgets.map((widget) => (
              <div key={widget.id} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">{widget.title}</h3>
                </div>
                {renderWidget(widget.type)}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Toaster />
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor market data and options opportunities</p>
        </div>
        
        <SimulatedTrading />
        
        {dndBackend && (
          <DndProvider backend={dndBackend} options={backendOptions}>
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
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
