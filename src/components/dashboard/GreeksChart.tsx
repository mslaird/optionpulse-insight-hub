import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock data
const greeksData = [{
  name: 'Delta',
  value: 0.6,
  description: 'How much option price changes when stock price moves $1',
  color: '#1EAEDB' // Blue
}, {
  name: 'Gamma',
  value: 0.05,
  description: 'Rate of change in Delta for $1 stock price move',
  color: '#8E9196' // Gray
}, {
  name: 'Theta',
  value: -0.03,
  description: 'Time decay: value lost per day as expiration approaches',
  color: '#F87171' // Red
}, {
  name: 'Vega',
  value: 0.2,
  description: 'Sensitivity to volatility changes',
  color: '#34D399' // Green
}];

// Format the Greek data for a line chart
const formatGreeksForLineChart = () => {
  // Create data points for the line graph (we'll use dummy x-axis values)
  // This simulates how these Greeks would change over a range of strike prices or dates
  const ranges = [1, 2, 3, 4, 5, 6, 7];
  return ranges.map(range => {
    // Create varied values based on the original values to simulate a line
    const factor = range / 4; // Normalize around the middle point

    return {
      x: range,
      Delta: greeksData[0].value * factor,
      Gamma: greeksData[1].value * factor,
      Theta: greeksData[2].value * factor,
      Vega: greeksData[3].value * factor
    };
  });
};
const GreeksChart = () => {
  const lineData = formatGreeksForLineChart();
  return <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <div className="flex items-center space-x-2 my-[9px]">
              <AreaChart size={18} className="text-optionpulse-blue" />
              <span>Greeks Analysis (AAPL $180 Call)</span>
            </div>
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[#00FF7F] hover:text-[#00FF7F]/80 hover:bg-background/20">
                <Info size={16} className="text-[#00FF7F]" />
                <span className="text-xs">How are Greeks calculated?</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-optionpulse-navy border-border/50">
              <DialogHeader>
                <DialogTitle className="text-xl text-[#00B7EB] font-semibold">Understanding Options Greeks</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  How these values influence option pricing
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {greeksData.map(greek => <div key={greek.name} className="border-b border-border/30 pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: greek.color
                  }}></div>
                      <h3 className="font-medium text-white">{greek.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">
                      {greek.name === 'Delta' ? "Measures price change per $1 stock move (e.g., Delta 0.6 means option price moves $0.60 when stock moves $1)." : greek.name === 'Gamma' ? "Measures Delta change per $1 stock move (e.g., Gamma 0.05 means Delta increases by 0.05 for a $1 move in the stock)." : greek.name === 'Theta' ? "Measures daily time decay (e.g., Theta -0.03 means option loses $0.03 per day as it approaches expiration)." : "Measures price change per 1% volatility change (e.g., Vega 0.2 means option price moves $0.20 when implied volatility changes by 1%)."}
                    </p>
                  </div>)}
                <p className="text-sm text-muted-foreground pt-1">
                  Understanding these Greeks helps traders make more informed decisions about option strategies and risk management.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 60
          }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="x" axisLine={false} tick={{
              fill: '#FFFFFF'
            }} label={{
              value: 'Strike Price Distance',
              position: 'insideBottom',
              offset: -20,
              fill: '#8E9196',
              fontSize: 11
            }} />
              <YAxis axisLine={false} tick={{
              fill: '#FFFFFF'
            }} domain={[-0.1, 'auto']} />
              <Tooltip contentStyle={{
              backgroundColor: '#1A1F2C',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px'
            }} labelFormatter={() => 'Greeks Values'} />
              <Line type="monotone" dataKey="Delta" stroke={greeksData[0].color} strokeWidth={2} dot={{
              fill: greeksData[0].color,
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Line type="monotone" dataKey="Gamma" stroke={greeksData[1].color} strokeWidth={2} dot={{
              fill: greeksData[1].color,
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Line type="monotone" dataKey="Theta" stroke={greeksData[2].color} strokeWidth={2} dot={{
              fill: greeksData[2].color,
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Line type="monotone" dataKey="Vega" stroke={greeksData[3].color} strokeWidth={2} dot={{
              fill: greeksData[3].color,
              r: 4
            }} activeDot={{
              r: 6
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {greeksData.map(greek => <div key={greek.name} className="bg-card/40 p-2 rounded-lg border border-border/50 flex flex-col items-center justify-between">
              <div className="w-4 h-4 rounded-full mb-1" style={{
            backgroundColor: greek.color
          }}></div>
              <span className="font-medium text-xs mb-1 text-center">{greek.name}</span>
              <div className={cn("text-sm font-semibold text-center", greek.value > 0 ? "text-white" : "text-optionpulse-red")}>
                {greek.value.toFixed(2)}
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};
export default GreeksChart;