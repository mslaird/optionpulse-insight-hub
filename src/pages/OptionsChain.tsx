
import React from "react";
import Layout from "@/components/layout/Layout";
import { BarChart3, Sliders, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
import OptionsFilter from "@/components/options/OptionsFilter";
import StockSelector from "@/components/options/StockSelector";
import AdvancedOptionsFilter from "@/components/options/AdvancedOptionsFilter";
import AdvancedOptionsTable from "@/components/options/AdvancedOptionsTable";
import BasicOptionsChainTable from "@/components/options/BasicOptionsChainTable";
import ProModal from "@/components/modals/ProModal";
import PaywallModal from "@/components/modals/PaywallModal";
import StockPriceDisplay from "@/components/options/StockPriceDisplay";
import { useOptionsChainState } from "@/hooks/useOptionsChainState";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";

const OptionsChain = () => {
  const {
    selectedStock,
    setSelectedStock,
    expirationDate,
    setExpirationDate,
    optionType,
    setOptionType,
    showOpportunities,
    setShowOpportunities,
    strategyFilter,
    setStrategyFilter,
    state,
    expiryFilter,
    setExpiryFilter,
    ivRange,
    setIvRange,
    itmProbabilityRange,
    setItmProbabilityRange,
    stockPrice,
    stockChange,
    stockChangePercent,
    toggleAdvancedView,
    handleTryPro,
    handleCloseProModal,
    resetFilters
  } = useOptionsChainState();
  
  const { 
    canAccessPro, 
    checkAccess, 
    showPaywallModal, 
    requiredTier, 
    featureName, 
    handleStartTrial, 
    handleClosePaywall 
  } = useFeatureAccess();
  
  const handleAdvancedView = () => {
    if (state.isAdvancedView || checkAccess('Pro', 'Advanced Options Chain')) {
      toggleAdvancedView();
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="text-optionpulse-blue" />
              Options Chain
            </h1>
            <p className="text-muted-foreground">Analyze options and discover trading opportunities</p>
          </div>
          <div className="flex gap-2">
            <StockSelector selectedStock={selectedStock} onSelectStock={setSelectedStock} />
            <Button 
              variant="outline" 
              onClick={handleAdvancedView}
              className={cn(
                "flex items-center gap-1",
                state.isAdvancedView && "border-optionpulse-blue text-optionpulse-blue"
              )}
            >
              <Sparkles size={16} className={canAccessPro ? "text-yellow-400" : ""} />
              {state.isAdvancedView ? "Basic View" : "Advanced View"}
            </Button>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg flex flex-col sm:flex-row items-center gap-3 justify-between">
          <StockPriceDisplay 
            stockPrice={stockPrice} 
            stockChange={stockChange} 
            stockChangePercent={stockChangePercent} 
          />
          
          {!state.isAdvancedView ? (
            <OptionsFilter 
              expirationDate={expirationDate}
              setExpirationDate={setExpirationDate}
              optionType={optionType}
              setOptionType={setOptionType}
              showOpportunities={showOpportunities}
              setShowOpportunities={setShowOpportunities}
              strategyFilter={strategyFilter}
              setStrategyFilter={setStrategyFilter}
            />
          ) : null}
        </div>
        
        {state.isAdvancedView && (
          <AdvancedOptionsFilter 
            optionType={optionType}
            setOptionType={setOptionType}
            strategyFilter={strategyFilter}
            setStrategyFilter={setStrategyFilter}
            expiryFilter={expiryFilter}
            setExpiryFilter={setExpiryFilter}
            ivRange={ivRange}
            setIvRange={setIvRange}
            itmProbabilityRange={itmProbabilityRange}
            setItmProbabilityRange={setItmProbabilityRange}
            onReset={resetFilters}
            isPro={canAccessPro}
            onTogglePro={toggleAdvancedView}
          />
        )}
        
        {!state.isAdvancedView ? (
          <BasicOptionsChainTable 
            stock={selectedStock} 
            expirationDate={expirationDate} 
            optionType={optionType}
            showOpportunities={showOpportunities}
            strategyFilter={strategyFilter}
          />
        ) : (
          <AdvancedOptionsTable 
            stock={selectedStock}
            expirationDate={expirationDate}
            optionType={optionType}
            strategyFilter={strategyFilter}
            ivRange={ivRange}
            itmProbabilityRange={itmProbabilityRange}
          />
        )}
      </div>
      
      <ProModal 
        open={state.showProModal} 
        onClose={handleCloseProModal} 
        onTryPro={handleTryPro} 
      />
      
      <PaywallModal
        open={showPaywallModal}
        onClose={handleClosePaywall}
        onStartTrial={handleStartTrial}
        requiredTier={requiredTier}
        featureName={featureName}
        features={[
          {
            title: "Advanced Options Chain",
            tier: "Pro",
            description: "View complex options data with Greeks and advanced analytics"
          },
          {
            title: "Multi-leg Strategy Builder",
            tier: "Pro", 
            description: "Create and analyze complex options strategies"
          },
          {
            title: "LEAPS Trading Support",
            tier: "Pro",
            description: "Long-term equity anticipation securities with extended expiries"
          }
        ]}
      />
    </Layout>
  );
};

export default OptionsChain;
