
import { useState, useEffect } from "react";
import { mockStocks } from "@/data/mockStockData";
import { mockOptionsData, leapsExpiryDates } from "@/components/trading/simulated/mockOptionsData";

export const useOptionSelection = () => {
  const [selectedTicker, setSelectedTicker] = useState("AAPL");
  const [optionType, setOptionType] = useState("call");
  const [expiryType, setExpiryType] = useState("standard");
  const [leapsExpiry, setLeapsExpiry] = useState("Jan 2026");
  const [strikePrice, setStrikePrice] = useState("150");
  const [quantity, setQuantity] = useState("1");
  const [selectedLeapsOption, setSelectedLeapsOption] = useState(null);

  // Stock options filtering
  const stockOptions = mockStocks.filter(stock => stock.type === 'stock' || stock.type === 'etf');

  // Update strike price when ticker or expiry type changes
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

  // Update selected LEAPS option when expiry or strike changes
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

  // Get available strikes based on selected ticker and expiry
  const getAvailableStrikes = () => {
    if (expiryType === "standard") {
      const baseStrike = mockOptionsData[selectedTicker]?.standard?.strike || 150;
      return Array.from({ length: 7 }, (_, i) => baseStrike + (i - 3) * 10);
    } else {
      return mockOptionsData[selectedTicker]?.leaps.filter(option => option.expiry === leapsExpiry).map(option => option.strike) || [];
    }
  };

  return {
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
    stockOptions,
    getAvailableStrikes
  };
};
