
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
import { Sparkles, Check } from "lucide-react";

interface ProModalProps {
  open: boolean;
  onClose: () => void;
  onTryPro: () => void;
}

const ProModal: React.FC<ProModalProps> = ({ open, onClose, onTryPro }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-sidebar-background border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="text-yellow-400" />
            Unlock OptionPulse Pro
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get access to advanced trading tools and analytics
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-start gap-2">
              <Check className="text-optionpulse-green mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Advanced Options Chain View</p>
                <p className="text-sm text-muted-foreground">
                  View complex strategies, Greeks, and advanced analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Check className="text-optionpulse-green mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Multi-leg Strategy Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Analyze spreads, condors, straddles and more
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Check className="text-optionpulse-green mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">LEAPS Options Trading</p>
                <p className="text-sm text-muted-foreground">
                  Long-term equity anticipation securities with extended expiries
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Check className="text-optionpulse-green mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Real-time Greeks Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Delta, gamma, theta, vega, and rho metrics for all options
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4 text-center">
            <p className="text-lg font-bold">$39.99<span className="text-muted-foreground text-sm">/month</span></p>
            <p className="text-sm text-muted-foreground">7-day free trial, cancel anytime</p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Maybe Later
          </Button>
          <Button 
            onClick={onTryPro} 
            className="bg-gradient-to-r from-optionpulse-blue to-optionpulse-blue-dark hover:from-optionpulse-blue-light hover:to-optionpulse-blue text-white sm:flex-1"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Try Pro Free
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
