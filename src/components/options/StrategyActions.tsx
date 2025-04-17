
import React, { useState } from "react";
import { OptionStrategy } from "@/types/options";
import { Button } from "@/components/ui/button";
import { Share2, Eye, BarChart2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface StrategyActionsProps {
  strategy: OptionStrategy;
}

const StrategyActions: React.FC<StrategyActionsProps> = ({ strategy }) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShareToCommunity = () => {
    setIsSharing(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSharing(false);
      toast({
        title: "Strategy shared",
        description: `Your ${strategy.name} strategy has been shared to the community feed.`,
      });
    }, 800);
  };

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Eye size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View details</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <BarChart2 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View payoff diagram</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleShareToCommunity}
              disabled={isSharing}
            >
              <Share2 size={16} className={isSharing ? "animate-pulse" : ""} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share to community</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default StrategyActions;
