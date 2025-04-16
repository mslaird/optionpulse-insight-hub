
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewTradeFormData } from "./types";

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
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Add New Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="trade-date">Date</Label>
            <Input
              id="trade-date"
              type="date"
              value={newTrade.date}
              onChange={(e) => onTradeChange({...newTrade, date: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-ticker">Ticker</Label>
            <Select 
              value={newTrade.ticker} 
              onValueChange={(value) => onTradeChange({...newTrade, ticker: value})}
            >
              <SelectTrigger id="trade-ticker">
                <SelectValue placeholder="Select ticker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="SPY">SPY</SelectItem>
                <SelectItem value="QQQ">QQQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-strategy">Strategy</Label>
            <Select 
              value={newTrade.strategy} 
              onValueChange={(value) => onTradeChange({...newTrade, strategy: value})}
            >
              <SelectTrigger id="trade-strategy">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Long Call">Long Call</SelectItem>
                <SelectItem value="Long Put">Long Put</SelectItem>
                <SelectItem value="Bull Call Spread">Bull Call Spread</SelectItem>
                <SelectItem value="Bear Put Spread">Bear Put Spread</SelectItem>
                <SelectItem value="Iron Condor">Iron Condor</SelectItem>
                <SelectItem value="Covered Call">Covered Call</SelectItem>
                <SelectItem value="Cash-Secured Put">Cash-Secured Put</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-action">Action</Label>
            <Select 
              value={newTrade.action} 
              onValueChange={(value: 'buy' | 'sell') => onTradeChange({...newTrade, action: value})}
            >
              <SelectTrigger id="trade-action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-quantity">Quantity</Label>
            <Input
              id="trade-quantity"
              type="number"
              min="1"
              value={newTrade.quantity}
              onChange={(e) => onTradeChange({...newTrade, quantity: parseInt(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-premium">Premium ($)</Label>
            <Input
              id="trade-premium"
              type="number"
              min="0.01"
              step="0.01"
              value={newTrade.premium}
              onChange={(e) => onTradeChange({...newTrade, premium: parseFloat(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-strike">Strike Price ($)</Label>
            <Input
              id="trade-strike"
              type="number"
              value={newTrade.strike}
              onChange={(e) => onTradeChange({...newTrade, strike: parseFloat(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-expiry">Expiry Date</Label>
            <Input
              id="trade-expiry"
              type="text"
              value={newTrade.expiryDate}
              onChange={(e) => onTradeChange({...newTrade, expiryDate: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trade-result">Result</Label>
            <Select 
              value={newTrade.result} 
              onValueChange={(value: 'profit' | 'loss' | 'open') => onTradeChange({...newTrade, result: value})}
            >
              <SelectTrigger id="trade-result">
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
                <SelectItem value="open">Open</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {newTrade.result !== 'open' && (
            <div className="space-y-2">
              <Label htmlFor="trade-pnl">Profit/Loss ($)</Label>
              <Input
                id="trade-pnl"
                type="number"
                value={newTrade.profitLoss}
                onChange={(e) => onTradeChange({...newTrade, profitLoss: parseFloat(e.target.value)})}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2 mt-4">
          <Label htmlFor="trade-notes">Notes</Label>
          <Textarea
            id="trade-notes"
            placeholder="Enter any notes about this trade..."
            value={newTrade.notes}
            onChange={(e) => onTradeChange({...newTrade, notes: e.target.value})}
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Add Trade</Button>
      </CardFooter>
    </Card>
  );
};

export default AddTradeForm;
