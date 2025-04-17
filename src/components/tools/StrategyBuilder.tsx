
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { StrategyBuilderProps } from "./strategy/types";
import { getStrategyName, isLeapsExpiry } from "./strategy/strategyUtils";
import TickerSelector from "./strategy/TickerSelector";
import StrategyHeader from "./strategy/StrategyHeader";
import LegTable from "./strategy/LegTable";
import PayoffChart from "./strategy/PayoffChart";
import MetricsCard from "./strategy/MetricsCard";
import { useStrategyBuilder } from "./strategy/useStrategyBuilder";

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ showLeaps = false }) => {
  const {
    ticker,
    currentPrice,
    expiry,
    legs,
    payoffData,
    metrics,
    draggedLeg,
    handleTickerChange,
    handleCurrentPriceChange,
    handleExpiryChange,
    handleAddLeg,
    handleDeleteLeg,
    handleLegChange,
    handleCalculate,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useStrategyBuilder(showLeaps);

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
        <PayoffChart payoffData={payoffData} showLeaps={showLeaps} />
        <MetricsCard metrics={metrics} showLeaps={showLeaps} />
      </div>
    </div>
  );
};

export default StrategyBuilder;
