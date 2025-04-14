
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const StaticOptionsWidget = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CircleDollarSign size={18} className="text-optionpulse-blue" />
          AAPL Options Chain
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-optionpulse-charcoal p-5 rounded-md text-white shadow-md mb-4">
          <p className="text-lg font-medium">AAPL Chain - Bid: $10, Ask: $11, Strike: $150</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-optionpulse-darkgray p-3 rounded-md">
            <div className="text-muted-foreground">Expiry</div>
            <div className="font-medium">2025-06-20</div>
          </div>
          <div className="bg-optionpulse-darkgray p-3 rounded-md">
            <div className="text-muted-foreground">Type</div>
            <div className="font-medium">Call Option</div>
          </div>
          <div className="bg-optionpulse-darkgray p-3 rounded-md">
            <div className="text-muted-foreground">IV</div>
            <div className="font-medium">32.5%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticOptionsWidget;
