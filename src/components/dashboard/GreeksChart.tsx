
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from "@/lib/utils";

// Mock data
const greeksData = [
  {
    name: 'Delta',
    value: 0.65,
    description: 'How much option price changes when stock price moves $1',
    color: '#1EAEDB' // Blue
  },
  {
    name: 'Gamma',
    value: 0.08,
    description: 'Rate of change in Delta for $1 stock price move',
    color: '#8E9196' // Gray
  },
  {
    name: 'Theta',
    value: -0.45,
    description: 'Time decay: value lost per day as expiration approaches',
    color: '#F87171' // Red
  },
  {
    name: 'Vega',
    value: 0.30,
    description: 'Sensitivity to volatility changes',
    color: '#34D399' // Green
  }
];

// Helper function to normalize values for chart display
const normalizeGreeks = (data: typeof greeksData) => {
  return data.map(item => ({
    ...item,
    // Convert to absolute value and scale for better visual representation
    displayValue: Math.abs(item.value) * 100
  }));
};

const GreeksChart = () => {
  const normalizedData = normalizeGreeks(greeksData);

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
            <RechartsBarChart
              data={normalizedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tick={{ fill: '#8E9196' }}
              />
              <YAxis 
                hide={true}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px'
                }}
                formatter={(value: any, name: any, props: any) => {
                  // Fix: Check if props and props.payload exist before accessing
                  const index = props?.payload?.index;
                  
                  // Make sure we have a valid index and greeksData[index] exists
                  if (index !== undefined && greeksData[index]) {
                    const originalValue = greeksData[index].value;
                    return [`${originalValue.toFixed(2)}`, 'Value'];
                  }
                  
                  // Fallback if we can't find the original value
                  return [`${value}`, name];
                }}
                labelFormatter={(label) => {
                  const item = greeksData.find(item => item.name === label);
                  return (
                    <>
                      <div className="font-medium text-white">{label}</div>
                      <div className="text-xs text-gray-400 mt-1">{item?.description}</div>
                    </>
                  );
                }}
              />
              <Bar dataKey="displayValue" radius={[4, 4, 0, 0]}>
                {normalizedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {greeksData.map((greek) => (
            <div key={greek.name} className="bg-card/40 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-center">
                <span className="font-medium">{greek.name}</span>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: greek.color }}
                ></div>
              </div>
              <div className={cn(
                "mt-2 text-lg font-semibold",
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
