
import React, { useState, useEffect } from "react";
import PayoffControls from "./payoff/PayoffControls";
import PayoffChart from "./payoff/PayoffChart";
import PayoffStats from "./payoff/PayoffStats";
import { generatePayoffData, enhancePayoffData } from "./payoff/payoffUtils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const PayoffDiagramGenerator = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [strike, setStrike] = useState(250);
  const [premium, setPremium] = useState(5);
  const [strategy, setStrategy] = useState("call");
  const [showLeaps, setShowLeaps] = useState(false);
  const [payoffData, setPayoffData] = useState(() => generatePayoffData(250, 5, "call"));

  // Regenerate data when component mounts to ensure fresh data
  useEffect(() => {
    handleGeneratePayoff();
  }, []);

  // Update prices when LEAPS mode changes
  useEffect(() => {
    if (showLeaps) {
      // LEAPS have higher premiums and different strike points
      if (ticker === "AAPL") {
        setStrike(250);
        setPremium(32.5);
      } else if (ticker === "SPY") {
        setStrike(500);
        setPremium(48.7);
      } else { // QQQ
        setStrike(400);
        setPremium(42.6);
      }
    } else {
      // Reset to standard options values
      setPremium(5);
      if (ticker === "AAPL") {
        setStrike(250);
      } else if (ticker === "SPY") {
        setStrike(475);
      } else { // QQQ
        setStrike(400);
      }
    }
    handleGeneratePayoff();
  }, [showLeaps, ticker]);

  const handleGeneratePayoff = () => {
    // For LEAPS, we want a wider price range and higher premiums
    const strikeAdjustment = showLeaps ? strike : strike;
    const premiumAdjustment = showLeaps ? premium : premium;
    
    const freshData = generatePayoffData(strikeAdjustment, premiumAdjustment, strategy, showLeaps);
    setPayoffData(freshData);
    
    // For debugging purposes
    console.log("Generated payoff data:", freshData);
    console.log("Break-even point should be visible at:", 
      strategy === "call" ? strikeAdjustment + premiumAdjustment : strikeAdjustment - premiumAdjustment);
    console.log("LEAPS mode:", showLeaps);
  };

  const enhancedPayoffData = enhancePayoffData(payoffData);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch 
            id="leaps-mode" 
            checked={showLeaps}
            onCheckedChange={setShowLeaps}
          />
          <Label htmlFor="leaps-mode" className="cursor-pointer">
            LEAPS Mode
            {showLeaps && (
              <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                <Zap size={14} className="mr-1" />
                ON
              </Badge>
            )}
          </Label>
        </div>
      </div>
      
      <PayoffControls
        ticker={ticker}
        setTicker={setTicker}
        strike={strike}
        setStrike={setStrike}
        premium={premium}
        setPremium={setPremium}
        strategy={strategy}
        setStrategy={setStrategy}
        showLeaps={showLeaps}
        onGeneratePayoff={handleGeneratePayoff}
      />
      
      <PayoffChart
        data={enhancedPayoffData}
        ticker={ticker}
        strategy={strategy}
        strike={strike}
        premium={premium}
        showLeaps={showLeaps}
      />
      
      <PayoffStats
        strategy={strategy}
        premium={premium}
        strike={strike}
        showLeaps={showLeaps}
      />
    </div>
  );
};

export default PayoffDiagramGenerator;
