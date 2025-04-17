
import { mockLeapsAlerts } from "@/data/mockAlertData";
import { leapsExpiryDates } from "@/components/trading/simulated/mockOptionsData";

export const useLeapsTrading = (
  selectedTicker: string, 
  setOptionType: (type: string) => void,
  setStrikePrice: (price: string) => void,
  setLeapsExpiry: (expiry: string) => void
) => {
  // Get recommended LEAPS alert for the selected ticker
  const getRecommendedLeapsAlert = () => {
    return mockLeapsAlerts.find(alert => alert.symbol === selectedTicker && alert.itmProbability >= 65);
  };

  const recommendedAlert = getRecommendedLeapsAlert();

  // Test an alert by setting form values to match the alert
  const handleTestAlert = (alert) => {
    // Instead of setting the ticker, we'll just use the form setter functions to update other values
    setOptionType(alert.type);
    setStrikePrice(alert.strikePrice.toString());
    // Find closest expiry date in the available options
    const closestExpiry = leapsExpiryDates.find(exp => exp.label.includes(alert.expiryDate.split('/')[2]))?.value || "Jan 2026";
    setLeapsExpiry(closestExpiry);
  };

  return {
    recommendedAlert,
    handleTestAlert
  };
};

