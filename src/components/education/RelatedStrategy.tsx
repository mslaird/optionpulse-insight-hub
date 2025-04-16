
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface StrategyDefinition {
  name: string;
  description: string;
}

interface RelatedStrategyProps {
  strategy: StrategyDefinition | undefined;
}

const RelatedStrategy = ({ strategy }: RelatedStrategyProps) => {
  if (!strategy) return null;
  
  return (
    <div className="w-full sm:w-3/4 mx-auto mt-6">
      <h3 className="font-medium text-lg mb-3">Related Strategy Guide</h3>
      <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-optionpulse-blue/50 transition-all">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{strategy.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
            </div>
            <Button variant="outline" size="sm" className="flex-shrink-0">
              View <ExternalLink size={14} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatedStrategy;
