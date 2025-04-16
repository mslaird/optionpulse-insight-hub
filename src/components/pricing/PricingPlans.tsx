
import React, { useState } from "react";
import PlanCard from "./PlanCard";
import { UserTier } from "@/utils/auth";

interface PricingPlansProps {
  currentTier?: UserTier | null;
  onUpgrade: (tier: UserTier) => void;
  onSubscribe: (tier: 'Lite' | 'Pro', price: string) => Promise<void>;
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  currentTier,
  onUpgrade,
  onSubscribe,
}) => {
  const [processing, setProcessing] = useState<string | null>(null);

  const handleSubscribe = async (tier: 'Lite' | 'Pro', price: string) => {
    if (processing) return;
    
    setProcessing(tier);
    
    try {
      await onSubscribe(tier, price);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PlanCard
        title="Free"
        description="Basic options trading tools"
        price="$0"
        tier="Free"
        currentTier={currentTier}
        onUpgrade={onUpgrade}
        onSubscribe={handleSubscribe}
        processing={processing}
        features={[
          { name: "Basic options chain", included: true },
          { name: "Educational text content", included: true },
          { name: "Strategy trader simulator", included: true },
          { name: "Basic volatility scanner", included: true },
          { name: "Community read access", included: true },
          { name: "Basic trade journal", included: true },
          { name: "Advanced options analysis", included: false },
          { name: "Payoff diagrams", included: false },
        ]}
      />

      <PlanCard
        title="Lite"
        description="Enhanced options analytics"
        price="$19.99"
        tier="Lite"
        popular={true}
        currentTier={currentTier}
        onUpgrade={onUpgrade}
        onSubscribe={handleSubscribe}
        processing={processing}
        features={[
          { name: "Everything in Free", included: true },
          { name: "Full educational content", included: true },
          { name: "Payoff diagram generator", included: true },
          { name: "Greeks calculator", included: true },
          { name: "Risk/reward analyzer", included: true },
          { name: "Basic alert notifications", included: true },
          { name: "Community interaction", included: true },
          { name: "Advanced options chain", included: false },
        ]}
      />

      <PlanCard
        title="Pro"
        description="Professional trading tools"
        price="$39.99"
        tier="Pro"
        trialDays={7}
        currentTier={currentTier}
        onUpgrade={onUpgrade}
        onSubscribe={handleSubscribe}
        processing={processing}
        features={[
          { name: "Everything in Lite", included: true },
          { name: "Advanced options chain", included: true },
          { name: "Real-time Greeks analysis", included: true },
          { name: "Custom alert notifications", included: true },
          { name: "Advanced strategy builder", included: true },
          { name: "LEAPS options support", included: true },
          { name: "Pro-level challenges", included: true },
          { name: "Priority support", included: true },
        ]}
      />
    </div>
  );
};

export default PricingPlans;
