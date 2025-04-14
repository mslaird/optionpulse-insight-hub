
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { WidgetItem } from '@/hooks/use-draggable-dashboard';
import { GripVertical, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DraggableWidgetProps {
  widget: WidgetItem;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  toggleVisibility: (id: string) => void;
  children: React.ReactNode;
}

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export const DraggableWidget = ({ 
  widget, 
  index, 
  moveWidget, 
  toggleVisibility, 
  children 
}: DraggableWidgetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'WIDGET',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveWidget(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'WIDGET',
    item: () => {
      return { id: widget.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  drag(drop(ref));
  
  return (
    <div 
      ref={dragPreview}
      className={cn(
        'transition-opacity duration-200 mb-6',
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      data-handler-id={handlerId}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div 
            ref={ref}
            className="cursor-move p-1 mr-2 text-muted-foreground hover:text-foreground"
          >
            <GripVertical size={16} />
          </div>
          <h3 className="text-sm font-medium">{widget.title}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => toggleVisibility(widget.id)}
          className="h-7 w-7"
        >
          <EyeOff size={14} className="text-muted-foreground" />
        </Button>
      </div>
      {children}
    </div>
  );
};
