
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Trophy, 
  Users, 
  Award, 
  Medal, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Flame,
  ChevronRight,
  Layers,
  HelpCircle,
  Zap,
  BookOpen,
  Dumbbell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";
import explanations from "@/data/explanations";

interface Challenge {
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

interface LeaderboardUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  badge: string;
  completedChallenges: number;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Best Covered Call on SPY",
    description: "Develop the most profitable covered call strategy on SPY with the highest risk-adjusted return.",
    category: "options",
    deadline: "Apr 28, 2025",
    participants: 128,
    pointsReward: 500,
    status: "active",
    difficulty: "intermediate",
    completionRate: 0
  },
  {
    id: 2,
    title: "March Volatility Crush",
    description: "Predict which stock will experience the largest volatility crush after earnings in March.",
    category: "volatility",
    deadline: "Mar 31, 2025",
    participants: 86,
    pointsReward: 350,
    status: "active",
    difficulty: "advanced",
    completionRate: 0
  },
  {
    id: 3,
    title: "Weekly Options Alpha",
    description: "Generate alpha using only weekly options in a simulated portfolio over 4 weeks.",
    category: "options",
    deadline: "May 15, 2025",
    participants: 214,
    pointsReward: 450,
    status: "upcoming",
    difficulty: "intermediate"
  },
  {
    id: 4,
    title: "Iron Condor Challenge",
    description: "Build the most effective iron condor strategy in a low volatility environment.",
    category: "options",
    deadline: "Apr 10, 2025",
    participants: 92,
    pointsReward: 400,
    status: "active",
    difficulty: "intermediate",
    completionRate: 35
  },
  {
    id: 5,
    title: "Earnings Strangle Master",
    description: "Create the most profitable earnings strangle strategy across tech stocks.",
    category: "earnings",
    deadline: "Apr 21, 2025",
    participants: 156,
    pointsReward: 600,
    status: "active",
    difficulty: "advanced",
    completionRate: 22
  },
  {
    id: 6,
    title: "AAPL Bull Put Spread",
    description: "Design the optimal bull put spread on AAPL that maximizes profit while managing risk effectively.",
    category: "spreads",
    deadline: "May 5, 2025",
    participants: 174,
    pointsReward: 500,
    status: "upcoming",
    difficulty: "intermediate"
  },
  {
    id: 7,
    title: "SPY Iron Condor Builder",
    description: "Build a SPY iron condor (sell $510 call, buy $515 call, sell $490 put, buy $485 put) with the best risk/reward ratio.",
    category: "iron-condors",
    deadline: "Apr 30, 2025",
    participants: 143,
    pointsReward: 550,
    status: "active",
    difficulty: "advanced",
    completionRate: 18
  },
  {
    id: 8,
    title: "Straddle Volatility Play",
    description: "Create a straddle strategy that best capitalizes on upcoming market volatility events.",
    category: "straddles",
    deadline: "May 12, 2025",
    participants: 112,
    pointsReward: 500,
    status: "active",
    difficulty: "intermediate",
    completionRate: 10
  },
  {
    id: 9,
    title: "Credit Spread Master",
    description: "Develop a portfolio of credit spreads across different sectors to maximize monthly income.",
    category: "spreads",
    deadline: "May 20, 2025",
    participants: 98,
    pointsReward: 450,
    status: "upcoming",
    difficulty: "intermediate"
  },
  // LEAPS Challenges
  {
    id: 10,
    title: "AAPL LEAPS Call Optimizer",
    description: "Build the optimal AAPL LEAPS call position expiring in Jan 2027 that balances capital efficiency and long-term growth potential.",
    category: "leaps",
    deadline: "Jun 15, 2025",
    participants: 83,
    pointsReward: 500,
    status: "active",
    difficulty: "intermediate",
    completionRate: 5,
    isLeaps: true
  },
  {
    id: 11,
    title: "LEAPS Call Diagonal Spread",
    description: "Create the most efficient LEAPS call diagonal spread strategy to generate consistent income while maintaining long-term upside exposure.",
    category: "leaps",
    deadline: "Jun 30, 2025",
    participants: 62,
    pointsReward: 600,
    status: "active",
    difficulty: "advanced",
    completionRate: 12,
    isLeaps: true
  },
  {
    id: 12,
    title: "LEAPS Poor Man's Covered Call",
    description: "Design a PMCC strategy using LEAPS options that outperforms traditional covered calls on a risk-adjusted basis over a 6-month period.",
    category: "leaps",
    deadline: "Jul 10, 2025",
    participants: 121,
    pointsReward: 550,
    status: "upcoming",
    difficulty: "intermediate",
    isLeaps: true
  },
  {
    id: 13,
    title: "LEAPS vs. Shares Comparison",
    description: "Develop a comprehensive analysis comparing LEAPS calls vs. share ownership across different market scenarios and prove which approach is superior.",
    category: "leaps",
    deadline: "Jul 25, 2025",
    participants: 76,
    pointsReward: 450,
    status: "upcoming",
    difficulty: "beginner",
    isLeaps: true
  }
];

const leaderboard: LeaderboardUser[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "optionqueen",
    avatar: "/placeholder.svg",
    points: 1850,
    rank: 1,
    badge: "Diamond",
    completedChallenges: 14
  },
  {
    id: 2,
    name: "John Smith",
    username: "volatilityhunter",
    avatar: "/placeholder.svg",
    points: 1680,
    rank: 2,
    badge: "Platinum",
    completedChallenges: 12
  },
  {
    id: 3,
    name: "Alex Davis",
    username: "thetagang",
    avatar: "/placeholder.svg",
    points: 1450,
    rank: 3,
    badge: "Platinum",
    completedChallenges: 11
  },
  {
    id: 4,
    name: "Michael Wong",
    username: "ironbutterfly",
    avatar: "/placeholder.svg",
    points: 1340,
    rank: 4,
    badge: "Gold",
    completedChallenges: 9
  },
  {
    id: 5,
    name: "Priya Sharma",
    username: "deltamaster",
    avatar: "/placeholder.svg",
    points: 1280,
    rank: 5,
    badge: "Gold",
    completedChallenges: 8
  }
];

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Diamond":
      return "bg-gradient-to-r from-blue-400 to-cyan-300 text-white";
    case "Platinum":
      return "bg-gradient-to-r from-slate-300 to-slate-400 text-white";
    case "Gold":
      return "bg-gradient-to-r from-yellow-400 to-amber-300 text-black";
    default:
      return "bg-muted";
  }
};

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
      return <TrendingUp size={14} className="text-blue-400" />;
    case "straddles":
      return <Layers size={14} className="text-green-400" />;
    case "leaps":
      return <Zap size={14} className="text-emerald-400" />;
    default:
      return <Calendar size={14} />;
  }
};

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
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
            {challenge.title.includes("PMCC") || challenge.title.includes("Poor Man's Covered Call") && (
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
          <Link to="/tools?tab=strategy&leaps=true">Join Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Challenges = () => {
  const [filter, setFilter] = useState<Challenge["status"] | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const filteredChallenges = challenges
    .filter(challenge => filter === "all" || challenge.status === filter)
    .filter(challenge => categoryFilter === "all" || challenge.category === categoryFilter);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Challenges</h1>
            <p className="text-muted-foreground">Compete with the community and earn points</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/tools?tab=strategy-trader">
                <Dumbbell size={16} className="mr-2" />
                Practice Trading
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/education">
                <BookOpen size={16} className="mr-2" />
                Education Hub
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges" className="animate-fade-in">
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={filter === "all" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setFilter("all")}
                >
                  All Status
                </Badge>
                <Badge 
                  variant={filter === "active" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setFilter("active")}
                >
                  Active
                </Badge>
                <Badge 
                  variant={filter === "upcoming" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </Badge>
                <Badge 
                  variant={filter === "completed" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={categoryFilter === "all" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setCategoryFilter("all")}
                >
                  All Types
                </Badge>
                <Badge 
                  variant={categoryFilter === "spreads" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setCategoryFilter("spreads")}
                >
                  Credit Spreads
                </Badge>
                <Badge 
                  variant={categoryFilter === "iron-condors" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setCategoryFilter("iron-condors")}
                >
                  Iron Condors
                </Badge>
                <Badge 
                  variant={categoryFilter === "straddles" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setCategoryFilter("straddles")}
                >
                  Straddles
                </Badge>
                <Badge 
                  variant={categoryFilter === "options" ? "default" : "outline"} 
                  className="cursor-pointer" 
                  onClick={() => setCategoryFilter("options")}
                >
                  Options
                </Badge>
                <Badge 
                  variant={categoryFilter === "leaps" ? "default" : "outline"} 
                  className={cn("cursor-pointer", categoryFilter === "leaps" ? "bg-emerald-500 text-emerald-50" : "border-emerald-500/40 text-emerald-400")} 
                  onClick={() => setCategoryFilter("leaps")}
                >
                  <Zap size={14} className="mr-1" />
                  LEAPS
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
            
            {filteredChallenges.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                <h3 className="text-lg mb-1">No challenges found</h3>
                <p>There are no challenges matching your current filter.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="leaderboard" className="animate-fade-in">
            <Card className="bg-sidebar border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={20} />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Community members with the highest points from completed challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 font-bold">
                          {user.rank === 1 ? (
                            <Trophy size={20} className="text-yellow-500" />
                          ) : user.rank === 2 ? (
                            <Trophy size={20} className="text-gray-400" />
                          ) : user.rank === 3 ? (
                            <Trophy size={20} className="text-amber-700" />
                          ) : (
                            <span className="text-muted-foreground">{user.rank}</span>
                          )}
                        </div>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.points.toLocaleString()} pts</div>
                        <Link to="/achievements">
                          <Badge className={cn("mt-1 cursor-pointer hover:opacity-80", getBadgeColor(user.badge))}>
                            {user.badge}
                          </Badge>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/achievements">
                    View Full Leaderboard
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-sidebar">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Flame className="text-orange-500" size={18} />
                    Hot Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Ryan Kim</div>
                        <div className="text-xs text-muted-foreground">8 challenges in a row</div>
                      </div>
                      <Badge variant="outline" className="bg-orange-500/20 text-orange-400">
                        <Flame size={12} className="mr-1" />
                        8
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>LM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Lisa Miller</div>
                        <div className="text-xs text-muted-foreground">6 challenges in a row</div>
                      </div>
                      <Badge variant="outline" className="bg-orange-500/20 text-orange-400">
                        <Flame size={12} className="mr-1" />
                        6
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-sidebar">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Medal className="text-blue-500" size={18} />
                    Most Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Sarah Johnson</div>
                        <div className="text-xs text-muted-foreground">14 completed challenges</div>
                      </div>
                      <Link to="/achievements">
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-400 cursor-pointer hover:opacity-80">
                          14
                        </Badge>
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">John Smith</div>
                        <div className="text-xs text-muted-foreground">12 completed challenges</div>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                        12
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-sidebar">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="text-green-500" size={18} />
                    LEAPS Masters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>TD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Thomas Davies</div>
                        <div className="text-xs text-muted-foreground">5 LEAPS challenges completed</div>
                      </div>
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400">
                        <Zap size={12} className="mr-1" />
                        5
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Michael Wong</div>
                        <div className="text-xs text-muted-foreground">4 LEAPS challenges completed</div>
                      </div>
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400">
                        <Zap size={12} className="mr-1" />
                        4
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="rewards" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-sidebar border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="text-yellow-500" size={20} />
                    Point Rewards
                  </CardTitle>
                  <CardDescription>
                    Earn points by completing challenges and participating in the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-md">
                        <Trophy size={24} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">Complete a Challenge</div>
                        <div className="text-sm text-muted-foreground">Successfully finish any challenge</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary">300-600 pts</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 p-2 rounded-md">
                        <Users size={24} className="text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium">Top 3 Placement</div>
                        <div className="text-sm text-muted-foreground">Rank in the top 3 of any challenge</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary">200 pts</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500/20 p-2 rounded-md">
                        <Flame size={24} className="text-orange-400" />
                      </div>
                      <div>
                        <div className="font-medium">Streak Bonus</div>
                        <div className="text-sm text-muted-foreground">Complete 5+ challenges in a row</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-primary">100 pts</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-2 rounded-md">
                        <Zap size={24} className="text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-medium">LEAPS Expert</div>
                        <div className="text-sm text-muted-foreground">Complete 3+ LEAPS challenges</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-emerald-400">250 pts</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-sidebar border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Medal className="text-purple-500" size={20} />
                    Achievement Badges
                  </CardTitle>
                  <CardDescription>
                    Earn special badges by reaching significant milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Link to="/achievements">
                        <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Diamond"))}>Diamond</Badge>
                      </Link>
                      <div>
                        <div className="font-medium">Diamond Strategist</div>
                        <div className="text-sm text-muted-foreground">Earn 1,500+ points</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Link to="/achievements">
                        <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Platinum"))}>Platinum</Badge>
                      </Link>
                      <div>
                        <div className="font-medium">Platinum Trader</div>
                        <div className="text-sm text-muted-foreground">Earn 1,000+ points</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Link to="/achievements">
                        <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Gold"))}>Gold</Badge>
                      </Link>
                      <div>
                        <div className="font-medium">Gold Analyst</div>
                        <div className="text-sm text-muted-foreground">Earn 500+ points</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Link to="/achievements">
                        <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-emerald-400 to-green-300 text-black">LEAPS</Badge>
                      </Link>
                      <div>
                        <div className="font-medium">LEAPS Visionary</div>
                        <div className="text-sm text-muted-foreground">Complete all LEAPS challenges</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <Link to="/achievements" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Achievements
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-blue-500/20">
                        <AvatarFallback className="text-blue-400">
                          <Trophy size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">Top Call Seller</div>
                        <div className="text-xs text-muted-foreground">3 challenges completed</div>
                      </div>
                    </div>
                    <Link to="/achievements">
                      <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-blue-400 to-cyan-300 text-white">
                        View
                      </Badge>
                    </Link>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-emerald-500/20">
                        <AvatarFallback className="text-emerald-400">
                          <Zap size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">LEAPS Master</div>
                        <div className="text-xs text-muted-foreground">LEAPS specialist certification</div>
                      </div>
                    </div>
                    <Link to="/achievements">
                      <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-emerald-400 to-green-300 text-black">
                        View
                      </Badge>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Challenges;
