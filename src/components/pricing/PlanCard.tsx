
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Lock, Sparkles } from "lucide-react";
import { UserTier } from "@/utils/auth";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  tier: UserTier;
  features: PlanFeature[];
  currentTier?: UserTier | null;
  popular?: boolean;
  trialDays?: number;
  onUpgrade: (tier: UserTier) => void;
  onSubscribe: (tier: 'Lite' | 'Pro', price: string) => Promise<void>;
  processing: string | null;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  price,
  tier,
  features,
  currentTier,
  popular = false,
  trialDays,
  onUpgrade,
  onSubscribe,
  processing
}) => {
  const isCurrent = currentTier === tier;
  const isFree = tier === 'Free';
  const isPro = tier === 'Pro';
  const isLite = tier === 'Lite';
  
  return (
    <Card className={`bg-card/30 backdrop-blur-sm border-border/50 flex flex-col ${
      isLite ? 'border-optionpulse-blue' : isPro ? 'border-yellow-400 bg-gradient-to-b from-card/30 to-card/80' : ''
    }`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            {title}
            {isPro && <Sparkles size={16} className="ml-2 text-yellow-400" />}
          </CardTitle>
          {popular && (
            <div className="bg-optionpulse-blue/20 text-optionpulse-blue text-xs px-2 py-1 rounded-full">
              Popular
            </div>
          )}
          {trialDays && (
            <div className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
              {trialDays}-Day Free Trial
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <CheckCircle2 
                  size={18} 
                  className={`mt-0.5 flex-shrink-0 ${
                    isPro ? 'text-yellow-400' : 'text-optionpulse-blue'
                  }`} 
                />
              ) : (
                <Lock size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <span className={feature.included ? '' : 'text-muted-foreground'}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isCurrent ? (
          <Button 
            variant={isLite ? "outline" : "default"}
            className={`w-full ${
              isLite 
                ? "text-optionpulse-blue border-optionpulse-blue" 
                : isPro 
                  ? "bg-gradient-to-r from-optionpulse-blue to-optionpulse-blue-dark hover:from-optionpulse-blue-light hover:to-optionpulse-blue text-white" 
                  : ""
            }`}
            disabled
          >
            Current Plan
          </Button>
        ) : isFree ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onUpgrade('Free')}
            disabled={!currentTier || currentTier === 'Free'}
          >
            {!currentTier || currentTier === 'Free' ? "Current Plan" : "Downgrade"}
          </Button>
        ) : isLite ? (
          <Button 
            variant="outline" 
            className="w-full text-optionpulse-blue border-optionpulse-blue hover:bg-optionpulse-blue/10"
            onClick={() => onSubscribe('Lite', price)}
            disabled={processing !== null}
          >
            {processing === 'Lite' ? (
              <span className="flex items-center">
                <span className="animate-pulse mr-2">Processing...</span>
              </span>
            ) : (
              <>Sign Up</>
            )}
          </Button>
        ) : (
          <Button 
            className="w-full bg-gradient-to-r from-optionpulse-blue to-optionpulse-blue-dark hover:from-optionpulse-blue-light hover:to-optionpulse-blue text-white"
            onClick={() => onSubscribe('Pro', price)}
            disabled={processing !== null}
          >
            {processing === 'Pro' ? (
              <span className="flex items-center">
                <span className="animate-pulse mr-2">Processing...</span>
              </span>
            ) : (
              <>Start Free Trial <ChevronRight size={16} /></>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
