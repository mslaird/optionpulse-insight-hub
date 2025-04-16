
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserTier } from "@/utils/auth";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface Feature {
  title: string;
  tier: UserTier;
  description: string;
}

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  onStartTrial: () => void;
  requiredTier: UserTier;
  featureName: string;
  features?: Feature[];
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  open,
  onClose,
  onStartTrial,
  requiredTier,
  featureName,
  features = [],
}) => {
  const tierPrice = requiredTier === 'Lite' ? '$19.99' : '$39.99';
  const tierColor = requiredTier === 'Lite' ? 'text-optionpulse-blue' : 'text-yellow-400';
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-sidebar-background border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className={tierColor} />
            Unlock {requiredTier === 'Lite' ? 'OptionPulse Lite' : 'OptionPulse Pro'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {featureName} requires {requiredTier} {requiredTier === 'Lite' ? 'or Pro ' : ''}
            subscription
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="glass-card p-4 space-y-4">
            {features.length > 0 ? (
              features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className={`mt-1 flex-shrink-0 ${
                    feature.tier === 'Lite' ? 'text-optionpulse-blue' : 'text-optionpulse-green'
                  }`} size={18} />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-optionpulse-green mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium">{featureName}</p>
                    <p className="text-sm text-muted-foreground">
                      Access to {featureName.toLowerCase()} and more advanced features
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-optionpulse-green mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-medium">Priority Support</p>
                    <p className="text-sm text-muted-foreground">
                      Get faster responses from our support team
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="glass-card p-4 text-center">
            <p className="text-lg font-bold">{tierPrice}<span className="text-muted-foreground text-sm">/month</span></p>
            <p className="text-sm text-muted-foreground">7-day free trial, cancel anytime</p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Maybe Later
          </Button>
          <Button 
            onClick={onStartTrial} 
            className="bg-gradient-to-r from-optionpulse-blue to-optionpulse-blue-dark hover:from-optionpulse-blue-light hover:to-optionpulse-blue text-white sm:flex-1"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start 7-Day Free Trial
          </Button>
          <Button 
            variant="link"
            asChild
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Link to="/pricing">
              View All Plans
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
