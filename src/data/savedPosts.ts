
// Mock data for saved posts
export const initialSavedPosts = [
  {
    id: 101,
    author: {
      name: "TraderX",
      avatar: "https://i.pravatar.cc/150?img=10",
      username: "trader_x"
    },
    timestamp: "2025-04-14",
    content: "AAPL LEAPS call, 80% ITM, looking for a major move after the next product announcement.",
    likes: 35,
    comments: 12,
    activity: "predicted a 25% gain on AAPL LEAPS",
    tags: ["AAPL", "LEAPS", "ITM"],
    hasLiked: true,
    reactions: {
      "👍": 20,
      "🔥": 10,
      "🚀": 5
    }
  },
  {
    id: 102,
    author: {
      name: "OptionsQueen",
      avatar: "https://i.pravatar.cc/150?img=23",
      username: "options_queen"
    },
    timestamp: "2025-04-15",
    content: "SPY iron condor setup for next month looking promising with IV at these levels. 420/430/450/460 strikes.",
    likes: 28,
    comments: 7,
    activity: "shared SPY iron condor strategy",
    tags: ["SPY", "iron-condor", "IV"],
    hasLiked: false,
    reactions: {
      "👍": 15,
      "🧠": 10,
      "💰": 3
    }
  }
];

export type SavedPost = typeof initialSavedPosts[0];
