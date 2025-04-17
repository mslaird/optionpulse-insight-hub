
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import ToolsTabList from "@/components/tools/ToolsTabList";
import ToolsTabContent from "@/components/tools/ToolsTabContent";
import PaywallModal from "@/components/modals/PaywallModal";
import { useToolsPage } from "@/hooks/useToolsPage";

const Tools = () => {
  const {
    showLeaps,
    activeTab,
    canAccessLite,
    canAccessPro,
    showPaywallModal,
    requiredTier,
    featureName,
    handleTabChange,
    toggleLeapsMode,
    handleStartTrial,
    handleClosePaywall
  } = useToolsPage();
  
  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
            Options Tools
            {showLeaps && (
              <Badge className="ml-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                <Zap size={14} className="mr-1" />
                LEAPS Mode
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Advanced calculators and tools for options analysis and strategy building
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <ToolsTabList 
            activeTab={activeTab}
            showLeaps={showLeaps}
            canAccessLite={canAccessLite}
            canAccessPro={canAccessPro}
            onTabChange={handleTabChange}
            onLeapsToggle={toggleLeapsMode}
          />

          <TabsContent value={activeTab} className="mt-2">
            <ToolsTabContent 
              activeTab={activeTab}
              showLeaps={showLeaps}
            />
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
            title: "Advanced Analysis Tools",
            tier: requiredTier,
            description: `Access to ${featureName.toLowerCase()} and other professional trading tools`
          },
          {
            title: requiredTier === 'Pro' ? "Custom Strategy Builder" : "Enhanced Analytics",
            tier: requiredTier,
            description: requiredTier === 'Pro' 
              ? "Create and analyze complex multi-leg option strategies" 
              : "Detailed Greeks analysis and risk/reward calculations"
          },
          {
            title: requiredTier === 'Pro' ? "LEAPS Trading Support" : "Payoff Diagrams",
            tier: requiredTier,
            description: requiredTier === 'Pro'
              ? "Advanced tools for long-term equity anticipation securities"
              : "Visualize potential profits and losses for any option strategy"
          }
        ]}
      />
    </Layout>
  );
};

export default Tools;
