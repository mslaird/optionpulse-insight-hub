import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

type WatchlistItemType = "stock" | "option";

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  type: WatchlistItemType;
  price: number;
  priceChange: number;
  optionType?: "call" | "put";
  strikePrice?: number;
  expiryDate?: string;
}

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [newSymbol, setNewSymbol] = useState("");
  
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "stock",
      price: 173.25,
      priceChange: 2.15,
    },
    {
      id: "2",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      type: "stock",
      price: 328.79,
      priceChange: -1.45,
    },
    {
      id: "3",
      symbol: "SPY",
      name: "SPDR S&P 500 ETF Trust",
      type: "option",
      price: 12.45,
      priceChange: 0.75,
      optionType: "call",
      strikePrice: 420,
      expiryDate: "2025-06-20",
    },
    {
      id: "4",
      symbol: "TSLA",
      name: "Tesla, Inc.",
      type: "option",
      price: 8.30,
      priceChange: -0.50,
      optionType: "put",
      strikePrice: 180,
      expiryDate: "2025-05-15",
    },
    {
      id: "5",
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      type: "stock",
      price: 834.57,
      priceChange: 12.43,
    },
  ]);

  const addToWatchlist = () => {
    if (!newSymbol.trim()) return;
    
    const newItem: WatchlistItem = {
      id: Date.now().toString(),
      symbol: newSymbol.toUpperCase(),
      name: `${newSymbol.toUpperCase()} Corp.`,
      type: "stock",
      price: Math.random() * 200 + 50,
      priceChange: (Math.random() * 10) - 5,
    };
    
    setWatchlistItems([...watchlistItems, newItem]);
    setNewSymbol("");
    toast.success(`${newSymbol.toUpperCase()} added to watchlist`);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id));
    toast.success("Item removed from watchlist");
  };

  const filteredItems = activeTab === "all" 
    ? watchlistItems 
    : watchlistItems.filter(item => item.type === activeTab);

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Watchlist</h1>
          <p className="text-muted-foreground">
            Track your favorite stocks and options
          </p>
        </div>

        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-medium">My Watchlist</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add symbol (e.g., AAPL)"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                className="w-48 bg-muted/30 border-muted/30"
              />
              <Button 
                onClick={addToWatchlist}
                className="bg-optionpulse-blue hover:bg-optionpulse-blue/80"
              >
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-sidebar mb-6">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="stock">Stocks</TabsTrigger>
                <TabsTrigger value="option">Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredItems.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{item.symbol}</div>
                                <div className="text-xs text-muted-foreground">{item.name}</div>
                                {item.type === "option" && (
                                  <div className="text-xs mt-1">
                                    ${item.strikePrice} {item.optionType} · {item.expiryDate}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                item.type === "stock" 
                                  ? "bg-optionpulse-blue/20 text-optionpulse-blue" 
                                  : "bg-accent/20 text-accent"
                              }`}>
                                {item.type === "stock" ? "Stock" : "Option"}
                              </span>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className={`flex items-center ${
                                item.priceChange >= 0 
                                  ? "text-accent text-glow-green" 
                                  : "text-destructive text-glow-red"
                              }`}>
                                {item.priceChange >= 0 ? (
                                  <ArrowUpRight size={16} className="mr-1" />
                                ) : (
                                  <ArrowDownRight size={16} className="mr-1" />
                                )}
                                {Math.abs(item.priceChange).toFixed(2)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeFromWatchlist(item.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No items in watchlist. Add some symbols to track.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium relative flex items-center justify-between">
              Market Movers
              <div className="absolute top-0 right-0">
                <ExplanationTooltip 
                  title="Market Movers" 
                  content="Market Movers highlight the most significant price changes in the stock market. This section shows top gainers, top losers, and options with high implied volatility (IV). It helps traders quickly identify potential opportunities and market trends." 
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-sidebar-accent">
                <div className="relative flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Gainers</h3>
                  <div className="absolute top-0 right-0">
                    <ExplanationTooltip 
                      title="Top Gainers" 
                      content="Top Gainers represent stocks that have experienced the most significant percentage increase in price during the trading day. These stocks are showing strong positive momentum and could indicate bullish market sentiment or positive company-specific news." 
                    />
                  </div>
                </div>
                <Separator className="mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">NVDA</span>
                    <span className="text-accent text-glow-green flex items-center">
                      <ArrowUpRight size={14} className="mr-1" />
                      5.2%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">AMD</span>
                    <span className="text-accent text-glow-green flex items-center">
                      <ArrowUpRight size={14} className="mr-1" />
                      3.8%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">META</span>
                    <span className="text-accent text-glow-green flex items-center">
                      <ArrowUpRight size={14} className="mr-1" />
                      2.9%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-sidebar-accent">
                <div className="relative flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Losers</h3>
                  <div className="absolute top-0 right-0">
                    <ExplanationTooltip 
                      title="Top Losers" 
                      content="Top Losers represent stocks that have experienced the most significant percentage decrease in price during the trading day. These stocks are showing negative price movement and could indicate bearish market sentiment, potential challenges, or negative company-specific news." 
                    />
                  </div>
                </div>
                <Separator className="mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">INTC</span>
                    <span className="text-destructive text-glow-red flex items-center">
                      <ArrowDownRight size={14} className="mr-1" />
                      4.1%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">PYPL</span>
                    <span className="text-destructive text-glow-red flex items-center">
                      <ArrowDownRight size={14} className="mr-1" />
                      3.5%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">NFLX</span>
                    <span className="text-destructive text-glow-red flex items-center">
                      <ArrowDownRight size={14} className="mr-1" />
                      2.2%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-sidebar-accent">
                <div className="relative flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">High IV Options</h3>
                  <div className="absolute top-0 right-0">
                    <ExplanationTooltip 
                      title="High IV Options" 
                      content="High Implied Volatility (IV) options indicate higher expected price fluctuations. Options with high IV suggest increased market uncertainty or anticipated significant price movements. Traders often use these to assess potential trading opportunities or implement volatility-based strategies." 
                    />
                  </div>
                </div>
                <Separator className="mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">TSLA 200C</span>
                    <span>IV 85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">AAPL 190C</span>
                    <span>IV 65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">SPY 425P</span>
                    <span>IV 50%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Watchlist;
