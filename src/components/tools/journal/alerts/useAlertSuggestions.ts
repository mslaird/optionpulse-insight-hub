
import { useAIAlerts } from "@/contexts/AIAlertsContext";
import { AIAlert } from "@/data/mockAlertData";

export const useAlertSuggestions = () => {
  const { filteredAlerts } = useAIAlerts();
  
  const alertSuggestions = filteredAlerts
    .filter(alert => alert.itmProbability >= 0.7)
    .slice(0, 3);
  
  return {
    alertSuggestions,
    hasAlerts: alertSuggestions.length > 0
  };
};
