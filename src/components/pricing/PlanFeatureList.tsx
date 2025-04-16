
import React from "react";
import { CheckCircle2, Lock } from "lucide-react";

export interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanFeatureListProps {
  features: PlanFeature[];
  isPro?: boolean;
}

const PlanFeatureList: React.FC<PlanFeatureListProps> = ({ 
  features, 
  isPro = false 
}) => {
  return (
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
  );
};

export default PlanFeatureList;
