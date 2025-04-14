
import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExplanationTooltipProps {
  title: string;
  content: string;
  className?: string;
  iconSize?: number;
  iconClass?: string;
}

const ExplanationTooltip = ({
  title,
  content,
  className,
  iconSize = 16,
  iconClass,
}: ExplanationTooltipProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button 
              onClick={() => setOpen(true)}
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus-visible:ring-offset-2",
                "text-muted-foreground hover:text-primary transition-colors",
                className
              )}
              aria-label={`Learn more about ${title}`}
            >
              <HelpCircle 
                className={cn("cursor-pointer", iconClass)} 
                size={iconSize} 
              />
            </button>
          </TooltipTrigger>
          {!isMobile && (
            <TooltipContent side="top" className="max-w-xs">
              <p>Click to learn more about {title}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-sidebar-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl flex items-center gap-2">
              <HelpCircle className="text-primary" size={18} />
              {title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detailed explanation
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground whitespace-pre-line">{content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExplanationTooltip;
