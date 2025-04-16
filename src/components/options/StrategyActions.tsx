
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell, Share2, BarChart3 } from "lucide-react";
import { OptionStrategy } from "@/types/options";
import { useToast } from "@/hooks/use-toast";

interface StrategyActionsProps {
  strategy: OptionStrategy;
}

const StrategyActions: React.FC<StrategyActionsProps> = ({ strategy }) => {
  const { toast } = useToast();
  
  const handleSetAlert = (strategy: OptionStrategy) => {
    toast({
      title: "Alert Set",
      description: `You'll be notified of significant changes to ${strategy.name}`,
    });
  };
  
  const handleShareToCommunity = (strategy: OptionStrategy) => {
    toast({
      title: "Shared to Community",
      description: `Your ${strategy.name} strategy has been shared to the community`,
    });
  };
  
  return (
    <div className="flex space-x-1">
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2 text-xs"
        onClick={() => handleSetAlert(strategy)}
      >
        <Bell size={14} className="mr-1" />
        Alert
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2 text-xs"
        onClick={() => handleShareToCommunity(strategy)}
      >
        <Share2 size={14} className="mr-1" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-2 text-xs"
        asChild
      >
        <Link to="/tools">
          <BarChart3 size={14} className="mr-1" />
          Build
        </Link>
      </Button>
    </div>
  );
};

export default StrategyActions;
