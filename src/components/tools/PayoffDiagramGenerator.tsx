
import React, { useState } from "react";
import PayoffControls from "./payoff/PayoffControls";
import PayoffChart from "./payoff/PayoffChart";
import PayoffStats from "./payoff/PayoffStats";
import { generatePayoffData, enhancePayoffData } from "./payoff/payoffUtils";

const PayoffDiagramGenerator = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [strike, setStrike] = useState(250);
  const [premium, setPremium] = useState(5);
  const [strategy, setStrategy] = useState("call");
  const [payoffData, setPayoffData] = useState(generatePayoffData(250, 5, "call"));

  const handleGeneratePayoff = () => {
    setPayoffData(generatePayoffData(strike, premium, strategy));
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
