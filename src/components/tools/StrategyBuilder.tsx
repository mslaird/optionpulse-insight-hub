
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StrategyBuilderProps, OptionLeg } from "./strategy/types";
import { generatePayoffData, calculateStrategyMetrics, getStrategyName, defaultStockPrices, calculateDefaultPremium } from "./strategy/strategyUtils";
import TickerSelector from "./strategy/TickerSelector";
import StrategyHeader from "./strategy/StrategyHeader";
import LegTable from "./strategy/LegTable";
import PayoffChart from "./strategy/PayoffChart";
import MetricsCard from "./strategy/MetricsCard";
import { isLeapsExpiry } from "@/data/mockAlertData";

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ showLeaps = false }) => {
  const { toast } = useToast();
  const [ticker, setTicker] = useState("AAPL");
  const [currentPrice, setCurrentPrice] = useState(defaultStockPrices.AAPL);
  const [expiry, setExpiry] = useState(showLeaps ? "05/16/2025" : "05/16/2025");
  const [legs, setLegs] = useState<OptionLeg[]>([
    { id: '1', type: 'call', action: 'buy', strike: 250, premium: 5, quantity: 1 }
  ]);
  const [payoffData, setPayoffData] = useState(generatePayoffData(legs, ticker, currentPrice, showLeaps));
  const [metrics, setMetrics] = useState(calculateStrategyMetrics(legs, showLeaps, expiry));
  const [draggedLeg, setDraggedLeg] = useState<number | null>(null);
  
  // Recalculate when showLeaps changes
  useEffect(() => {
    // If showLeaps was turned on and we have existing legs, adjust their premiums
    if (showLeaps) {
      const adjustedLegs = legs.map(leg => ({
        ...leg,
        premium: calculateDefaultPremium(leg.strike, currentPrice, leg.type, true)
      }));
      setLegs(adjustedLegs);
    }
    
    // Update payoff and metrics
    setPayoffData(generatePayoffData(legs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(legs, showLeaps, expiry));
  }, [showLeaps]);

  const handleTickerChange = (value: string) => {
    setTicker(value);
    const newPrice = defaultStockPrices[value as keyof typeof defaultStockPrices];
    setCurrentPrice(newPrice);
    
    const newLegs = legs.map(leg => {
      const newStrike = Math.round(leg.strike * (newPrice / currentPrice) / 5) * 5;
      return {
        ...leg,
        strike: newStrike,
        premium: calculateDefaultPremium(newStrike, newPrice, leg.type, showLeaps && isLeapsExpiry(expiry))
      };
    });
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, value, newPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(newLegs, showLeaps, expiry));
  };

  const handleCurrentPriceChange = (value: number) => {
    setCurrentPrice(value);
    setPayoffData(generatePayoffData(legs, ticker, value, showLeaps));
  };

  const handleExpiryChange = (value: string) => {
    setExpiry(value);
    
    // Check if the new expiry is a LEAPS date
    const isLeaps = isLeapsExpiry(value);
    
    // Adjust premiums based on whether it's a LEAPS date
    if (showLeaps) {
      const adjustedLegs = legs.map(leg => ({
        ...leg,
        premium: calculateDefaultPremium(leg.strike, currentPrice, leg.type, isLeaps)
      }));
      setLegs(adjustedLegs);
      setPayoffData(generatePayoffData(adjustedLegs, ticker, currentPrice, showLeaps));
      setMetrics(calculateStrategyMetrics(adjustedLegs, showLeaps, value));
    }
  };

  const handleAddLeg = () => {
    const isLeaps = showLeaps && isLeapsExpiry(expiry);
    const newLeg: OptionLeg = {
      id: Date.now().toString(),
      type: 'call',
      action: 'buy',
      strike: currentPrice,
      premium: calculateDefaultPremium(currentPrice, currentPrice, 'call', isLeaps),
      quantity: 1
    };
    
    const newLegs = [...legs, newLeg];
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(newLegs, showLeaps, expiry));
    
    toast({
      title: "Leg Added",
      description: `Added ${newLeg.action} ${newLeg.type} option at strike $${newLeg.strike}`,
    });
  };

  const handleDeleteLeg = (id: string) => {
    const newLegs = legs.filter(leg => leg.id !== id);
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(newLegs, showLeaps, expiry));
  };

  const handleLegChange = (id: string, field: keyof OptionLeg, value: any) => {
    const newLegs = legs.map(leg => {
      if (leg.id === id) {
        // If changing the strike price, recalculate premium based on new strike
        if (field === 'strike' && showLeaps) {
          const isLeaps = isLeapsExpiry(expiry);
          return {
            ...leg,
            [field]: value,
            premium: calculateDefaultPremium(value, currentPrice, leg.type, isLeaps)
          };
        }
        return { ...leg, [field]: value };
      }
      return leg;
    });
    
    setLegs(newLegs);
    setPayoffData(generatePayoffData(newLegs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(newLegs, showLeaps, expiry));
  };

  const handleCalculate = () => {
    setPayoffData(generatePayoffData(legs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(legs, showLeaps, expiry));
    
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
    setPayoffData(generatePayoffData(legs, ticker, currentPrice, showLeaps));
    setMetrics(calculateStrategyMetrics(legs, showLeaps, expiry));
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
        showLeaps={showLeaps}
      />

      <StrategyHeader
        strategyName={getStrategyName(legs, showLeaps && isLeapsExpiry(expiry))}
        onAddLeg={handleAddLeg}
        showLeaps={showLeaps}
      />

      <LegTable
        legs={legs}
        onLegChange={handleLegChange}
        onDeleteLeg={handleDeleteLeg}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        draggedLeg={draggedLeg}
        showLeaps={showLeaps}
      />

      <Button onClick={handleCalculate} className="w-full sm:w-auto">
        Calculate Strategy Performance
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PayoffChart payoffData={payoffData} />
        <MetricsCard metrics={metrics} showLeaps={showLeaps} />
      </div>
    </div>
  );
};

export default StrategyBuilder;
