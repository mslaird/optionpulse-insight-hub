
export interface OptionLeg {
  id: string;
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strike: number;
  premium: number;
  quantity: number;
}

export interface StrategyBuilderProps {
  showLeaps?: boolean;
}

export interface StrategyMetrics {
  maxProfit: number | string;
  maxLoss: number | string;
  breakeven: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface TickerSelectorProps {
  ticker: string;
  currentPrice: number;
  expiry: string;
  onTickerChange: (value: string) => void;
  onCurrentPriceChange: (value: number) => void;
  onExpiryChange: (value: string) => void;
  showLeaps?: boolean;
}

export interface LegTableProps {
  legs: OptionLeg[];
  onLegChange: (id: string, field: keyof OptionLeg, value: any) => void;
  onDeleteLeg: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  draggedLeg: number | null;
  showLeaps?: boolean;
}

export interface StrategyHeaderProps {
  strategyName: string;
  onAddLeg: () => void;
  showLeaps?: boolean;
}

export interface PayoffChartProps {
  payoffData: Array<{
    stockPrice: number;
    profit: number;
    [key: string]: any;
  }>;
  showLeaps?: boolean;
}

export interface MetricsCardProps {
  metrics: StrategyMetrics;
  showLeaps?: boolean;
}
