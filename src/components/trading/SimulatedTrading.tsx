
import { useState } from "react";
import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSimulatedTrading } from "@/hooks/useSimulatedTrading";

// Import smaller components
import AccountSummary from "./simulated/AccountSummary";
import ExpiryTypeSelector from "./simulated/ExpiryTypeSelector";
import LeapsAlert from "./simulated/LeapsAlert";
import OptionForm from "./simulated/OptionForm";
import LeapsOptionDetails from "./simulated/LeapsOptionDetails";
import SimulationButton from "./simulated/SimulationButton";
import TradeSummary from "./simulated/TradeSummary";
import TradeHistory from "./simulated/TradeHistory";

// Import constants
import { optionTypes, leapsExpiryDates } from "./simulated/mockOptionsData";

const SimulatedTrading = () => {
  const {
    accountValue,
    isSimulating,
    showTradeSummary,
    selectedTicker,
    setSelectedTicker,
    optionType,
    setOptionType,
    expiryType,
    setExpiryType,
    leapsExpiry,
    setLeapsExpiry,
    strikePrice,
    setStrikePrice,
    quantity,
    setQuantity,
    selectedLeapsOption,
    estimatedPnL,
    tradeHistory,
    stockOptions,
    recommendedAlert,
    handleTestAlert,
    getAvailableStrikes,
    calculateTotalCost,
    handleSimulateTrade
  } = useSimulatedTrading();

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <DollarSign size={18} className="text-optionpulse-blue" />
          Simulated Trading
          {expiryType === "leaps" && (
            <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
              LEAPS
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <AccountSummary accountValue={accountValue} />
          
          <ExpiryTypeSelector 
            expiryType={expiryType} 
            setExpiryType={setExpiryType} 
          />
          
          {expiryType === "leaps" && recommendedAlert && (
            <LeapsAlert 
              alert={recommendedAlert} 
              onTestAlert={handleTestAlert} 
            />
          )}
          
          <OptionForm
            selectedTicker={selectedTicker}
            setSelectedTicker={setSelectedTicker}
            optionType={optionType}
            setOptionType={setOptionType}
            expiryType={expiryType}
            leapsExpiry={leapsExpiry}
            setLeapsExpiry={setLeapsExpiry}
            strikePrice={strikePrice}
            setStrikePrice={setStrikePrice}
            quantity={quantity}
            setQuantity={setQuantity}
            stockOptions={stockOptions}
            optionTypes={optionTypes}
            leapsExpiryDates={leapsExpiryDates}
            getAvailableStrikes={getAvailableStrikes}
          />
          
          {expiryType === "leaps" && selectedLeapsOption && (
            <LeapsOptionDetails option={selectedLeapsOption} />
          )}
          
          <SimulationButton 
            isSimulating={isSimulating} 
            onSimulate={handleSimulateTrade} 
          />
          
          <TradeSummary
            show={showTradeSummary}
            expiryType={expiryType}
            selectedTicker={selectedTicker}
            strikePrice={strikePrice}
            optionType={optionType}
            leapsExpiry={leapsExpiry}
            estimatedPnL={estimatedPnL}
            calculateTotalCost={calculateTotalCost}
            selectedLeapsOption={selectedLeapsOption}
            mockOptionsData={optionTypes}
            quantity={quantity}
          />
          
          <TradeHistory trades={tradeHistory} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedTrading;
