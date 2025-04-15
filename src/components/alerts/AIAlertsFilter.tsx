
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, FilterX } from 'lucide-react';
import { useAIAlerts } from '@/contexts/AIAlertsContext';
import { getUniqueExpiryDates, getUniqueSymbols } from '@/data/mockAlertData';

const AIAlertsFilter = () => {
  const { 
    symbolFilter, 
    expiryFilter, 
    probabilityFilter,
    setSymbolFilter,
    setExpiryFilter,
    setProbabilityFilter,
    refreshAlerts
  } = useAIAlerts();
  
  const symbols = getUniqueSymbols();
  const expiryDates = getUniqueExpiryDates();
  
  const resetFilters = () => {
    setSymbolFilter('all');
    setExpiryFilter('all');
    setProbabilityFilter(0);
  };
  
  return (
    <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filter AI Predictions</h3>
        <Button
          variant="outline" 
          size="sm"
          onClick={resetFilters}
          className="text-xs"
        >
          <FilterX size={14} className="mr-1" />
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Symbol</label>
          <Select 
            value={symbolFilter} 
            onValueChange={setSymbolFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Symbols" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Symbols</SelectItem>
              {symbols.map(symbol => (
                <SelectItem key={symbol} value={symbol}>{symbol}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Expiry Date</label>
          <Select 
            value={expiryFilter} 
            onValueChange={setExpiryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Expiries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expiries</SelectItem>
              {expiryDates.map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">ITM Probability</label>
          <Select 
            value={probabilityFilter.toString()} 
            onValueChange={(val) => setProbabilityFilter(Number(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Probabilities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Probabilities</SelectItem>
              <SelectItem value="70">Above 70%</SelectItem>
              <SelectItem value="80">Above 80%</SelectItem>
              <SelectItem value="90">Above 90%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button 
            className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue-dark" 
            onClick={refreshAlerts}
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAlertsFilter;
