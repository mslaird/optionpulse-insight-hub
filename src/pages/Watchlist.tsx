
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import WatchlistHeader from "@/components/watchlist/WatchlistHeader";
import WatchlistForm from "@/components/watchlist/WatchlistForm";
import WatchlistTable, { WatchlistItem, WatchlistItemType } from "@/components/watchlist/WatchlistTable";
import MarketMoversCard from "@/components/watchlist/MarketMoversCard";

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
        <WatchlistHeader />

        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-medium">My Watchlist</CardTitle>
            <WatchlistForm 
              newSymbol={newSymbol}
              setNewSymbol={setNewSymbol}
              addToWatchlist={addToWatchlist}
            />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-sidebar mb-6">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="stock">Stocks</TabsTrigger>
                <TabsTrigger value="option">Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <WatchlistTable 
                  items={filteredItems}
                  removeFromWatchlist={removeFromWatchlist}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <MarketMoversCard />
      </div>
    </Layout>
  );
};

export default Watchlist;
