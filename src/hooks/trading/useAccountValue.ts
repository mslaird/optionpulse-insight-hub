
import { useState } from "react";

export const useAccountValue = (initialValue: number = 100000) => {
  const [accountValue, setAccountValue] = useState(initialValue);
  
  const updateAccountValue = (newValue: number) => {
    setAccountValue(newValue);
  };

  const deductFromAccount = (amount: number) => {
    setAccountValue(accountValue - amount);
  };
  
  return {
    accountValue,
    updateAccountValue,
    deductFromAccount
  };
};
