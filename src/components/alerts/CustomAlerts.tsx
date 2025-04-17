
import { useState } from "react";
import { BellRing, ChevronDown, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CustomAlertsForm from "./CustomAlertsForm";
import CustomAlertsList from "./CustomAlertsList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the CustomAlert type
interface CustomAlert {
  id: string;
  ticker: string;
  strategy: string;
  strikePrice: number;
  expiryDate: string;
  itmProbability: number;
  sentimentDirection: "bullish" | "bearish" | "neutral";
  sentimentScore: number;
  timestamp: string;
}

// Mock initial alerts
const initialAlerts: CustomAlert[] = [
  {
    id: "alert-1",
    ticker: "AAPL",
    strategy: "leaps_call",
    strikePrice: 250,
    expiryDate: "2027-01-15",
    itmProbability: 80,
    sentimentDirection: "bullish",
    sentimentScore: 75,
    timestamp: "4/16/2025, 10:30 AM"
  },
  {
    id: "alert-2",
    ticker: "SPY",
    strategy: "put",
    strikePrice: 420,
    expiryDate: "2025-07-18",
    itmProbability: 65,
    sentimentDirection: "bearish",
    sentimentScore: 70,
    timestamp: "4/16/2025, 9:45 AM"
  },
  {
    id: "alert-3",
    ticker: "QQQ",
    strategy: "iron_condor",
    strikePrice: 380,
    expiryDate: "2025-12-19",
    itmProbability: 70,
    sentimentDirection: "neutral",
    sentimentScore: 60,
    timestamp: "4/17/2025, 8:15 AM"
  }
];

interface CustomAlertsProps {
  checkAccess: () => boolean;
}

const CustomAlerts = ({ checkAccess }: CustomAlertsProps) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<CustomAlert[]>(initialAlerts);
  const [isOpen, setIsOpen] = useState(true);

  const handleAddAlert = (alert: CustomAlert) => {
    setAlerts((prev) => [alert, ...prev]);
    toast({
      title: "Alert Created",
      description: `New alert for ${alert.ticker} $${alert.strikePrice} created successfully.`,
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "The alert has been removed from your list.",
    });
  };
  
  const handleCustomAlertsClick = () => {
    const hasAccess = checkAccess();
    if (hasAccess) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 mt-6 mb-8">
      <Collapsible open={isOpen} onOpenChange={handleCustomAlertsClick}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BellRing size={18} className="text-optionpulse-blue" />
              Custom Alerts
              <span className="ml-2 bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-normal">
                Pro
              </span>
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-6">
              <CustomAlertsForm onAddAlert={handleAddAlert} />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Active Custom Alerts</h3>
                <div className="w-full h-auto max-h-[400px] overflow-auto pr-2">
                  <CustomAlertsList 
                    alerts={alerts} 
                    onDeleteAlert={handleDeleteAlert} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CustomAlerts;
