
interface Explanation {
  id: string;
  title: string;
  content: string;
}

const explanations: Record<string, Explanation> = {
  coveredCall: {
    id: "covered-call",
    title: "What's a covered call?",
    content: "A covered call is an options strategy where you sell call options while owning the underlying stock. By selling call options, you earn a premium that provides income, but in exchange, you limit your potential upside if the stock rises significantly above the strike price.\n\nKey benefits:\n• Generates income from existing stock holdings\n• Can provide some downside protection (equal to the premium received)\n• Works well in sideways or slightly bullish markets\n\nLimitations:\n• Caps your potential profit if the stock rises dramatically\n• Doesn't protect against significant downside beyond the premium received\n• Requires owning at least 100 shares of the underlying stock"
  },
  sentiment: {
    id: "sentiment",
    title: "What's sentiment?",
    content: "Market sentiment refers to the overall attitude or feeling that investors have toward a particular security or the market as a whole. It's a psychological factor that can significantly influence trading decisions and market movements.\n\nIn options trading, sentiment indicators help traders gauge whether market participants are generally bullish (expecting prices to rise) or bearish (expecting prices to fall). This information can be valuable for making strategic decisions about which options to trade.\n\nCommon sentiment indicators include:\n• Put/Call Ratio: Compares the volume of put options to call options\n• Volatility Index (VIX): Often called the 'fear gauge'\n• Options Flow: Tracks large institutional options trades\n• Open Interest: Shows the number of outstanding options contracts"
  },
  greeks: {
    id: "greeks",
    title: "What are option Greeks?",
    content: "Option Greeks are mathematical values that show how an option's price will change in response to various factors. They're named after Greek letters and each measures a different aspect of option risk.\n\nThe main Greeks are:\n\n• Delta (Δ): Measures how much an option's price will change when the underlying stock price changes by $1. A delta of 0.50 means the option will move $0.50 when the stock moves $1.\n\n• Gamma (Γ): Measures the rate of change in delta. High gamma means delta can change quickly, making the position more volatile.\n\n• Theta (Θ): Represents time decay - how much value an option loses each day as it approaches expiration. Theta is negative for long options positions.\n\n• Vega (V): Measures sensitivity to changes in implied volatility. Higher vega means the option's price will change more when volatility changes.\n\n• Rho (ρ): Shows sensitivity to interest rate changes, though this is usually less important for short-term options."
  },
  ironCondor: {
    id: "iron-condor",
    title: "What's an Iron Condor?",
    content: "An iron condor is a market-neutral options strategy designed to profit from low volatility in the underlying asset. It consists of four options at different strike prices but with the same expiration date.\n\nStructure:\n• Sell an out-of-the-money (OTM) put\n• Buy a further OTM put (for protection)\n• Sell an OTM call\n• Buy a further OTM call (for protection)\n\nKey characteristics:\n• Maximum profit occurs when the underlying asset closes between the two sold strikes at expiration\n• Limited risk (defined by the difference between strikes minus the net credit received)\n• Works best in low-volatility, range-bound markets\n• Profits from time decay and decreased volatility"
  },
  volatility: {
    id: "volatility",
    title: "What's volatility in options?",
    content: "Volatility in options trading refers to how much an underlying asset's price fluctuates over time. There are two main types of volatility that options traders track:\n\n• Historical (Realized) Volatility: The actual measured price movements of an asset over a specific past period.\n\n• Implied Volatility (IV): The market's forecast of likely movement in an asset's price as implied by current option prices. Higher implied volatility results in higher option prices.\n\nVolatility is crucial for options traders because:\n• It directly affects option prices (higher volatility = higher premiums)\n• It helps determine which strategies might be most profitable\n• Volatility tends to mean-revert over time\n• Sudden changes in volatility can dramatically affect options positions\n\nA 'volatility crush' occurs when implied volatility drops sharply (often after earnings announcements or other anticipated events), causing options to lose value quickly."
  }
};

export default explanations;
