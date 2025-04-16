
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureItem {
  name: string;
  availability: "All Plans" | "Lite & Pro" | "Pro Only";
}

interface FeatureComparisonCardProps {
  title: string;
  icon: LucideIcon;
  features: FeatureItem[];
}

const FeatureComparisonCard: React.FC<FeatureComparisonCardProps> = ({
  title,
  icon: Icon,
  features,
}) => {
  return (
    <Card className="bg-card/20 backdrop-blur-sm border-border/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Icon size={18} className="mr-2 text-optionpulse-blue" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex justify-between">
              <span>{feature.name}</span>
              <span className={
                feature.availability === "All Plans" 
                  ? "text-optionpulse-green" 
                  : feature.availability === "Pro Only" 
                    ? "text-yellow-400"
                    : ""
              }>
                {feature.availability}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureComparisonCard;
