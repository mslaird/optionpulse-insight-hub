
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StockSelectorProps {
  selectedStock: string;
  onSelectStock: (value: string) => void;
}

const StockSelector = ({ selectedStock, onSelectStock }: StockSelectorProps) => {
  // Mock data for popular stocks
  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "META", name: "Meta Platforms Inc." },
    { symbol: "NVDA", name: "NVIDIA Corp." },
    { symbol: "SPY", name: "SPDR S&P 500 ETF" },
    { symbol: "QQQ", name: "Invesco QQQ Trust" }
  ];

  return (
    <div className="w-full sm:w-64">
      <Select value={selectedStock} onValueChange={onSelectStock}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Stock" />
        </SelectTrigger>
        <SelectContent>
          {popularStocks.map((stock) => (
            <SelectItem key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - {stock.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StockSelector;
