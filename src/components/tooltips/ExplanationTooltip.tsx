
import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExplanationTooltipProps {
  title: string;
  content: string;
  iconSize?: number;
  iconClass?: string; // Add this prop to handle custom icon styling
}

const ExplanationTooltip: React.FC<ExplanationTooltipProps> = ({
  title,
  content,
  iconSize = 16,
  iconClass
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <HelpCircle
            size={iconSize}
            className={`text-muted-foreground cursor-help transition-colors hover:text-foreground ${iconClass || ""}`}
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExplanationTooltip;
