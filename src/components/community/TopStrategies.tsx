
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface TopStrategiesProps {
  strategyExplanations: {
    nakedCall: {
      title: string;
      content: string;
    };
    nakedPut: {
      title: string;
      content: string;
    };
    cashSecuredPut: {
      title: string;
      content: string;
    };
    coveredCall: {
      title: string;
      content: string;
    };
  };
  strategyLessons: Record<string, string>;
}

const TopStrategies = ({ strategyExplanations, strategyLessons }: TopStrategiesProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStrategyClick = (strategyName: string) => {
    const lessonId = strategyLessons[strategyName as keyof typeof strategyLessons];
    if (lessonId) {
      navigate("/education", { state: { openLesson: lessonId } });
      toast({
        title: "Navigating to lesson",
        description: `Opening the ${strategyName} lesson in the Education Hub`,
      });
    }
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Top Strategies
          <div className="flex space-x-1 ml-2">
            <ExplanationTooltip 
              title={strategyExplanations.nakedCall.title}
              content={strategyExplanations.nakedCall.content}
              iconClass="text-[#00FF7F]"
            />
            <ExplanationTooltip 
              title={strategyExplanations.nakedPut.title}
              content={strategyExplanations.nakedPut.content}
              iconClass="text-[#00FF7F]"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(strategyLessons).map(([name, lessonId]) => (
            <div 
              key={name}
              className="p-4 bg-black/20 rounded-lg border border-border/50 cursor-pointer hover:bg-black/30 transition-colors"
              onClick={() => handleStrategyClick(name)}
            >
              <h3 className="font-medium mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {name === "Iron Condor" && "Trading range-bound markets with defined risk"}
                {name === "Covered Calls" && "Generate income while holding stock positions"}
                {name === "Bull Put Spread" && "Bullish strategy with defined risk/reward"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopStrategies;
