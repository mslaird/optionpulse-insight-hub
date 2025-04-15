
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const StaticAlertWidget = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-2 border-[#00FF7F]/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp size={18} className="text-optionpulse-blue" />
          Market Sentiment Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-optionpulse-charcoal p-5 rounded-md text-white shadow-md">
          <p className="text-lg font-medium flex items-center gap-2">
            <span className="bg-[#00FF7F]/20 text-[#00FF7F] p-2 rounded-full">
              <TrendingUp size={16} />
            </span>
            Alert: 75% bullish AAPL calls
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticAlertWidget;
