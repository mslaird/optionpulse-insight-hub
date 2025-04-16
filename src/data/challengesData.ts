
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

export interface LeaderboardUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  badge: string;
  completedChallenges: number;
}

export const challenges: Challenge[] = [
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

export const leaderboard: LeaderboardUser[] = [
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
