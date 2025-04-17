
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";

export const useToolsPage = () => {
  const [showLeaps, setShowLeaps] = useState(false);
  const [activeTab, setActiveTab] = useState("strategy-trader");
  const location = useLocation();
  
  const { 
    canAccessLite,
    canAccessPro,
    checkAccess, 
    showPaywallModal, 
    requiredTier, 
    featureName, 
    handleStartTrial, 
    handleClosePaywall 
  } = useFeatureAccess();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    
    if (tabParam) {
      switch (tabParam) {
        case 'journal':
          setActiveTab('journal');
          break;
        case 'strategy':
          // Check if user can access strategy builder
          if (canAccessPro) {
            setActiveTab('strategy');
          } else {
            checkAccess('Pro', 'Strategy Builder');
          }
          break;
        default:
          break;
      }
    }
  }, [location, canAccessPro, checkAccess]);
  
  const handleTabChange = (value: string) => {
    // Check access based on the tab
    let canAccess = true;
    
    switch (value) {
      case 'payoff':
      case 'greeks':
      case 'risk':
        // These features require at least Lite subscription
        canAccess = checkAccess('Lite', value === 'payoff' ? 'Payoff Diagram' : 
                               value === 'greeks' ? 'Greeks Calculator' : 'Risk/Reward Analyzer');
        break;
      case 'strategy':
        // Strategy builder requires Pro
        canAccess = checkAccess('Pro', 'Strategy Builder');
        break;
    }
    
    if (canAccess) {
      setActiveTab(value);
    }
  };

  const toggleLeapsMode = () => {
    setShowLeaps(!showLeaps);
  };
  
  return {
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
  };
};
