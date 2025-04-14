
import Layout from "@/components/layout/Layout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import OptionsChainPreview from "@/components/dashboard/OptionsChainPreview";
import GreeksChart from "@/components/dashboard/GreeksChart";
import VolatilityAlerts from "@/components/dashboard/VolatilityAlerts";

const Dashboard = () => {
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
      </div>
    </Layout>
  );
};

export default Dashboard;
