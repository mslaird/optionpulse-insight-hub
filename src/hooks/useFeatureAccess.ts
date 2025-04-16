
import { useState } from "react";
import { useAuth, canAccessLiteFeatures, canAccessProFeatures, UserTier } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

export const useFeatureAccess = () => {
  const { user, startFreeTrial } = useAuth();
  const { toast } = useToast();
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [requiredTier, setRequiredTier] = useState<UserTier>('Pro');
  const [featureName, setFeatureName] = useState<string>('');

  const canAccessLite = canAccessLiteFeatures(user);
  const canAccessPro = canAccessProFeatures(user);

  const checkAccess = (tier: 'Lite' | 'Pro', feature: string): boolean => {
    if (tier === 'Lite' && canAccessLite) return true;
    if (tier === 'Pro' && canAccessPro) return true;
    
    setRequiredTier(tier);
    setFeatureName(feature);
    setShowPaywallModal(true);
    return false;
  };

  const handleStartTrial = () => {
    startFreeTrial();
    setShowPaywallModal(false);
    
    toast({
      title: "Free Trial Started!",
      description: "You now have access to all Pro features for 7 days.",
    });
  };

  const handleClosePaywall = () => {
    setShowPaywallModal(false);
  };

  return {
    canAccessLite,
    canAccessPro,
    checkAccess,
    showPaywallModal,
    requiredTier,
    featureName,
    handleStartTrial,
    handleClosePaywall,
  };
};
