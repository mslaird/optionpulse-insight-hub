
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import explanations from "@/data/explanations";

export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  deadline: string;
  participants: number;
  pointsReward: number;
  status: "active" | "completed" | "upcoming";
  difficulty: "beginner" | "intermediate" | "advanced";
  completionRate?: number;
  isLeaps?: boolean;
}

const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
  switch (difficulty) {
    case "beginner":
      return "bg-emerald-500/20 text-emerald-400";
    case "intermediate":
      return "bg-blue-500/20 text-blue-400";
    case "advanced":
      return "bg-purple-500/20 text-purple-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getStatusColor = (status: Challenge["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400";
    case "completed":
      return "bg-blue-500/20 text-blue-400";
    case "upcoming":
      return "bg-orange-500/20 text-orange-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "iron-condors":
      return <Trophy size={14} className="text-purple-400" />;
    case "spreads":
      return <Zap size={14} className="text-blue-400" />;
    case "straddles":
      return <Calendar size={14} className="text-green-400" />;
    case "leaps":
      return <Zap size={14} className="text-emerald-400" />;
    default:
      return <Calendar size={14} />;
  }
};

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  return (
    <Card className={cn(
      "bg-sidebar transition-all duration-200 hover:shadow-md hover:shadow-primary/5 hover:border-primary/30",
      challenge.isLeaps && "bg-gradient-to-br from-[#1A1F2C]/80 to-[#222]/95 border-emerald-500/20"
    )}>
      <CardHeader className="pb-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge className={cn("self-start", getDifficultyColor(challenge.difficulty))}>
              {challenge.difficulty}
            </Badge>
            {challenge.isLeaps && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                <Zap size={14} className="mr-1" />LEAPS
              </Badge>
            )}
          </div>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg text-foreground">{challenge.title}</CardTitle>
            {challenge.title.includes("Covered Call") && (
              <ExplanationTooltip 
                title={explanations.coveredCall.title}
                content={explanations.coveredCall.content}
              />
            )}
            {challenge.title.includes("Iron Condor") && (
              <ExplanationTooltip 
                title={explanations.ironCondor.title}
                content={explanations.ironCondor.content}
              />
            )}
            {challenge.title.includes("Bull Put Spread") && (
              <ExplanationTooltip 
                title="Bull Put Spread"
                content="A bull put spread involves selling a put option while buying a lower strike put option in the same expiration. This creates a net credit position with defined risk, used when you're moderately bullish on a stock."
              />
            )}
            {challenge.title.includes("Straddle") && (
              <ExplanationTooltip 
                title="Long Straddle"
                content="A long straddle involves buying both a call and put option at the same strike price and expiration date. This strategy profits from significant price movement in either direction, ideal for high volatility events."
              />
            )}
            {challenge.title.includes("Credit Spread") && (
              <ExplanationTooltip 
                title="Credit Spread"
                content="A credit spread involves selling one option and buying another with the same expiration but different strikes, resulting in a net credit. It limits risk while allowing you to profit from the premium received if the market moves as expected."
              />
            )}
            {challenge.title.includes("LEAPS") && (
              <ExplanationTooltip 
                title="LEAPS Options"
                content="LEAPS (Long-term Equity Anticipation Securities) are options with expiration dates longer than one year, often up to three years out. They provide exposure to long-term price movements with lower time decay in the near term compared to short-dated options."
              />
            )}
            {(challenge.title.includes("PMCC") || challenge.title.includes("Poor Man's Covered Call")) && (
              <ExplanationTooltip 
                title="Poor Man's Covered Call"
                content="A Poor Man's Covered Call (PMCC) is a strategy that uses a long-dated deep-in-the-money call option instead of owning 100 shares of stock as the underlying position, while selling shorter-term calls against it to generate income."
              />
            )}
          </div>
          <CardDescription className="text-muted-foreground mt-1 w-full flex items-center justify-center h-auto">
            {challenge.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={14} />
            <span>Deadline: {challenge.deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users size={14} />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy size={14} />
            <span>{challenge.pointsReward} points</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Badge className={getStatusColor(challenge.status)} variant="outline">
              {challenge.status}
            </Badge>
          </div>
        </div>
        
        {challenge.completionRate !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Completion</span>
              <span className={cn("text-primary", challenge.isLeaps && "text-emerald-400")}>
                {challenge.completionRate}%
              </span>
            </div>
            <Progress 
              value={challenge.completionRate} 
              className={cn("h-1", challenge.isLeaps && "bg-emerald-950 [&>div]:bg-emerald-500")} 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant={challenge.isLeaps ? "outline" : "outline"} 
          className={cn(
            "w-full", 
            challenge.isLeaps && "hover:bg-emerald-500/10 hover:text-emerald-400 border-emerald-500/40"
          )}
          asChild
        >
          <Link to={`/tools?tab=strategy${challenge.isLeaps ? "&leaps=true" : ""}`}>Join Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
