
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart, BarChart3, TrendingUp, Maximize2, BookMarked, DollarSign, Zap, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ToolsTabListProps {
  activeTab: string;
  showLeaps: boolean;
  canAccessLite: boolean;
  canAccessPro: boolean;
  onTabChange: (value: string) => void;
  onLeapsToggle: () => void;
}

const ToolsTabList: React.FC<ToolsTabListProps> = ({
  activeTab,
  showLeaps,
  canAccessLite,
  canAccessPro,
  onTabChange,
  onLeapsToggle
}) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-6">
      <TabsTrigger 
        value="strategy-trader" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("strategy-trader")}
      >
        <DollarSign size={16} />
        <span className="hidden md:inline">Strategy Trader</span>
        <span className="md:hidden">Trader</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="payoff" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("payoff")}
      >
        <LineChart size={16} />
        <span className="hidden md:inline">Payoff Diagram</span>
        <span className="md:hidden">Payoff</span>
        {!canAccessLite && <Lock size={12} className="ml-1" />}
      </TabsTrigger>
      
      <TabsTrigger 
        value="greeks" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("greeks")}
      >
        <Calculator size={16} />
        <span>Greeks</span>
        {!canAccessLite && <Lock size={12} className="ml-1" />}
      </TabsTrigger>
      
      <TabsTrigger 
        value="risk" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("risk")}
      >
        <TrendingUp size={16} />
        <span className="hidden md:inline">Risk/Reward</span>
        <span className="md:hidden">Risk</span>
        {!canAccessLite && <Lock size={12} className="ml-1" />}
      </TabsTrigger>
      
      <TabsTrigger 
        value="volatility" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("volatility")}
      >
        <BarChart3 size={16} />
        <span className="hidden md:inline">Volatility Scanner</span>
        <span className="md:hidden">Volatility</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="strategy" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("strategy")}
      >
        <Maximize2 size={16} />
        <span className="hidden md:inline">Strategy Builder</span>
        <span className="md:hidden">Strategy</span>
        {!canAccessPro && <Lock size={12} className="ml-1" />}
      </TabsTrigger>
      
      <TabsTrigger 
        value="journal" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("journal")}
      >
        <BookMarked size={16} />
        <span className="hidden md:inline">Trade Journal</span>
        <span className="md:hidden">Journal</span>
      </TabsTrigger>
      
      {activeTab === "strategy" && (
        <Badge 
          className="absolute top-full right-0 mt-2 cursor-pointer bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30"
          onClick={onLeapsToggle}
        >
          <Zap size={14} className="mr-1" />
          {showLeaps ? "LEAPS Mode: ON" : "LEAPS Mode: OFF"}
        </Badge>
      )}
    </TabsList>
  );
};

export default ToolsTabList;
