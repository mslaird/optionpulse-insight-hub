
import { useState, useEffect } from "react";
import { DollarSign, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStocks } from "@/data/mockStockData";
import { cn } from "@/lib/utils";
import { mockLeapsAlerts } from "@/data/mockAlertData";
import { Badge } from "@/components/ui/badge";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

// Import smaller components
import AccountSummary from "./simulated/AccountSummary";
import ExpiryTypeSelector from "./simulated/ExpiryTypeSelector";
import LeapsAlert from "./simulated/LeapsAlert";
import OptionForm from "./simulated/OptionForm";
import LeapsOptionDetails from "./simulated/LeapsOptionDetails";
import SimulationButton from "./simulated/SimulationButton";
import TradeSummary from "./simulated/TradeSummary";
import TradeHistory from "./simulated/TradeHistory";

// Import constants and data
import { 
  mockOptionsData, 
  optionTypes, 
  leapsExpiryDates, 
  strategyExplanations 
} from "./simulated/mockOptionsData";

const SimulatedTrading = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTradeSummary, setShowTradeSummary] = useState(false);
  const [accountValue, setAccountValue] = useState(100000);

  const [selectedTicker, setSelectedTicker] = useState("AAPL");
  const [optionType, setOptionType] = useState("call");
  const [expiryType, setExpiryType] = useState("standard");
  const [leapsExpiry, setLeapsExpiry] = useState("Jan 2026");
  const [strikePrice, setStrikePrice] = useState("150");
  const [quantity, setQuantity] = useState("1");
  const [selectedLeapsOption, setSelectedLeapsOption] = useState(null);

  const [estimatedPnL, setEstimatedPnL] = useState({
    value: 0,
    percent: 0,
    greeks: {
      delta: 0,
      theta: 0
    }
  });

  const [tradeHistory, setTradeHistory] = useState([]);

  const stockOptions = mockStocks.filter(stock => stock.type === 'stock' || stock.type === 'etf');

  useEffect(() => {
    if (expiryType === "standard") {
      setStrikePrice(mockOptionsData[selectedTicker]?.standard?.strike.toString() || "150");
    } else if (expiryType === "leaps" && mockOptionsData[selectedTicker]?.leaps?.length > 0) {
      const firstLeap = mockOptionsData[selectedTicker].leaps[0];
      setStrikePrice(firstLeap.strike.toString());
      setLeapsExpiry(firstLeap.expiry);
      setSelectedLeapsOption(firstLeap);
    }
  }, [selectedTicker, expiryType]);

  useEffect(() => {
    if (expiryType === "leaps") {
      const leapsOptions = mockOptionsData[selectedTicker]?.leaps || [];
      const matchingOption = leapsOptions.find(option => option.expiry === leapsExpiry && option.strike === parseFloat(strikePrice));
      if (matchingOption) {
        setSelectedLeapsOption(matchingOption);
      } else if (leapsOptions.length > 0) {
        const closestOption = leapsOptions.filter(option => option.expiry === leapsExpiry).sort((a, b) => Math.abs(a.strike - parseFloat(strikePrice)) - Math.abs(b.strike - parseFloat(strikePrice)))[0];
        if (closestOption) {
          setSelectedLeapsOption(closestOption);
          setStrikePrice(closestOption.strike.toString());
        }
      }
    }
  }, [leapsExpiry, strikePrice, selectedTicker, expiryType]);

  const getAvailableStrikes = () => {
    if (expiryType === "standard") {
      const baseStrike = mockOptionsData[selectedTicker]?.standard?.strike || 150;
      return Array.from({ length: 7 }, (_, i) => baseStrike + (i - 3) * 10);
    } else {
      return mockOptionsData[selectedTicker]?.leaps.filter(option => option.expiry === leapsExpiry).map(option => option.strike) || [];
    }
  };

  const calculateEstimatedPnL = () => {
    const stockPrice = mockStocks.find(stock => stock.ticker === selectedTicker)?.price || 0;
    let optionPrice = 0;
    let delta = 0;
    let theta = 0;
    if (expiryType === "standard") {
      optionPrice = mockOptionsData[selectedTicker]?.standard?.bid || 0;
      delta = 0.5;
    } else if (selectedLeapsOption) {
      optionPrice = selectedLeapsOption.bid;
      delta = selectedLeapsOption.delta;
      theta = selectedLeapsOption.theta;
    }
    const qty = parseInt(quantity) || 0;
    const cost = optionPrice * 100 * qty;
    const projectedChange = optionType === "call" ? Math.max(0, stockPrice * 1.1 - parseFloat(strikePrice)) * 100 * qty : Math.max(0, parseFloat(strikePrice) - stockPrice * 0.9) * 100 * qty;
    const pnlValue = projectedChange - cost;
    const pnlPercent = cost > 0 ? pnlValue / cost * 100 : 0;
    return {
      value: pnlValue,
      percent: pnlPercent,
      greeks: {
        delta,
        theta
      }
    };
  };

  const calculateTotalCost = () => {
    let bid = 0;
    if (expiryType === "standard") {
      bid = mockOptionsData[selectedTicker]?.standard?.bid || 0;
    } else if (selectedLeapsOption) {
      bid = selectedLeapsOption.bid;
    }
    const qty = parseInt(quantity) || 0;
    return bid * 100 * qty;
  };

  const handleSimulateTrade = () => {
    setIsSimulating(true);
    setShowTradeSummary(false);

    setTimeout(() => {
      setIsSimulating(false);
      setShowTradeSummary(true);

      const cost = calculateTotalCost();
      const newAccountValue = accountValue - cost;
      setAccountValue(newAccountValue);

      const pnl = calculateEstimatedPnL();
      setEstimatedPnL(pnl);

      const newTrade = {
        id: Date.now(),
        ticker: selectedTicker,
        type: optionType,
        strike: strikePrice,
        expiry: expiryType === "standard" ? "30-90 days" : leapsExpiry,
        quantity: parseInt(quantity),
        cost: cost,
        timestamp: new Date().toLocaleString(),
        isLeaps: expiryType === "leaps"
      };
      setTradeHistory([newTrade, ...tradeHistory]);

      toast({
        title: `${expiryType === "leaps" ? "LEAPS" : "Standard"} Option Trade Simulated`,
        description: `${quantity} ${selectedTicker} $${strikePrice} ${optionType}, expiry: ${expiryType === "leaps" ? leapsExpiry : "30-90 days"}`,
        variant: "default",
        className: "bg-black/80 border-[#00B7EB]/30 text-white"
      });
    }, 1000);
  };

  const getRecommendedLeapsAlert = () => {
    return mockLeapsAlerts.find(alert => alert.symbol === selectedTicker && alert.itmProbability >= 65);
  };

  const recommendedAlert = getRecommendedLeapsAlert();

  const handleTestAlert = (alert) => {
    setSelectedTicker(alert.symbol);
    setOptionType(alert.type);
    setStrikePrice(alert.strikePrice.toString());
    const closestExpiry = leapsExpiryDates.find(exp => exp.label.includes(alert.expiryDate.split('/')[2]))?.value || "Jan 2026";
    setLeapsExpiry(closestExpiry);
  };

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
            mockOptionsData={mockOptionsData}
            quantity={quantity}
          />
          
          <TradeHistory trades={tradeHistory} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedTrading;
