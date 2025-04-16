
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface OptionFormProps {
  selectedTicker: string;
  setSelectedTicker: (ticker: string) => void;
  optionType: string;
  setOptionType: (type: string) => void;
  expiryType: string;
  leapsExpiry: string;
  setLeapsExpiry: (expiry: string) => void;
  strikePrice: string;
  setStrikePrice: (price: string) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  stockOptions: any[];
  optionTypes: any[];
  leapsExpiryDates: any[];
  getAvailableStrikes: () => number[];
}

const OptionForm = ({
  selectedTicker,
  setSelectedTicker,
  optionType,
  setOptionType,
  expiryType,
  leapsExpiry,
  setLeapsExpiry,
  strikePrice,
  setStrikePrice,
  quantity,
  setQuantity,
  stockOptions,
  optionTypes,
  leapsExpiryDates,
  getAvailableStrikes
}: OptionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker" className="text-sm text-muted-foreground">
            Select Ticker
          </Label>
          <Select value={selectedTicker} onValueChange={setSelectedTicker}>
            <SelectTrigger id="ticker" className="w-full bg-background/50">
              <SelectValue placeholder="Select Ticker" />
            </SelectTrigger>
            <SelectContent>
              {stockOptions
                .filter(
                  stock =>
                    expiryType !== "leaps" ||
                    (stock.ticker && stock.ticker in mockOptionsData &&
                      mockOptionsData[stock.ticker]?.leaps?.length > 0)
                )
                .map(stock => (
                  <SelectItem key={stock.id} value={stock.ticker}>
                    {stock.ticker} - {stock.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="optionType" className="text-sm text-muted-foreground">
            Option Type
          </Label>
          <Select value={optionType} onValueChange={setOptionType}>
            <SelectTrigger id="optionType" className="w-full bg-background/50">
              <SelectValue placeholder="Select Option Type" />
            </SelectTrigger>
            <SelectContent>
              {optionTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {expiryType === "leaps" && (
        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-sm text-muted-foreground">
            LEAPS Expiration
          </Label>
          <Select value={leapsExpiry} onValueChange={setLeapsExpiry}>
            <SelectTrigger id="expiry" className="w-full bg-background/50">
              <SelectValue placeholder="Select Expiration" />
            </SelectTrigger>
            <SelectContent>
              {leapsExpiryDates
                .filter(date => {
                  const hasOptions = mockOptionsData[selectedTicker]?.leaps?.some(
                    option => option.expiry === date.value
                  );
                  return hasOptions;
                })
                .map(date => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="strike" className="text-sm text-muted-foreground">
            Strike Price ($)
          </Label>
          {expiryType === "leaps" ? (
            <Select value={strikePrice} onValueChange={value => setStrikePrice(value)}>
              <SelectTrigger id="strike" className="w-full bg-background/50">
                <SelectValue placeholder="Select Strike" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableStrikes().map(strike => (
                  <SelectItem key={strike} value={strike.toString()}>
                    ${strike}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="strike"
              type="number"
              value={strikePrice}
              onChange={e => setStrikePrice(e.target.value)}
              className="bg-background/50"
            />
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm text-muted-foreground">
            Quantity (Contracts)
          </Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="bg-background/50"
          />
        </div>
      </div>
    </div>
  );
};

export default OptionForm;
