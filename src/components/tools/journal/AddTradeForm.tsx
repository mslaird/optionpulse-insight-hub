
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewTradeFormData } from "./types";
import DateField from "./form/DateField";
import TickerField from "./form/TickerField";
import StrategyField from "./form/StrategyField";
import ActionField from "./form/ActionField";
import NumberField from "./form/NumberField";
import ResultField from "./form/ResultField";
import NotesField from "./form/NotesField";

interface AddTradeFormProps {
  newTrade: NewTradeFormData;
  onTradeChange: (updatedTrade: NewTradeFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddTradeForm: React.FC<AddTradeFormProps> = ({
  newTrade,
  onTradeChange,
  onSubmit,
  onCancel
}) => {
  const handleFieldChange = <K extends keyof NewTradeFormData>(
    field: K,
    value: NewTradeFormData[K]
  ) => {
    onTradeChange({ ...newTrade, [field]: value });
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Add New Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <DateField 
            value={newTrade.date} 
            onChange={(value) => handleFieldChange('date', value)} 
          />
          
          <TickerField 
            value={newTrade.ticker} 
            onChange={(value) => handleFieldChange('ticker', value)} 
          />
          
          <StrategyField 
            value={newTrade.strategy} 
            onChange={(value) => handleFieldChange('strategy', value)} 
          />
          
          <ActionField 
            value={newTrade.action} 
            onChange={(value) => handleFieldChange('action', value)} 
          />
          
          <NumberField 
            id="trade-quantity"
            label="Quantity"
            value={newTrade.quantity}
            onChange={(value) => handleFieldChange('quantity', value)}
            min="1"
          />
          
          <NumberField 
            id="trade-premium"
            label="Premium ($)"
            value={newTrade.premium}
            onChange={(value) => handleFieldChange('premium', value)}
            min="0.01"
            step="0.01"
          />
          
          <NumberField 
            id="trade-strike"
            label="Strike Price ($)"
            value={newTrade.strike}
            onChange={(value) => handleFieldChange('strike', value)}
          />
          
          <div className="space-y-2">
            <label htmlFor="trade-expiry">Expiry Date</label>
            <input
              id="trade-expiry"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={newTrade.expiryDate}
              onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
            />
          </div>
          
          <ResultField 
            value={newTrade.result} 
            onChange={(value) => handleFieldChange('result', value)} 
          />
          
          {newTrade.result !== 'open' && (
            <NumberField 
              id="trade-pnl"
              label="Profit/Loss ($)"
              value={newTrade.profitLoss}
              onChange={(value) => handleFieldChange('profitLoss', value)}
            />
          )}
        </div>
        
        <NotesField 
          value={newTrade.notes} 
          onChange={(value) => handleFieldChange('notes', value)} 
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Add Trade</Button>
      </CardFooter>
    </Card>
  );
};

export default AddTradeForm;
