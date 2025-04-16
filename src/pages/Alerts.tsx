
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertsList from "@/components/alerts/AlertsList";
import AlertsFilter from "@/components/alerts/AlertsFilter";
import AIAlertsList from "@/components/alerts/AIAlertsList";
import AIAlertsFilter from "@/components/alerts/AIAlertsFilter";
import { useState } from "react";
import { AIAlertsProvider } from "@/contexts/AIAlertsContext";
import { Bell, TrendingUp } from "lucide-react";
import CustomAlerts from "@/components/alerts/CustomAlerts";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import PaywallModal from "@/components/modals/PaywallModal";

export type AlertType = "volatility" | "prediction" | "all";

const Alerts = () => {
  const [filterType, setFilterType] = useState<AlertType>("all");
  const [activeTab, setActiveTab] = useState<string>("traditional");
  
  const { 
    checkAccess, 
    showPaywallModal, 
    requiredTier, 
    featureName, 
    handleStartTrial, 
    handleClosePaywall 
  } = useFeatureAccess();
  
  // Check if user can access custom alerts
  const canAccessCustomAlerts = () => {
    return checkAccess('Pro', 'Custom Alerts');
  };

  return (
    <AIAlertsProvider>
      <Layout>
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Alerts</h1>
            <p className="text-muted-foreground">
              Monitor volatility changes, AI-driven predictions, and custom alerts
            </p>
          </div>

          {/* Custom Alerts Section - With paywall check */}
          <CustomAlerts checkAccess={canAccessCustomAlerts} />

          <Tabs defaultValue="traditional" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6">
              <TabsTrigger value="traditional" className="flex items-center gap-2">
                <Bell size={16} />
                <span>Traditional Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>AI Predictions</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="traditional">
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <AlertsFilter currentFilter={filterType} onFilterChange={setFilterType} />
                  <AlertsList filterType={filterType} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai">
              <AIAlertsFilter />
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">AI-Driven Options Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <AIAlertsList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <PaywallModal
          open={showPaywallModal}
          onClose={handleClosePaywall}
          onStartTrial={handleStartTrial}
          requiredTier={requiredTier}
          featureName={featureName}
          features={[
            {
              title: "Custom Alerts",
              tier: "Pro",
              description: "Create personalized alerts for any options strategy"
            },
            {
              title: "Unlimited Alert Volume",
              tier: "Pro", 
              description: "Set as many alerts as you need with no restrictions"
            },
            {
              title: "Advanced Alert Conditions",
              tier: "Pro",
              description: "Set complex conditions based on price, volatility, and more"
            }
          ]}
        />
      </Layout>
    </AIAlertsProvider>
  );
};

export default Alerts;
