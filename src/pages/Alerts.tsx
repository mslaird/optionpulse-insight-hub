
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AlertsList from "@/components/alerts/AlertsList";
import AlertsFilter from "@/components/alerts/AlertsFilter";
import { useState } from "react";
import { AlertsProvider } from "@/components/alerts/AlertsContext";
import SymbolFilter from "@/components/alerts/SymbolFilter";
import ExpiryFilter from "@/components/alerts/ExpiryFilter";

export type AlertType = "volatility" | "prediction" | "all";

const Alerts = () => {
  const [filterType, setFilterType] = useState<AlertType>("all");

  return (
    <Layout>
      <AlertsProvider>
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Alerts</h1>
            <p className="text-muted-foreground">
              Monitor volatility changes and AI-driven predictions
            </p>
          </div>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 mb-6">
                <AlertsFilter currentFilter={filterType} onFilterChange={setFilterType} />
                <div className="flex flex-wrap items-center gap-4">
                  <SymbolFilter />
                  <ExpiryFilter />
                </div>
              </div>
              <AlertsList filterType={filterType} />
            </CardContent>
          </Card>
        </div>
      </AlertsProvider>
    </Layout>
  );
};

export default Alerts;
