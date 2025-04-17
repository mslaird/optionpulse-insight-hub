
export interface OptionContract {
  strike: number;
  type: 'CALL' | 'PUT';
  lastPrice: number;
  bid: number;
  ask: number;
  change: number;
  volume: number;
  openInterest: number;
  iv: number;
  opportunity: string | null;
  premium: string;
  moneyness: string;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
  itmProbability?: number;
  expiryDate: string;
}

export interface OptionStrategy {
  id: string;
  name: string;
  type: string;
  legs: OptionContract[];
  netCreditDebit: number;
  isCredit: boolean;
  maxProfit: number | string;
  maxLoss: number;
  breakEven: number[];
  itmProbability?: number;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
}

export interface OptionsChainData {
  options: OptionContract[];
  strategies: OptionStrategy[];
  currentPrice?: number;
}

export interface OptionsChainState {
  isAdvancedView: boolean;
  isPro: boolean;
  showProModal: boolean;
}
