
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
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

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
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <ScrollArea className="max-h-[70vh]">
            <div className="prose prose-invert max-w-none px-1">
              <p className="text-foreground whitespace-pre-line">{content}</p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExplanationTooltip;
