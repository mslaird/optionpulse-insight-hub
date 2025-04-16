export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: number;
}

export type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "upcoming" | "completed";
  progress?: number;
  pointsEarned?: number;
  maxPoints: number;
  completedDate?: string;
  endDate?: string;
  tier: 'Free' | 'Lite' | 'Pro'; // Add the tier property
};

export const leaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "TraderPro88",
    points: 2560,
    level: 12
  },
  {
    id: "2",
    name: "OptionQueen",
    points: 2420,
    level: 11
  },
  {
    id: "3",
    name: "MarketMaster2024",
    points: 2300,
    level: 11
  },
  {
    id: "4",
    name: "VolatilityViking",
    points: 2150,
    level: 10
  },
  {
    id: "5",
    name: "ThetaTitan",
    points: 2050,
    level: 10
  },
  {
    id: "6",
    name: "GammaGuru",
    points: 1980,
    level: 9
  },
  {
    id: "7",
    name: "DeltaDominator",
    points: 1890,
    level: 9
  },
  {
    id: "8",
    name: "StonkSurfer",
    points: 1750,
    level: 8
  },
  {
    id: "9",
    name: "BearBuster",
    points: 1620,
    level: 8
  },
  {
    id: "10",
    name: "BullBlaster",
    points: 1500,
    level: 7
  }
];

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Iron Condor Challenge",
    description: "Build and execute an iron condor strategy using SPY options",
    category: "iron-condors",
    status: "active",
    progress: 75,
    pointsEarned: 150,
    maxPoints: 200,
    endDate: "05/01/2025",
    tier: "Pro"
  },
  {
    id: "2",
    title: "Credit Spread Mastery",
    description: "Execute 5 profitable credit spreads within the next 30 days",
    category: "spreads",
    status: "active",
    progress: 40,
    pointsEarned: 80,
    maxPoints: 200,
    endDate: "05/15/2025",
    tier: "Lite"
  },
  {
    id: "3",
    title: "Options Basics",
    description: "Complete all beginner options tutorials and quiz",
    category: "options",
    status: "completed",
    progress: 100,
    pointsEarned: 100,
    maxPoints: 100,
    completedDate: "04/01/2025",
    tier: "Free"
  },
  {
    id: "4",
    title: "LEAPS Long-Term Strategy",
    description: "Create a LEAPS portfolio and track its performance",
    category: "leaps",
    status: "upcoming",
    maxPoints: 300,
    endDate: "06/01/2025",
    tier: "Pro"
  },
  {
    id: "5",
    title: "Straddle Volatility Challenge",
    description: "Implement straddle strategies ahead of earnings announcements",
    category: "straddles",
    status: "upcoming",
    maxPoints: 250,
    endDate: "05/20/2025",
    tier: "Pro"
  },
  {
    id: "6",
    title: "Call Options Fundamentals",
    description: "Complete the beginner series on call options",
    category: "options",
    status: "active",
    progress: 50,
    pointsEarned: 50,
    maxPoints: 100,
    endDate: "04/30/2025",
    tier: "Free"
  },
  {
    id: "7",
    title: "Put Options Fundamentals", 
    description: "Complete the beginner series on put options",
    category: "options",
    status: "active",
    progress: 25,
    pointsEarned: 25,
    maxPoints: 100,
    endDate: "05/10/2025",
    tier: "Free"
  },
  {
    id: "8",
    title: "LEAPS vs. Short-Term Options",
    description: "Research and create a comparison report",
    category: "leaps",
    status: "upcoming",
    maxPoints: 200,
    endDate: "06/15/2025",
    tier: "Lite"
  },
  {
    id: "9",
    title: "Vertical Spread Challenge",
    description: "Master bull and bear vertical spreads",
    category: "spreads",
    status: "upcoming",
    maxPoints: 200,
    endDate: "05/25/2025",
    tier: "Pro"
  }
];
