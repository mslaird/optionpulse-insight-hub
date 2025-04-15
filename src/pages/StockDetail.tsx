
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { stockDetailsData } from "@/data/stockDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, TrendingUp, Star, BarChart4, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartTooltip from "@/components/tooltips/ChartTooltip"; // Changed from { ChartTooltip } to default import
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const StockDetail = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const [stockDetail, setStockDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    if (ticker) {
      // In a real app, this would be an API call
      const stockInfo = stockDetailsData[ticker.toUpperCase()];
      if (stockInfo) {
        setStockDetail(stockInfo);
        setLoading(false);
      } else {
        toast.error("Stock not found");
        navigate("/watchlist");
      }
    }
  }, [ticker, navigate]);

  const handleAddToWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    if (!isWatchlisted) {
      toast.success(`${stockDetail.ticker} added to watchlist`);
    } else {
      toast.success(`${stockDetail.ticker} removed from watchlist`);
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}T`;
    }
    return `$${marketCap.toFixed(2)}B`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in pb-12">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              {stockDetail.name} 
              <span className="text-xl text-muted-foreground font-mono">
                ({stockDetail.ticker})
              </span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline" className="bg-muted/30">{stockDetail.sector}</Badge>
              <span className="text-sm text-muted-foreground">{stockDetail.industry}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Price History</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">${stockDetail.historicalData[0].close.toFixed(2)}</span>
                <span className={cn(
                  "flex items-center text-sm",
                  stockDetail.historicalData[0].close > stockDetail.historicalData[1].close 
                    ? "text-accent text-glow-green" 
                    : "text-destructive text-glow-red"
                )}>
                  {(((stockDetail.historicalData[0].close - stockDetail.historicalData[1].close) / stockDetail.historicalData[1].close) * 100).toFixed(2)}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[...stockDetail.historicalData].reverse()}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis 
                      dataKey="date"
                      tickFormatter={formatDate}
                      stroke="#718096"
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value}`}
                      stroke="#718096"
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip
                              label={new Date(label).toLocaleDateString()}
                              payload={[
                                {
                                  name: "Open",
                                  value: `$${payload[0].payload.open.toFixed(2)}`,
                                  color: "#63b3ed"
                                },
                                {
                                  name: "Close",
                                  value: `$${payload[0].payload.close.toFixed(2)}`,
                                  color: "#4fd1c5"
                                },
                                {
                                  name: "High",
                                  value: `$${payload[0].payload.high.toFixed(2)}`,
                                  color: "#68d391"
                                },
                                {
                                  name: "Low",
                                  value: `$${payload[0].payload.low.toFixed(2)}`,
                                  color: "#fc8181"
                                },
                                {
                                  name: "Volume",
                                  value: formatNumber(payload[0].payload.volume),
                                  color: "#b794f4"
                                }
                              ]}
                            />
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#4fd1c5" 
                      strokeWidth={2} 
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Trading Info</CardTitle>
              <Button 
                variant={isWatchlisted ? "default" : "outline"}
                className={isWatchlisted ? "bg-optionpulse-blue hover:bg-optionpulse-blue/80" : ""}
                onClick={handleAddToWatchlist}
              >
                <Star size={16} className={cn("mr-1", isWatchlisted ? "fill-current" : "")} />
                {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Market Cap</p>
                    <p className="font-semibold">{formatMarketCap(stockDetail.marketCap)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">P/E Ratio</p>
                    <p className="font-semibold">{stockDetail.peRatio.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">EPS</p>
                    <p className="font-semibold">${stockDetail.eps.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Dividend Yield</p>
                    <p className="font-semibold">{stockDetail.dividendYield ? `${(stockDetail.dividendYield * 100).toFixed(2)}%` : 'N/A'}</p>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Daily Range</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${stockDetail.historicalData[0].low.toFixed(2)}</span>
                    <div className="h-1 w-3/4 bg-muted/50 rounded-full mx-2 relative">
                      <div 
                        className="absolute h-full bg-optionpulse-blue rounded-full" 
                        style={{ 
                          width: `${((stockDetail.historicalData[0].close - stockDetail.historicalData[0].low) / (stockDetail.historicalData[0].high - stockDetail.historicalData[0].low)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm">${stockDetail.historicalData[0].high.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Options Data</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Total Volume</p>
                      <p className="font-medium">{formatNumber(stockDetail.optionsData.totalVolume)}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Implied Volatility</p>
                      <p className="font-medium">{stockDetail.optionsData.impliedVolatility.toFixed(1)}%</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Call/Put Ratio</p>
                      <p className="font-medium">{stockDetail.optionsData.callPutRatio.toFixed(2)}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Call Volume</p>
                      <p className="font-medium">{formatNumber(stockDetail.optionsData.callVolume)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-sidebar mb-0">
                <TabsTrigger value="overview" className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="options" className="flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>Options Activity</span>
                </TabsTrigger>
                <TabsTrigger value="fundamentals" className="flex items-center gap-1">
                  <BarChart4 size={16} />
                  <span>Fundamentals</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About {stockDetail.name}</h3>
                  <p className="text-muted-foreground">
                    {stockDetail.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium border-b border-border pb-1">Company Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Founded</p>
                        <p>{stockDetail.yearFounded}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Employees</p>
                        <p>{formatNumber(stockDetail.employees)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">CEO</p>
                        <p>{stockDetail.ceo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Headquarters</p>
                        <p>{stockDetail.headquarters}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <a href={stockDetail.website} target="_blank" rel="noopener noreferrer">
                        <Globe size={14} className="mr-1" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium border-b border-border pb-1">Trade Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Sector</p>
                        <p>{stockDetail.sector}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Industry</p>
                        <p>{stockDetail.industry}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Market Cap</p>
                        <p>{formatMarketCap(stockDetail.marketCap)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">P/E Ratio</p>
                        <p>{stockDetail.peRatio.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="options" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Options Overview</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-sidebar-accent rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Call Volume</h4>
                        <p className="text-2xl font-semibold">{formatNumber(stockDetail.optionsData.callVolume)}</p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {((stockDetail.optionsData.callVolume / stockDetail.optionsData.totalVolume) * 100).toFixed(1)}% of total
                        </div>
                      </div>
                      <div className="bg-sidebar-accent rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Put Volume</h4>
                        <p className="text-2xl font-semibold">{formatNumber(stockDetail.optionsData.putVolume)}</p>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {((stockDetail.optionsData.putVolume / stockDetail.optionsData.totalVolume) * 100).toFixed(1)}% of total
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Call/Put Ratio</h4>
                      <div className="flex items-center bg-sidebar-accent rounded-lg p-4">
                        <div className="flex-1">
                          <p className="text-2xl font-semibold">{stockDetail.optionsData.callPutRatio.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {stockDetail.optionsData.callPutRatio > 1 
                              ? "Bullish sentiment (more calls than puts)" 
                              : "Bearish sentiment (more puts than calls)"}
                          </p>
                        </div>
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <TrendingUp 
                            size={24} 
                            className={cn(
                              stockDetail.optionsData.callPutRatio > 1 
                                ? "text-accent" 
                                : "text-destructive"
                            )} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Option Strikes</h3>
                    <div className="space-y-3">
                      {stockDetail.optionsData.topStrikes.map((strike, index) => (
                        <div key={index} className="bg-sidebar-accent rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "mr-2",
                                  strike.type === 'call' ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                                )}
                              >
                                {strike.type.toUpperCase()}
                              </Badge>
                              <span className="font-medium">${strike.strike}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              OI: {formatNumber(strike.openInterest)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatNumber(strike.volume)}</p>
                            <p className="text-xs text-muted-foreground">volume</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-sidebar-accent rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">Implied Volatility</h4>
                      <p className="text-2xl font-semibold">{stockDetail.optionsData.impliedVolatility.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stockDetail.optionsData.impliedVolatility > 30 
                          ? "High volatility - greater price swings expected" 
                          : "Moderate volatility - normal price action expected"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fundamentals" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-sidebar-accent rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Market Cap</h4>
                    <p className="text-2xl font-semibold">{formatMarketCap(stockDetail.marketCap)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stockDetail.marketCap > 200 ? "Large Cap" : stockDetail.marketCap > 10 ? "Mid Cap" : "Small Cap"} company
                    </p>
                  </div>
                  
                  <div className="bg-sidebar-accent rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">P/E Ratio</h4>
                    <p className="text-2xl font-semibold">{stockDetail.peRatio.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stockDetail.peRatio > 25 ? "Above industry average" : "Below industry average"}
                    </p>
                  </div>
                  
                  <div className="bg-sidebar-accent rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">EPS</h4>
                    <p className="text-2xl font-semibold">${stockDetail.eps.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earnings per share
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-sidebar-accent rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Company Information</h4>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Founded</p>
                        <p>{stockDetail.yearFounded}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Employees</p>
                        <p>{formatNumber(stockDetail.employees)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">CEO</p>
                        <p>{stockDetail.ceo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Headquarters</p>
                        <p>{stockDetail.headquarters}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-sidebar-accent rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Dividend Information</h4>
                    <div className="mt-4">
                      <div className="space-y-1 mb-4">
                        <p className="text-xs text-muted-foreground">Dividend Yield</p>
                        <p className="text-2xl font-semibold">
                          {stockDetail.dividendYield ? `${(stockDetail.dividendYield * 100).toFixed(2)}%` : 'N/A'}
                        </p>
                      </div>
                      
                      {stockDetail.dividendYield ? (
                        <div className="text-xs text-muted-foreground">
                          A $10,000 investment would yield approximately ${(10000 * stockDetail.dividendYield).toFixed(2)} annually in dividends
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          This company does not currently pay dividends to shareholders
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StockDetail;
