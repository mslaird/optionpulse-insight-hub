
import { OptionsChainData, OptionContract, OptionStrategy } from "@/types/options";

export const createMockOptionsData = (symbol: string, expirationDate?: string): OptionsChainData => {
  const currentDate = new Date();
  const expiryDate = expirationDate || new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const mockOptions: OptionContract[] = [
    {
      strike: 175,
      type: 'CALL',
      lastPrice: 5.8,
      bid: 5.65,
      ask: 5.95,
      change: 0.3,
      volume: 1200,
      openInterest: 4500,
      iv: 25.5,
      opportunity: "covered-call",
      premium: "high",
      moneyness: "itm",
      delta: 0.65,
      gamma: 0.05,
      theta: -0.08,
      vega: 0.12,
      expiryDate: expiryDate
    },
    {
      strike: 180,
      type: 'CALL',
      lastPrice: 3.2,
      bid: 3.1,
      ask: 3.3,
      change: -0.1,
      volume: 950,
      openInterest: 3800,
      iv: 22.8,
      opportunity: null,
      premium: "medium",
      moneyness: "atm",
      delta: 0.52,
      gamma: 0.07,
      theta: -0.09,
      vega: 0.15,
      expiryDate: expiryDate
    },
    // ... Add more mock options as needed
  ];

  const mockStrategies: OptionStrategy[] = [
    {
      id: "1",
      name: "Covered Call",
      type: "covered-call",
      legs: [],
      netCreditDebit: 5.8,
      isCredit: true,
      maxProfit: 580,
      maxLoss: 17500,
      breakEven: [169.2],
      itmProbability: 65,
      delta: 0.65,
      gamma: 0.05,
      theta: -0.08,
      vega: 0.12
    },
    {
      id: "2",
      name: "Cash-Secured Put",
      type: "cash-secured-put",
      legs: [],
      netCreditDebit: 1.2,
      isCredit: true,
      maxProfit: 120,
      maxLoss: 16880,
      breakEven: [168.8],
      itmProbability: 25,
      delta: -0.25,
      gamma: 0.05,
      theta: -0.06,
      vega: 0.11
    }
  ];

  return {
    currentPrice: symbol === 'AAPL' ? 180.75 : 150.0,
    options: mockOptions,
    strategies: mockStrategies
  };
};
