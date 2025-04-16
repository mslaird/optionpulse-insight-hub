
export const mockOptionsData = {
  AAPL: {
    standard: {
      bid: 10,
      ask: 11,
      strike: 150
    },
    leaps: [{
      bid: 32.5,
      ask: 34.0,
      strike: 200,
      expiry: "Jan 2026",
      iv: 18.5,
      delta: 0.65,
      theta: -0.045
    }, {
      bid: 48.7,
      ask: 50.2,
      strike: 250,
      expiry: "Jan 2026",
      iv: 20.2,
      delta: 0.72,
      theta: -0.038
    }, {
      bid: 29.3,
      ask: 30.6,
      strike: 300,
      expiry: "Jun 2026",
      iv: 22.4,
      delta: 0.58,
      theta: -0.032
    }, {
      bid: 58.4,
      ask: 60.1,
      strike: 280,
      expiry: "Jan 2027",
      iv: 16.8,
      delta: 0.78,
      theta: -0.025
    }]
  },
  SPY: {
    standard: {
      bid: 8.5,
      ask: 9.2,
      strike: 450
    },
    leaps: [{
      bid: 45.2,
      ask: 46.8,
      strike: 480,
      expiry: "Jan 2026",
      iv: 15.8,
      delta: 0.61,
      theta: -0.042
    }, {
      bid: 63.5,
      ask: 65.2,
      strike: 550,
      expiry: "Jan 2026",
      iv: 18.5,
      delta: 0.56,
      theta: -0.036
    }, {
      bid: 38.9,
      ask: 40.3,
      strike: 600,
      expiry: "Jun 2026",
      iv: 21.2,
      delta: 0.45,
      theta: -0.029
    }, {
      bid: 75.6,
      ask: 77.3,
      strike: 520,
      expiry: "Jan 2027",
      iv: 16.5,
      delta: 0.69,
      theta: -0.022
    }]
  },
  TSLA: {
    standard: {
      bid: 15.2,
      ask: 16.0,
      strike: 240
    },
    leaps: []
  },
  MSFT: {
    standard: {
      bid: 12.5,
      ask: 13.1,
      strike: 325
    },
    leaps: []
  },
  QQQ: {
    standard: {
      bid: 13.8,
      ask: 14.5,
      strike: 400
    },
    leaps: [{
      bid: 42.6,
      ask: 44.2,
      strike: 420,
      expiry: "Jan 2026",
      iv: 17.2,
      delta: 0.58,
      theta: -0.040
    }, {
      bid: 56.8,
      ask: 58.4,
      strike: 500,
      expiry: "Jan 2026",
      iv: 19.8,
      delta: 0.52,
      theta: -0.035
    }, {
      bid: 35.4,
      ask: 37.1,
      strike: 550,
      expiry: "Jun 2026",
      iv: 22.3,
      delta: 0.41,
      theta: -0.027
    }, {
      bid: 68.5,
      ask: 70.2,
      strike: 480,
      expiry: "Jan 2027",
      iv: 15.9,
      delta: 0.64,
      theta: -0.020
    }]
  }
};

export const optionTypes = [{
  value: "call",
  label: "Call"
}, {
  value: "put",
  label: "Put"
}];

export const expiryTypes = [{
  value: "standard",
  label: "Standard (30-90 days)"
}, {
  value: "leaps",
  label: "LEAPS (Long-term)"
}];

export const leapsExpiryDates = [{
  value: "Jan 2026",
  label: "January 2026"
}, {
  value: "Jun 2026",
  label: "June 2026"
}, {
  value: "Jan 2027",
  label: "January 2027"
}];

export const strategyExplanations = {
  nakedCall: {
    title: "Naked Call",
    content: "A naked call is selling a call option without owning the underlying stock, risking unlimited loss if the stock price rises significantly. Example: Sell AAPL $150 call for $5 premium; if AAPL rises to $200, you must buy at $200 to sell at $150, losing $45/share."
  },
  nakedPut: {
    title: "Naked Put",
    content: "A naked put is selling a put option without holding cash to buy the stock, risking loss if the stock price falls. Example: Sell AAPL $150 put for $5 premium; if AAPL drops to $100, you must buy at $150, losing $45/share."
  },
  cashSecuredPut: {
    title: "Cash-Secured Put",
    content: "A cash-secured put is selling a put option while holding enough cash to buy the stock if assigned. Example: Sell AAPL $150 put for $5 premium, hold $15,000 cash; if AAPL drops to $100, you buy at $150, but your cost basis is $145 after the premium."
  },
  coveredCall: {
    title: "Covered Call",
    content: "A covered call is selling a call option while owning the underlying stock, earning a premium but capping upside potential. Example: Own 100 AAPL shares at $150, sell $160 call for $5 premium; if AAPL rises to $170, you sell at $160, missing $10/share but keeping the $5 premium."
  },
  leaps: {
    title: "LEAPS Options",
    content: "LEAPS (Long-term Equity Anticipation Securities) are options with expirations longer than a year. They provide leverage for long-term price movements with lower capital requirements than stock ownership. Example: Buy AAPL $250 call LEAPS expiring in Jan 2026 for $32, gaining exposure to $25,000 of stock with just $3,200."
  }
};
