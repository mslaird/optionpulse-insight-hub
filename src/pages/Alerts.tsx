
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

export type AlertType = "volatility" | "prediction" | "all";

const Alerts = () => {
  const [filterType, setFilterType] = useState<AlertType>("all");
  const [activeTab, setActiveTab] = useState<string>("traditional");

  return (
    <AIAlertsProvider>
      <Layout>
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Alerts</h1>
            <p className="text-muted-foreground">
              Monitor volatility changes and AI-driven predictions
            </p>
          </div>

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
      </Layout>
    </AIAlertsProvider>
  );
};

export default Alerts;
