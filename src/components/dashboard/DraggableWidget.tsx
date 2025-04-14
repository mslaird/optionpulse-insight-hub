
import React, { ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DraggableWidgetProps {
  children: ReactNode;
  title: string;
  isDraggable?: boolean;
  className?: string;
}

const DraggableWidget = ({ 
  children, 
  title, 
  isDraggable = true,
  className 
}: DraggableWidgetProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 flex flex-col h-full",
        className
      )}
    >
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        {isDraggable && (
          <div 
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
            style={{ touchAction: "none" }}
          >
            <GripVertical size={18} className="drag-handle" />
          </div>
        )}
      </div>
      <div className="p-4 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DraggableWidget;
