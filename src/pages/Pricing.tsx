
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";
import PricingPlans from "@/components/pricing/PricingPlans";
import FeatureComparison from "@/components/pricing/FeatureComparison";

const PricingPage = () => {
  const { user, upgradeToTier, startFreeTrial } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = (tier: 'Free' | 'Lite' | 'Pro') => {
    if (tier === 'Pro') {
      startFreeTrial();
    } else {
      upgradeToTier(tier);
    }
    
    toast({
      title: tier === 'Free' ? "Downgraded to Free" : `Upgraded to ${tier}`,
      description: tier === 'Free' 
        ? "You've been downgraded to the Free tier" 
        : tier === 'Pro' 
          ? "Your 7-day free Pro trial has started" 
          : `You've been upgraded to the ${tier} tier`,
    });
  };

  const handleSubscribe = async (tier: 'Lite' | 'Pro', price: string) => {
    console.log(`Subscribed to ${tier} plan for ${price}/month`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (tier === 'Pro') {
      startFreeTrial();
    } else {
      upgradeToTier(tier);
    }
    
    toast({
      title: `Successfully subscribed to ${tier}`,
      description: tier === 'Pro' 
        ? "You now have access to all Pro features!" 
        : "You now have access to all Lite features!",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Choose the plan that best fits your options trading needs
          </p>
        </div>

        <PricingPlans 
          currentTier={user?.tier} 
          onUpgrade={handleUpgrade} 
          onSubscribe={handleSubscribe} 
        />
        
        <FeatureComparison />
      </div>
    </Layout>
  );
};

export default PricingPage;
