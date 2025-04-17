
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOptionsData } from "@/hooks/useOptionsData";

const OptionsChainPreview = () => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const { data: optionsData, isLoading, error } = useOptionsData('AAPL');

  const handleShareToCommnunity = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      toast({
        title: "Shared to community",
        description: "Your options chain analysis has been shared to the community feed.",
      });
    }, 800);
  };

  if (isLoading) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full flex flex-col animate-pulse">
        <div className="p-6">Loading options data...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full flex flex-col">
        <div className="p-6 text-destructive">Error loading options data</div>
      </Card>
    );
  }

  // Use optional chaining to safely access options property
  const optionContracts = optionsData?.options?.slice(0, 6) || [];

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full flex flex-col transition-all duration-300">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BarChart3 size={18} className="text-optionpulse-blue" />
          AAPL Options Chain
        </CardTitle>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-optionpulse-blue hover:text-optionpulse-blue-light"
                  onClick={handleShareToCommnunity}
                  disabled={isSharing}
                >
                  <Share2 size={16} className="mr-1" />
                  {isSharing ? "Sharing..." : "Share"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this options chain to the community</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/options-chain">
            <Button variant="ghost" size="sm" className="text-optionpulse-blue hover:text-optionpulse-blue-light">
              View Full Chain
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Strike</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Bid</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Ask</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">IV</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {optionContracts.map((option, index) => (
                <tr 
                  key={`${option.type}-${option.strike}-${index}`}
                  className="border-b border-border/30 hover:bg-muted/10 transition-all duration-300"
                >
                  <td className="py-2 px-3">
                    <Badge 
                      variant={option.type === "CALL" ? "default" : "outline"}
                      className={option.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"}
                    >
                      {option.type}
                    </Badge>
                  </td>
                  <td className="py-2 px-3">${option.strike}</td>
                  <td className="py-2 px-3">${option.bid}</td>
                  <td className="py-2 px-3">${option.ask}</td>
                  <td className="py-2 px-3">{option.iv}%</td>
                  <td className="py-2 px-3">
                    {option.opportunity && (
                      <Badge 
                        variant="outline" 
                        className="border-optionpulse-green text-optionpulse-green"
                      >
                        {option.opportunity}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsChainPreview;
