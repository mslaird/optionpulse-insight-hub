
import { useState } from 'react';

export type WidgetType = 'market-overview' | 'options-chain-preview' | 'volatility-alerts' | 'greeks-chart' | 'sentiment-analysis';

export type WidgetItem = {
  id: string;
  type: WidgetType;
  position: number;
  title: string;
  visible: boolean;
};

const defaultWidgets: WidgetItem[] = [
  { id: 'market-overview', type: 'market-overview', position: 0, title: 'Market Overview', visible: true },
  { id: 'options-chain-preview', type: 'options-chain-preview', position: 1, title: 'Options Chain Preview', visible: true },
  { id: 'greeks-chart', type: 'greeks-chart', position: 2, title: 'Greeks Chart', visible: true },
  { id: 'volatility-alerts', type: 'volatility-alerts', position: 3, title: 'Volatility Alerts', visible: true },
  { id: 'sentiment-analysis', type: 'sentiment-analysis', position: 4, title: 'Sentiment Analysis', visible: true },
];

export const useDraggableDashboard = (initialWidgets = defaultWidgets) => {
  const [widgets, setWidgets] = useState<WidgetItem[]>(initialWidgets);
  
  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    const draggedWidget = widgets[dragIndex];
    
    setWidgets((prevWidgets) => {
      const newWidgets = [...prevWidgets];
      // Remove the dragged item
      newWidgets.splice(dragIndex, 1);
      // Insert it at the new position
      newWidgets.splice(hoverIndex, 0, draggedWidget);
      
      // Update positions
      return newWidgets.map((widget, index) => ({
        ...widget,
        position: index
      }));
    });
  };
  
  const toggleWidgetVisibility = (id: string) => {
    setWidgets((prevWidgets) => 
      prevWidgets.map((widget) => 
        widget.id === id ? { ...widget, visible: !widget.visible } : widget
      )
    );
  };
  
  return {
    widgets: widgets.sort((a, b) => a.position - b.position),
    moveWidget,
    toggleWidgetVisibility
  };
};
