
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StrategyBuilderProps, OptionLeg } from "./strategy/types";
import { generatePayoffData, calculateStrategyMetrics, getStrategyName, defaultStockPrices } from "./strategy/strategyUtils";
import TickerSelector from "./strategy/TickerSelector";
import StrategyHeader from "./strategy/StrategyHeader";
import LegTable from "./strategy/LegTable";
import PayoffChart from "./strategy/PayoffChart";
import MetricsCard from "./strategy/MetricsCard";

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ showLeaps = false }) => {
  const { toast } = useToast();
  const [ticker, setTicker] = useState("AAPL");
  const [currentPrice, setCurrentPrice] = useState(defaultStockPrices.AAPL);
  const [expiry, setExpiry] = useState("05/16/2025");
  const [legs, setLegs] = useState<OptionLeg[]>([
    { id: '1', type: 'call', action: 'buy', strike: 250, premium: 5, quantity: 1 }
  ]);
  const [payoffData, setPayoffData] = useState(generatePayoffData(legs, ticker, currentPrice));
  const [metrics, setMetrics] = useState(calculateStrategyMetrics(legs));
  const [draggedLeg, setDraggedLeg] = useState<number | null>(null);

  const handleTickerChange = (value: string) => {
    setTicker(value);
    const newPrice = defaultStockPrices[value as keyof typeof defaultStockPrices];
    setCurrentPrice(newPrice);
    
    const newLegs = legs.map(leg => ({
      ...leg,
      strike: Math.round(leg.strike * (newPrice / currentPrice) / 5) * 5
    }));
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, value, newPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleCurrentPriceChange = (value: number) => {
    setCurrentPrice(value);
  };

  const handleExpiryChange = (value: string) => {
    setExpiry(value);
  };

  const handleAddLeg = () => {
    const newLeg: OptionLeg = {
      id: Date.now().toString(),
      type: 'call',
      action: 'buy',
      strike: currentPrice,
      premium: 5,
      quantity: 1
    };
    
    const newLegs = [...legs, newLeg];
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
    
    toast({
      title: "Leg Added",
      description: `Added ${newLeg.action} ${newLeg.type} option at strike $${newLeg.strike}`,
    });
  };

  const handleDeleteLeg = (id: string) => {
    const newLegs = legs.filter(leg => leg.id !== id);
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleLegChange = (id: string, field: keyof OptionLeg, value: any) => {
    const newLegs = legs.map(leg => {
      if (leg.id === id) {
        return { ...leg, [field]: value };
      }
      return leg;
    });
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(newLegs));
  };

  const handleCalculate = () => {
    setPayoffData(generatePayoffData(legs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(legs));
    
    toast({
      title: "Strategy Updated",
      description: `Strategy payoff has been recalculated for ${ticker}`,
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedLeg(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedLeg === null || draggedLeg === index) return;
    
    const newLegs = [...legs];
    const draggedItem = newLegs[draggedLeg];
    newLegs.splice(draggedLeg, 1);
    newLegs.splice(index, 0, draggedItem);
    
    setLegs(newLegs);
    setDraggedLeg(index);
  };

  const handleDragEnd = () => {
    setDraggedLeg(null);
    setPayoffData(generatePayoffData(legs, ticker, currentPrice));
    setMetrics(calculateStrategyMetrics(legs));
  };

  return (
    <div className="flex flex-col space-y-6">
      <TickerSelector
        ticker={ticker}
        currentPrice={currentPrice}
        expiry={expiry}
        onTickerChange={handleTickerChange}
        onCurrentPriceChange={handleCurrentPriceChange}
        onExpiryChange={handleExpiryChange}
      />

      <StrategyHeader
        strategyName={getStrategyName(legs)}
        onAddLeg={handleAddLeg}
      />

      <LegTable
        legs={legs}
        onLegChange={handleLegChange}
        onDeleteLeg={handleDeleteLeg}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        draggedLeg={draggedLeg}
      />

      <Button onClick={handleCalculate} className="w-full sm:w-auto">
        Calculate Strategy Performance
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PayoffChart payoffData={payoffData} />
        <MetricsCard metrics={metrics} />
      </div>
    </div>
  );
};

export default StrategyBuilder;
