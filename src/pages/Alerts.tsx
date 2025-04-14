
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AlertsList from "@/components/alerts/AlertsList";
import AlertsFilter from "@/components/alerts/AlertsFilter";
import { useState } from "react";

export type AlertType = "volatility" | "prediction" | "all";

const Alerts = () => {
  const [filterType, setFilterType] = useState<AlertType>("all");

  return (
    <Layout>
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
            <AlertsFilter currentFilter={filterType} onFilterChange={setFilterType} />
            <AlertsList filterType={filterType} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Alerts;
