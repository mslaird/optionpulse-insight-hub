
import React, { useState, useEffect } from "react";
import PayoffControls from "./payoff/PayoffControls";
import PayoffChart from "./payoff/PayoffChart";
import PayoffStats from "./payoff/PayoffStats";
import { generatePayoffData, enhancePayoffData } from "./payoff/payoffUtils";

const PayoffDiagramGenerator = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [strike, setStrike] = useState(250);
  const [premium, setPremium] = useState(5);
  const [strategy, setStrategy] = useState("call");
  const [payoffData, setPayoffData] = useState(() => generatePayoffData(250, 5, "call"));

  // Regenerate data when component mounts to ensure fresh data
  useEffect(() => {
    handleGeneratePayoff();
  }, []);

  const handleGeneratePayoff = () => {
    const freshData = generatePayoffData(strike, premium, strategy);
    setPayoffData(freshData);
    
    // Enhanced debugging
    console.log(`Generating ${strategy} payoff data with ${freshData.length} data points`);
    console.log(`Strike: $${strike}, Premium: $${premium}`);
    
    const breakEven = strategy === "call" ? strike + premium : strike - premium;
    console.log(`Break-even point at: $${breakEven.toFixed(2)}`);
    
    // Find if there's a data point exactly at break-even
    const breakEvenPoint = freshData.find(point => 
      Math.abs(point.stockPrice - breakEven) < 0.01
    );
    
    if (breakEvenPoint) {
      console.log("Break-even point included in data:", breakEvenPoint);
    } else {
      console.log("Warning: No exact break-even point found in dataset");
    }
  };

  const enhancedPayoffData = enhancePayoffData(payoffData);

  return (
    <div className="flex flex-col space-y-6">
      <PayoffControls
        ticker={ticker}
        setTicker={setTicker}
        strike={strike}
        setStrike={setStrike}
        premium={premium}
        setPremium={setPremium}
        strategy={strategy}
        setStrategy={setStrategy}
        onGeneratePayoff={handleGeneratePayoff}
      />
      
      <PayoffChart
        data={enhancedPayoffData}
        ticker={ticker}
        strategy={strategy}
        strike={strike}
        premium={premium}
      />
      
      <PayoffStats
        strategy={strategy}
        premium={premium}
        strike={strike}
      />
    </div>
  );
};

export default PayoffDiagramGenerator;
