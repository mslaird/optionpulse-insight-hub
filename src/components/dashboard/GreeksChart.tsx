
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from "@/lib/utils";

// Mock data
const greeksData = [
  {
    name: 'Delta',
    value: 0.6,
    description: 'How much option price changes when stock price moves $1',
    color: '#1EAEDB' // Blue
  },
  {
    name: 'Gamma',
    value: 0.05,
    description: 'Rate of change in Delta for $1 stock price move',
    color: '#8E9196' // Gray
  },
  {
    name: 'Theta',
    value: -0.03,
    description: 'Time decay: value lost per day as expiration approaches',
    color: '#F87171' // Red
  },
  {
    name: 'Vega',
    value: 0.2,
    description: 'Sensitivity to volatility changes',
    color: '#34D399' // Green
  }
];

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
      Vega: greeksData[3].value * factor,
    };
  });
};

const GreeksChart = () => {
  const lineData = formatGreeksForLineChart();

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AreaChart size={18} className="text-optionpulse-blue" />
          Greeks Analysis (AAPL $180 Call)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 10, right: 10, left: 0, bottom: 40 }} // Reduced bottom margin slightly
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="x" 
                axisLine={false} 
                tick={{ fill: '#FFFFFF' }}
                label={{ 
                  value: 'Strike Price Distance', 
                  position: 'insideBottom', 
                  offset: 10, // Reduced offset to create a small gap
                  fill: '#8E9196',
                  fontSize: 11
                }}
              />
              <YAxis 
                axisLine={false}
                tick={{ fill: '#FFFFFF' }}
                domain={[-0.1, 'auto']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px'
                }}
                labelFormatter={() => 'Greeks Values'}
              />
              <Line 
                type="monotone" 
                dataKey="Delta" 
                stroke={greeksData[0].color} 
                strokeWidth={2}
                dot={{ fill: greeksData[0].color, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="Gamma" 
                stroke={greeksData[1].color} 
                strokeWidth={2}
                dot={{ fill: greeksData[1].color, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="Theta" 
                stroke={greeksData[2].color} 
                strokeWidth={2}
                dot={{ fill: greeksData[2].color, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="Vega" 
                stroke={greeksData[3].color} 
                strokeWidth={2}
                dot={{ fill: greeksData[3].color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {greeksData.map((greek) => (
            <div 
              key={greek.name} 
              className="bg-card/40 p-3 rounded-lg border border-border/50 flex flex-col items-center justify-between"
            >
              <div 
                className="w-4 h-4 rounded-full mb-2" 
                style={{ backgroundColor: greek.color }}
              ></div>
              <span className="font-medium text-sm mb-2 text-center">{greek.name}</span>
              <div className={cn(
                "text-lg font-semibold text-center",
                greek.value > 0 ? "text-white" : "text-optionpulse-red"
              )}>
                {greek.value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GreeksChart;

