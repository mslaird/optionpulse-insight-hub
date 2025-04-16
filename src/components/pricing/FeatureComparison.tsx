
import React from "react";
import FeatureComparisonCard from "./FeatureComparisonCard";
import { BookOpen, Calculator, Bell } from "lucide-react";

const FeatureComparison: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <FeatureComparisonCard
        title="Education"
        icon={BookOpen}
        features={[
          { name: "Basic Text Content", availability: "All Plans" },
          { name: "Video Lessons", availability: "Lite & Pro" },
          { name: "Advanced Strategies", availability: "Lite & Pro" },
          { name: "LEAPS Education", availability: "Pro Only" },
        ]}
      />

      <FeatureComparisonCard
        title="Analysis Tools"
        icon={Calculator}
        features={[
          { name: "Basic Options Chain", availability: "All Plans" },
          { name: "Greeks Calculator", availability: "Lite & Pro" },
          { name: "Payoff Diagrams", availability: "Lite & Pro" },
          { name: "Advanced Options Chain", availability: "Pro Only" },
        ]}
      />

      <FeatureComparisonCard
        title="Alerts & Community"
        icon={Bell}
        features={[
          { name: "Basic Alerts", availability: "All Plans" },
          { name: "Community Posts", availability: "Lite & Pro" },
          { name: "Custom Alerts", availability: "Pro Only" },
          { name: "LEAPS Alerts", availability: "Pro Only" },
        ]}
      />
    </div>
  );
};

export default FeatureComparison;
