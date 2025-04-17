import { OptionContract, OptionStrategy } from "@/types/options";

// Mock data for single leg options
export const optionContracts: OptionContract[] = [
  // AAPL Calls
  { strike: 170, type: 'CALL', lastPrice: 12.85, bid: 12.70, ask: 12.95, change: 0.35, volume: 1243, openInterest: 5642, iv: 28.5, opportunity: "covered-call", premium: "high", moneyness: "itm", delta: 0.65, gamma: 0.04, theta: -0.15, vega: 0.32, expiryDate: "2025-05-16" },
  { strike: 175, type: 'CALL', lastPrice: 8.65, bid: 8.50, ask: 8.75, change: 0.20, volume: 2154, openInterest: 8934, iv: 27.8, opportunity: null, premium: "medium", moneyness: "itm", delta: 0.55, gamma: 0.05, theta: -0.18, vega: 0.35, expiryDate: "2025-05-16" },
  { strike: 180, type: 'CALL', lastPrice: 5.35, bid: 5.25, ask: 5.45, change: -0.15, volume: 3265, openInterest: 12456, iv: 26.4, opportunity: "covered-call", premium: "high", moneyness: "atm", delta: 0.48, gamma: 0.06, theta: -0.20, vega: 0.38, expiryDate: "2025-05-16" },
  { strike: 185, type: 'CALL', lastPrice: 3.15, bid: 3.05, ask: 3.25, change: -0.25, volume: 1876, openInterest: 9876, iv: 25.9, opportunity: "naked-call", premium: "medium", moneyness: "otm", delta: 0.38, gamma: 0.05, theta: -0.15, vega: 0.30, expiryDate: "2025-05-16" },
  { strike: 190, type: 'CALL', lastPrice: 1.75, bid: 1.65, ask: 1.80, change: -0.30, volume: 967, openInterest: 7653, iv: 24.7, opportunity: "naked-call", premium: "low", moneyness: "otm", delta: 0.28, gamma: 0.04, theta: -0.12, vega: 0.25, expiryDate: "2025-05-16" },
  
  // AAPL LEAPS Calls (2026-2027)
  { strike: 170, type: 'CALL', lastPrice: 35.45, bid: 35.30, ask: 35.60, change: 0.75, volume: 354, openInterest: 2341, iv: 32.8, opportunity: "leaps-call", premium: "high", moneyness: "itm", delta: 0.72, gamma: 0.02, theta: -0.05, vega: 0.65, expiryDate: "2027-01-15" },
  { strike: 200, type: 'CALL', lastPrice: 24.65, bid: 24.50, ask: 24.80, change: 0.55, volume: 287, openInterest: 1876, iv: 30.5, opportunity: "leaps-call", premium: "high", moneyness: "otm", delta: 0.58, gamma: 0.03, theta: -0.04, vega: 0.72, expiryDate: "2027-01-15" },
  
  // AAPL Puts
  { strike: 170, type: 'PUT', lastPrice: 4.25, bid: 4.15, ask: 4.35, change: -0.20, volume: 876, openInterest: 4532, iv: 29.2, opportunity: "cash-secured-put", premium: "medium", moneyness: "otm", delta: -0.35, gamma: 0.04, theta: -0.14, vega: 0.28, expiryDate: "2025-05-16" },
  { strike: 175, type: 'PUT', lastPrice: 6.35, bid: 6.25, ask: 6.45, change: -0.15, volume: 1245, openInterest: 6543, iv: 28.5, opportunity: "cash-secured-put", premium: "high", moneyness: "otm", delta: -0.45, gamma: 0.05, theta: -0.17, vega: 0.32, expiryDate: "2025-05-16" },
  { strike: 180, type: 'PUT', lastPrice: 9.15, bid: 9.05, ask: 9.25, change: -0.10, volume: 2134, openInterest: 8765, iv: 27.9, opportunity: "cash-secured-put", premium: "high", moneyness: "atm", delta: -0.52, gamma: 0.06, theta: -0.19, vega: 0.35, expiryDate: "2025-05-16" },
  { strike: 185, type: 'PUT', lastPrice: 12.85, bid: 12.75, ask: 12.95, change: 0.25, volume: 1598, openInterest: 5432, iv: 29.5, opportunity: null, premium: "high", moneyness: "itm", delta: -0.62, gamma: 0.05, theta: -0.16, vega: 0.33, expiryDate: "2025-05-16" },
  { strike: 190, type: 'PUT', lastPrice: 17.45, bid: 17.35, ask: 17.55, change: 0.40, volume: 763, openInterest: 3421, iv: 31.2, opportunity: null, premium: "high", moneyness: "itm", delta: -0.72, gamma: 0.04, theta: -0.12, vega: 0.30, expiryDate: "2025-05-16" },
  
  // AAPL LEAPS Puts (2026-2027)
  { strike: 170, type: 'PUT', lastPrice: 22.35, bid: 22.20, ask: 22.50, change: -0.45, volume: 265, openInterest: 1543, iv: 33.6, opportunity: "leaps-put", premium: "high", moneyness: "otm", delta: -0.38, gamma: 0.02, theta: -0.04, vega: 0.58, expiryDate: "2027-01-15" },
  { strike: 150, type: 'PUT', lastPrice: 14.75, bid: 14.60, ask: 14.90, change: -0.35, volume: 187, openInterest: 965, iv: 31.8, opportunity: "leaps-put", premium: "high", moneyness: "otm", delta: -0.28, gamma: 0.01, theta: -0.03, vega: 0.52, expiryDate: "2027-01-15" },
];

// Mock data for option strategies
export const optionStrategies: OptionStrategy[] = [
  // Bull Put Spread
  {
    id: "bull-put-spread-1",
    name: "Bull Put Spread",
    type: "credit-spread",
    legs: [
      { strike: 170, type: 'PUT', lastPrice: 4.25, bid: 4.15, ask: 4.35, change: -0.20, volume: 876, openInterest: 4532, iv: 29.2, opportunity: "sell", premium: "medium", moneyness: "otm", delta: -0.35, gamma: 0.04, theta: -0.14, vega: 0.28, expiryDate: "2025-05-16" },
      { strike: 165, type: 'PUT', lastPrice: 2.75, bid: 2.65, ask: 2.85, change: -0.15, volume: 543, openInterest: 3210, iv: 28.7, opportunity: "buy", premium: "low", moneyness: "otm", delta: -0.25, gamma: 0.03, theta: -0.10, vega: 0.22, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 1.50,
    isCredit: true,
    maxProfit: 150,
    maxLoss: 350,
    breakEven: [168.50],
    itmProbability: 28,
    delta: 0.10,
    gamma: 0.01,
    theta: 0.04,
    vega: -0.06
  },
  // Bear Call Spread
  {
    id: "bear-call-spread-1",
    name: "Bear Call Spread",
    type: "credit-spread",
    legs: [
      { strike: 190, type: 'CALL', lastPrice: 1.75, bid: 1.65, ask: 1.80, change: -0.30, volume: 967, openInterest: 7653, iv: 24.7, opportunity: "sell", premium: "low", moneyness: "otm", delta: 0.28, gamma: 0.04, theta: -0.12, vega: 0.25, expiryDate: "2025-05-16" },
      { strike: 195, type: 'CALL', lastPrice: 0.85, bid: 0.80, ask: 0.90, change: -0.10, volume: 432, openInterest: 3245, iv: 23.8, opportunity: "buy", premium: "low", moneyness: "otm", delta: 0.18, gamma: 0.03, theta: -0.08, vega: 0.18, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 0.90,
    isCredit: true,
    maxProfit: 90,
    maxLoss: 410,
    breakEven: [190.90],
    itmProbability: 25,
    delta: -0.10,
    gamma: 0.01,
    theta: 0.04,
    vega: -0.07
  },
  // Bull Call Spread
  {
    id: "bull-call-spread-1",
    name: "Bull Call Spread",
    type: "debit-spread",
    legs: [
      { strike: 180, type: 'CALL', lastPrice: 5.35, bid: 5.25, ask: 5.45, change: -0.15, volume: 3265, openInterest: 12456, iv: 26.4, opportunity: "buy", premium: "high", moneyness: "atm", delta: 0.48, gamma: 0.06, theta: -0.20, vega: 0.38, expiryDate: "2025-05-16" },
      { strike: 185, type: 'CALL', lastPrice: 3.15, bid: 3.05, ask: 3.25, change: -0.25, volume: 1876, openInterest: 9876, iv: 25.9, opportunity: "sell", premium: "medium", moneyness: "otm", delta: 0.38, gamma: 0.05, theta: -0.15, vega: 0.30, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 2.20,
    isCredit: false,
    maxProfit: 280,
    maxLoss: 220,
    breakEven: [182.20],
    itmProbability: 45,
    delta: 0.10,
    gamma: 0.01,
    theta: -0.05,
    vega: 0.08
  },
  // Bear Put Spread
  {
    id: "bear-put-spread-1",
    name: "Bear Put Spread",
    type: "debit-spread",
    legs: [
      { strike: 180, type: 'PUT', lastPrice: 9.15, bid: 9.05, ask: 9.25, change: -0.10, volume: 2134, openInterest: 8765, iv: 27.9, opportunity: "buy", premium: "high", moneyness: "atm", delta: -0.52, gamma: 0.06, theta: -0.19, vega: 0.35, expiryDate: "2025-05-16" },
      { strike: 175, type: 'PUT', lastPrice: 6.35, bid: 6.25, ask: 6.45, change: -0.15, volume: 1245, openInterest: 6543, iv: 28.5, opportunity: "sell", premium: "high", moneyness: "otm", delta: -0.45, gamma: 0.05, theta: -0.17, vega: 0.32, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 2.80,
    isCredit: false,
    maxProfit: 220,
    maxLoss: 280,
    breakEven: [177.20],
    itmProbability: 40,
    delta: -0.07,
    gamma: 0.01,
    theta: -0.02,
    vega: 0.03
  },
  // Iron Condor
  {
    id: "iron-condor-1",
    name: "Iron Condor",
    type: "iron-condor",
    legs: [
      { strike: 190, type: 'CALL', lastPrice: 1.75, bid: 1.65, ask: 1.80, change: -0.30, volume: 967, openInterest: 7653, iv: 24.7, opportunity: "sell", premium: "low", moneyness: "otm", delta: 0.28, gamma: 0.04, theta: -0.12, vega: 0.25, expiryDate: "2025-05-16" },
      { strike: 195, type: 'CALL', lastPrice: 0.85, bid: 0.80, ask: 0.90, change: -0.10, volume: 432, openInterest: 3245, iv: 23.8, opportunity: "buy", premium: "low", moneyness: "otm", delta: 0.18, gamma: 0.03, theta: -0.08, vega: 0.18, expiryDate: "2025-05-16" },
      { strike: 170, type: 'PUT', lastPrice: 4.25, bid: 4.15, ask: 4.35, change: -0.20, volume: 876, openInterest: 4532, iv: 29.2, opportunity: "sell", premium: "medium", moneyness: "otm", delta: -0.35, gamma: 0.04, theta: -0.14, vega: 0.28, expiryDate: "2025-05-16" },
      { strike: 165, type: 'PUT', lastPrice: 2.75, bid: 2.65, ask: 2.85, change: -0.15, volume: 543, openInterest: 3210, iv: 28.7, opportunity: "buy", premium: "low", moneyness: "otm", delta: -0.25, gamma: 0.03, theta: -0.10, vega: 0.22, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 2.00,
    isCredit: true,
    maxProfit: 200,
    maxLoss: 300,
    breakEven: [168.00, 192.00],
    itmProbability: 20,
    delta: 0.02,
    gamma: 0.01,
    theta: 0.08,
    vega: -0.10
  },
  // Long Straddle
  {
    id: "straddle-1",
    name: "Long Straddle",
    type: "straddle",
    legs: [
      { strike: 180, type: 'CALL', lastPrice: 5.35, bid: 5.25, ask: 5.45, change: -0.15, volume: 3265, openInterest: 12456, iv: 26.4, opportunity: "buy", premium: "high", moneyness: "atm", delta: 0.48, gamma: 0.06, theta: -0.20, vega: 0.38, expiryDate: "2025-05-16" },
      { strike: 180, type: 'PUT', lastPrice: 9.15, bid: 9.05, ask: 9.25, change: -0.10, volume: 2134, openInterest: 8765, iv: 27.9, opportunity: "buy", premium: "high", moneyness: "atm", delta: -0.52, gamma: 0.06, theta: -0.19, vega: 0.35, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 14.70,
    isCredit: false,
    maxProfit: "Unlimited",
    maxLoss: 1470,
    breakEven: [165.30, 194.70],
    itmProbability: 35,
    delta: -0.04,
    gamma: 0.12,
    theta: -0.39,
    vega: 0.73
  },
  // Long Strangle
  {
    id: "strangle-1",
    name: "Long Strangle",
    type: "strangle",
    legs: [
      { strike: 185, type: 'CALL', lastPrice: 3.15, bid: 3.05, ask: 3.25, change: -0.25, volume: 1876, openInterest: 9876, iv: 25.9, opportunity: "buy", premium: "medium", moneyness: "otm", delta: 0.38, gamma: 0.05, theta: -0.15, vega: 0.30, expiryDate: "2025-05-16" },
      { strike: 175, type: 'PUT', lastPrice: 6.35, bid: 6.25, ask: 6.45, change: -0.15, volume: 1245, openInterest: 6543, iv: 28.5, opportunity: "buy", premium: "high", moneyness: "otm", delta: -0.45, gamma: 0.05, theta: -0.17, vega: 0.32, expiryDate: "2025-05-16" },
    ],
    netCreditDebit: 9.70,
    isCredit: false,
    maxProfit: "Unlimited",
    maxLoss: 970,
    breakEven: [165.30, 194.70],
    itmProbability: 28,
    delta: -0.07,
    gamma: 0.10,
    theta: -0.32,
    vega: 0.62
  },
  // LEAPS Call
  {
    id: "leaps-call-1",
    name: "LEAPS Call",
    type: "leaps-call",
    legs: [
      { strike: 200, type: 'CALL', lastPrice: 24.65, bid: 24.50, ask: 24.80, change: 0.55, volume: 287, openInterest: 1876, iv: 30.5, opportunity: "leaps-call", premium: "high", moneyness: "otm", delta: 0.58, gamma: 0.03, theta: -0.04, vega: 0.72, expiryDate: "2027-01-15" },
    ],
    netCreditDebit: 24.80,
    isCredit: false,
    maxProfit: "Unlimited",
    maxLoss: 2480,
    breakEven: [224.80],
    itmProbability: 65,
    delta: 0.58,
    gamma: 0.03,
    theta: -0.04,
    vega: 0.72
  },
  // LEAPS Put
  {
    id: "leaps-put-1",
    name: "LEAPS Put",
    type: "leaps-put",
    legs: [
      { strike: 150, type: 'PUT', lastPrice: 14.75, bid: 14.60, ask: 14.90, change: -0.35, volume: 187, openInterest: 965, iv: 31.8, opportunity: "leaps-put", premium: "high", moneyness: "otm", delta: -0.28, gamma: 0.01, theta: -0.03, vega: 0.52, expiryDate: "2027-01-15" },
    ],
    netCreditDebit: 14.90,
    isCredit: false,
    maxProfit: 15000,
    maxLoss: 1490,
    breakEven: [135.10],
    itmProbability: 25,
    delta: -0.28,
    gamma: 0.01,
    theta: -0.03,
    vega: 0.52
  },
];
