
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Expanded mock data with more options
const optionsData = [
  {
    type: "CALL",
    strike: 170,
    expiry: "2025-05-16",
    bid: 5.85,
    ask: 6.10,
    iv: 32.5,
    opportunity: true
  },
  {
    type: "PUT",
    strike: 170,
    expiry: "2025-05-16",
    bid: 4.25,
    ask: 4.50,
    iv: 34.2,
    opportunity: false
  },
  {
    type: "CALL",
    strike: 175,
    expiry: "2025-05-16",
    bid: 4.95,
    ask: 5.20,
    iv: 31.7,
    opportunity: false
  },
  {
    type: "PUT",
    strike: 175,
    expiry: "2025-05-16",
    bid: 5.60,
    ask: 5.85,
    iv: 33.4,
    opportunity: false
  },
  {
    type: "CALL",
    strike: 180,
    expiry: "2025-05-16",
    bid: 3.75,
    ask: 4.00,
    iv: 30.8,
    opportunity: false
  },
  {
    type: "PUT",
    strike: 180,
    expiry: "2025-05-16",
    bid: 6.90,
    ask: 7.15,
    iv: 35.3,
    opportunity: true
  },
  {
    type: "CALL",
    strike: 185,
    expiry: "2025-06-20",
    bid: 7.65,
    ask: 7.95,
    iv: 33.8,
    opportunity: true
  },
  {
    type: "PUT",
    strike: 165,
    expiry: "2025-06-20",
    bid: 3.85,
    ask: 4.05,
    iv: 35.1,
    opportunity: true
  }
];

const OptionsChainPreview = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BarChart3 size={18} className="text-optionpulse-blue" />
          AAPL Options Chain
        </CardTitle>
        <Link to="/options-chain">
          <Button variant="ghost" size="sm" className="text-optionpulse-blue hover:text-optionpulse-blue-light">
            View Full Chain
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Strike</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Expiry</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Bid</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Ask</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">IV</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {optionsData.map((option, index) => (
                <tr 
                  key={index} 
                  className={cn(
                    "border-b border-border/30 hover:bg-muted/10",
                    option.opportunity && "bg-optionpulse-blue/5"
                  )}
                >
                  <td className="py-2 px-3">
                    <Badge variant={option.type === "CALL" ? "default" : "outline"} className={option.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"}>
                      {option.type}
                    </Badge>
                  </td>
                  <td className="py-2 px-3">${option.strike}</td>
                  <td className="py-2 px-3">{option.expiry}</td>
                  <td className="py-2 px-3">${option.bid.toFixed(2)}</td>
                  <td className="py-2 px-3">${option.ask.toFixed(2)}</td>
                  <td className="py-2 px-3">{option.iv}%</td>
                  <td className="py-2 px-3">
                    {option.opportunity && (
                      <Badge variant="outline" className="border-optionpulse-green text-optionpulse-green">
                        Opportunity
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsChainPreview;
