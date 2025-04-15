
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  CircleDollarSign,
  Calendar,
  FileText
} from "lucide-react";
import { useAIAlerts } from "@/contexts/AIAlertsContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

interface Trade {
  id: string;
  date: string;
  ticker: string;
  strategy: string;
  action: 'buy' | 'sell';
  quantity: number;
  premium: number;
  strike: number;
  expiryDate: string;
  result: 'profit' | 'loss' | 'open';
  profitLoss: number;
  notes: string;
  relatedAlert?: string;
}

// Mock trades data
const initialTrades: Trade[] = [
  {
    id: '1',
    date: '2025-04-01',
    ticker: 'AAPL',
    strategy: 'Long Call',
    action: 'buy',
    quantity: 1,
    premium: 5.50,
    strike: 250,
    expiryDate: '2025-04-25',
    result: 'profit',
    profitLoss: 125,
    notes: 'Bought call before earnings announcement'
  },
  {
    id: '2',
    date: '2025-04-05',
    ticker: 'SPY',
    strategy: 'Bear Put Spread',
    action: 'buy',
    quantity: 2,
    premium: 3.75,
    strike: 475,
    expiryDate: '2025-05-16',
    result: 'loss',
    profitLoss: -150,
    notes: 'Market continued to rally against my position'
  },
  {
    id: '3',
    date: '2025-04-10',
    ticker: 'QQQ',
    strategy: 'Iron Condor',
    action: 'sell',
    quantity: 1,
    premium: 4.20,
    strike: 400,
    expiryDate: '2025-05-30',
    result: 'open',
    profitLoss: 0,
    notes: 'Volatility play ahead of tech earnings season'
  }
];

const TradeJournal = () => {
  const { toast } = useToast();
  const { alerts, filteredAlerts } = useAIAlerts();
  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [filterTicker, setFilterTicker] = useState<string>("all");
  const [filterResult, setFilterResult] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedTrade, setExpandedTrade] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);
  
  // New trade form state
  const [newTrade, setNewTrade] = useState<Omit<Trade, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    ticker: 'AAPL',
    strategy: 'Long Call',
    action: 'buy',
    quantity: 1,
    premium: 5,
    strike: 250,
    expiryDate: '2025-04-25',
    result: 'open',
    profitLoss: 0,
    notes: ''
  });

  // Load trades from localStorage
  useEffect(() => {
    const savedTrades = localStorage.getItem('tradeJournal');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  // Save trades to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tradeJournal', JSON.stringify(trades));
  }, [trades]);

  const handleAddTrade = () => {
    const newTradeWithId: Trade = {
      ...newTrade,
      id: Date.now().toString()
    };
    
    setTrades([newTradeWithId, ...trades]);
    setShowAddForm(false);
    
    toast({
      title: "Trade Added",
      description: `${newTrade.action === 'buy' ? 'Bought' : 'Sold'} ${newTrade.ticker} ${newTrade.strategy}`,
    });
    
    // Reset form
    setNewTrade({
      date: new Date().toISOString().slice(0, 10),
      ticker: 'AAPL',
      strategy: 'Long Call',
      action: 'buy',
      quantity: 1,
      premium: 5,
      strike: 250,
      expiryDate: '2025-04-25',
      result: 'open',
      profitLoss: 0,
      notes: ''
    });
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(trade => trade.id !== id));
    
    toast({
      title: "Trade Removed",
      description: "The trade has been deleted from your journal",
    });
  };

  const handleToggleDetails = (id: string) => {
    setExpandedTrade(expandedTrade === id ? null : id);
  };

  const filteredTrades = trades.filter(trade => {
    const matchesTicker = filterTicker === 'all' || trade.ticker === filterTicker;
    const matchesResult = filterResult === 'all' || trade.result === filterResult;
    return matchesTicker && matchesResult;
  });

  // Calculate statistics
  const totalTrades = trades.length;
  const closedTrades = trades.filter(t => t.result !== 'open').length;
  const profitTrades = trades.filter(t => t.result === 'profit').length;
  const lossTrades = trades.filter(t => t.result === 'loss').length;
  const winRate = closedTrades > 0 ? (profitTrades / closedTrades) * 100 : 0;
  const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  
  // Prepare chart data
  const profitByTicker = Object.entries(
    trades.reduce((acc, trade) => {
      acc[trade.ticker] = (acc[trade.ticker] || 0) + trade.profitLoss;
      return acc;
    }, {} as {[key: string]: number})
  ).map(([ticker, profit]) => ({ ticker, profit }));
  
  const tradesByStrategy = Object.entries(
    trades.reduce((acc, trade) => {
      acc[trade.strategy] = (acc[trade.strategy] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number})
  ).map(([strategy, count]) => ({ strategy, count }));

  // Prepare trade history chart data
  const tradeHistoryData = [...trades]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((trade, index, array) => {
      // Calculate running sum of profit/loss
      const runningProfitLoss = array
        .slice(0, index + 1)
        .reduce((sum, t) => sum + t.profitLoss, 0);
      
      return {
        date: trade.date,
        profitLoss: trade.profitLoss,
        cumulativeProfitLoss: runningProfitLoss
      };
    });
  
  // AI alert suggestions - filter for usable format
  const alertSuggestions = filteredAlerts
    .filter(alert => alert.itmProbability >= 0.7) // Only high probability alerts
    .slice(0, 3); // Limit to 3 suggestions

  // Colors for charts
  const COLORS = ['#1EAEDB', '#34D399', '#F87171', '#8E9196', '#10B981'];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-2">
            <Label htmlFor="filter-ticker">Filter by Ticker</Label>
            <Select value={filterTicker} onValueChange={setFilterTicker}>
              <SelectTrigger id="filter-ticker" className="w-36">
                <SelectValue placeholder="All Tickers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickers</SelectItem>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="SPY">SPY</SelectItem>
                <SelectItem value="QQQ">QQQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filter-result">Filter by Result</Label>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger id="filter-result" className="w-36">
                <SelectValue placeholder="All Results" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
                <SelectItem value="open">Open</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => setShowStats(!showStats)} variant="outline" className="flex gap-2 items-center">
            <PieChart size={16} />
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="flex gap-2 items-center">
            <Plus size={16} />
            Add Trade
          </Button>
        </div>
      </div>
      
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-optionpulse-navy p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Total P/L</div>
                  <div className={`text-xl font-bold ${totalProfitLoss >= 0 ? 'text-optionpulse-green' : 'text-optionpulse-red'}`}>
                    ${totalProfitLoss.toFixed(2)}
                  </div>
                </div>
                
                <div className="bg-optionpulse-navy p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-xl font-bold">{winRate.toFixed(1)}%</div>
                </div>
                
                <div className="bg-optionpulse-navy p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Total Trades</div>
                  <div className="text-xl font-bold">{totalTrades}</div>
                </div>
                
                <div className="bg-optionpulse-navy p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Open Trades</div>
                  <div className="text-xl font-bold">{trades.filter(t => t.result === 'open').length}</div>
                </div>
              </div>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tradeHistoryData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value}`, 'P/L']}
                      labelFormatter={(date) => `Date: ${date}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      name="Cumulative P/L" 
                      dataKey="cumulativeProfitLoss" 
                      stroke="#1EAEDB" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Trade Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-6"> {/* Added extra padding to shift contents down */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-[200px] flex items-center justify-center"> {/* Added centering */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip formatter={(value: number) => [`${value} trades`]} />
                      <Pie
                        data={tradesByStrategy}
                        cx="50%"
                        cy="50%"
                        outerRadius={80} // Increased radius for better visibility
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="strategy"
                        labelLine={true}
                        label={({ name, percent }) => 
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {tradesByStrategy.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36}/>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-[200px] flex items-center justify-center"> {/* Added centering */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip formatter={(value: number) => [`${value > 0 ? '+' : ''}$${value.toFixed(2)}`]} />
                      <Pie
                        data={profitByTicker}
                        cx="50%"
                        cy="50%"
                        outerRadius={80} // Increased radius for better visibility
                        fill="#8884d8"
                        dataKey="profit"
                        nameKey="ticker"
                        labelLine={true}
                        label={({ name, percent }) => 
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {profitByTicker.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.profit >= 0 ? COLORS[0] : COLORS[2]} 
                          />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36}/>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* AI Alert Suggestions */}
      {alertSuggestions.length > 0 && (
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={16} className="text-optionpulse-green" />
              Trade Opportunities from AI Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alertSuggestions.map((alert) => (
                <Card key={alert.id} className="bg-optionpulse-navy/70 hover:bg-optionpulse-navy transition-colors border-border/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{alert.symbol} ${alert.strikePrice} {alert.type}</div>
                      <Badge variant="outline" className="bg-optionpulse-blue text-white">
                        {Math.round(alert.itmProbability * 100)}% ITM
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Expires: {alert.expiryDate}
                    </div>
                    <div className="text-sm mb-3">
                      {alert.sentiment.direction === 'bullish' ? (
                        <div className="flex items-center text-optionpulse-green">
                          <TrendingUp size={14} className="mr-1" />
                          {Math.round(alert.sentiment.percentage)}% Bullish
                        </div>
                      ) : (
                        <div className="flex items-center text-optionpulse-red">
                          <TrendingDown size={14} className="mr-1" />
                          {Math.round(alert.sentiment.percentage)}% Bearish
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setNewTrade({
                          date: new Date().toISOString().slice(0, 10),
                          ticker: alert.symbol,
                          strategy: alert.type === 'call' ? 'Long Call' : 'Long Put',
                          action: 'buy',
                          quantity: 1,
                          premium: 5,
                          strike: alert.strikePrice,
                          expiryDate: alert.expiryDate,
                          result: 'open',
                          profitLoss: 0,
                          notes: `Based on AI alert with ${Math.round(alert.itmProbability * 100)}% ITM probability`,
                          relatedAlert: alert.id
                        });
                        setShowAddForm(true);
                      }}
                    >
                      Add to Journal
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Add Trade Form */}
      {showAddForm && (
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
                  onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trade-ticker">Ticker</Label>
                <Select 
                  value={newTrade.ticker} 
                  onValueChange={(value) => setNewTrade({...newTrade, ticker: value})}
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
                  onValueChange={(value) => setNewTrade({...newTrade, strategy: value})}
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
                  onValueChange={(value: 'buy' | 'sell') => setNewTrade({...newTrade, action: value})}
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
                  onChange={(e) => setNewTrade({...newTrade, quantity: parseInt(e.target.value)})}
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
                  onChange={(e) => setNewTrade({...newTrade, premium: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trade-strike">Strike Price ($)</Label>
                <Input
                  id="trade-strike"
                  type="number"
                  value={newTrade.strike}
                  onChange={(e) => setNewTrade({...newTrade, strike: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trade-expiry">Expiry Date</Label>
                <Input
                  id="trade-expiry"
                  type="text"
                  value={newTrade.expiryDate}
                  onChange={(e) => setNewTrade({...newTrade, expiryDate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trade-result">Result</Label>
                <Select 
                  value={newTrade.result} 
                  onValueChange={(value: 'profit' | 'loss' | 'open') => setNewTrade({...newTrade, result: value})}
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
                    onChange={(e) => setNewTrade({...newTrade, profitLoss: parseFloat(e.target.value)})}
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
                onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddTrade}>Add Trade</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Trades List */}
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Trade Journal ({filteredTrades.length} trades)</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTrades.length === 0 ? (
            <div className="text-center py-6">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No trades found</h3>
              <p className="text-muted-foreground mb-4">
                {trades.length === 0 
                  ? "Your trade journal is empty. Add your first trade to get started."
                  : "No trades match your current filters. Try adjusting your filters or add new trades."}
              </p>
              {trades.length === 0 && (
                <Button onClick={() => setShowAddForm(true)}>Add Your First Trade</Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">P/L</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((trade) => (
                  <React.Fragment key={trade.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/20"
                      onClick={() => handleToggleDetails(trade.id)}
                    >
                      <TableCell className="p-0 pl-2 w-10">
                        <ChevronDown size={16} className={`transition-transform ${expandedTrade === trade.id ? 'rotate-180' : ''}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2 text-muted-foreground" />
                          {new Date(trade.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{trade.ticker}</TableCell>
                      <TableCell>{trade.strategy}</TableCell>
                      <TableCell>
                        <Badge variant={trade.action === 'buy' ? 'default' : 'outline'}>
                          {trade.action === 'buy' ? 'Long' : 'Short'} ${trade.strike}
                        </Badge>
                      </TableCell>
                      <TableCell>{trade.expiryDate}</TableCell>
                      <TableCell>
                        {trade.result === 'profit' ? (
                          <Badge variant="default" className="bg-optionpulse-green">Profit</Badge>
                        ) : trade.result === 'loss' ? (
                          <Badge variant="default" className="bg-optionpulse-red">Loss</Badge>
                        ) : (
                          <Badge variant="outline">Open</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-medium ${trade.profitLoss > 0 ? 'text-optionpulse-green' : trade.profitLoss < 0 ? 'text-optionpulse-red' : ''}`}>
                          {trade.profitLoss > 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="p-0 pr-2 w-10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTrade(trade.id);
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {expandedTrade === trade.id && (
                      <TableRow>
                        <TableCell colSpan={9} className="p-0">
                          <div className="bg-muted/20 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Trade Details</div>
                                <div className="text-sm">
                                  {trade.action === 'buy' ? 'Bought' : 'Sold'} {trade.quantity} x {trade.ticker} {trade.strategy} @ ${trade.premium.toFixed(2)}
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Contract Value</div>
                                <div className="text-sm font-medium">
                                  ${(trade.premium * trade.quantity * 100).toFixed(2)}
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Strike & Expiry</div>
                                <div className="text-sm">
                                  ${trade.strike} expiring {trade.expiryDate}
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground">Profit/Loss</div>
                                <div className={`text-sm font-medium ${trade.profitLoss > 0 ? 'text-optionpulse-green' : trade.profitLoss < 0 ? 'text-optionpulse-red' : ''}`}>
                                  <CircleDollarSign size={14} className="inline mr-1" />
                                  {trade.profitLoss > 0 ? '+' : ''}{trade.profitLoss.toFixed(2)} 
                                  {trade.profitLoss !== 0 && (
                                    <span className="text-xs ml-1">
                                      ({((trade.profitLoss / (trade.premium * trade.quantity * 100)) * 100).toFixed(1)}%)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {trade.notes && (
                              <div className="bg-muted/30 p-3 rounded-md">
                                <div className="text-xs text-muted-foreground mb-1">Notes</div>
                                <div className="text-sm">{trade.notes}</div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeJournal;
