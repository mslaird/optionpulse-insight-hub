
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, ThumbsUp, ThumbsDown, Share2, MessageSquarePlus, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

// Strategy explanations
const strategyExplanations = {
  nakedCall: {
    title: "Naked Call",
    content: "A naked call is selling a call option without owning the underlying stock, risking unlimited loss if the stock price rises significantly. Example: Sell AAPL $150 call for $5 premium; if AAPL rises to $200, you must buy at $200 to sell at $150, losing $45/share."
  },
  nakedPut: {
    title: "Naked Put",
    content: "A naked put is selling a put option without holding cash to buy the stock, risking loss if the stock price falls. Example: Sell AAPL $150 put for $5 premium; if AAPL drops to $100, you must buy at $150, losing $45/share."
  },
  cashSecuredPut: {
    title: "Cash-Secured Put",
    content: "A cash-secured put is selling a put option while holding enough cash to buy the stock if assigned. Example: Sell AAPL $150 put for $5 premium, hold $15,000 cash; if AAPL drops to $100, you buy at $150, but your cost basis is $145 after the premium."
  },
  coveredCall: {
    title: "Covered Call",
    content: "A covered call is selling a call option while owning the underlying stock, earning a premium but capping upside potential. Example: Own 100 AAPL shares at $150, sell $160 call for $5 premium; if AAPL rises to $170, you sell at $160, missing $10/share but keeping the $5 premium."
  }
};

// Define the types for our post data
interface PostAuthor {
  name: string;
  avatar: string;
  username: string;
}

interface PostReactions {
  "👍": number;
  "❤️"?: number;
  "🔥"?: number;
  "🚀"?: number;
  "🧠": number;
  "💰": number;
  "🤔"?: number;
  "👏"?: number;
}

interface Post {
  id: number;
  author: PostAuthor;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  activity: string;
  tags: string[];
  hasLiked: boolean;
  reactions: PostReactions;
}

// Mock data for community posts
const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "optiontrader"
    },
    timestamp: "2h ago",
    content: "Just opened a covered call position on AAPL with a $180 strike. Premium is looking juicy at these IV levels!",
    likes: 24,
    comments: 5,
    activity: "predicted a 15% gain on AAPL covered calls",
    tags: ["covered-calls", "AAPL"],
    hasLiked: false,
    reactions: {
      "👍": 14,
      "❤️": 8,
      "🔥": 6,
      "🚀": 4,
      "🧠": 0,
      "💰": 0
    }
  },
  {
    id: 2,
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      username: "options_sarah"
    },
    timestamp: "5h ago",
    content: "SPY put spreads are offering great risk/reward at current levels. Anyone else looking at the 430/420 spread for next month?",
    likes: 18,
    comments: 12,
    activity: "opened SPY put spreads with 3:1 risk/reward",
    tags: ["put-spreads", "SPY"],
    hasLiked: true,
    reactions: {
      "👍": 10,
      "🤔": 8,
      "💰": 5,
      "🧠": 3
    }
  },
  {
    id: 3,
    author: {
      name: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=8",
      username: "theta_gang"
    },
    timestamp: "1d ago",
    content: "Iron condors on low IV stocks have been my bread and butter this month. Already up 12% on my portfolio with defined risk. Who else is theta gang?",
    likes: 32,
    comments: 8,
    activity: "achieved 12% monthly return with iron condors",
    tags: ["iron-condors", "theta-gang"],
    hasLiked: false,
    reactions: {
      "👍": 18,
      "🧠": 14,
      "💰": 12
    }
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const { toast } = useToast();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    // Create new post with properly initialized reactions object
    const newPostObj: Post = {
      id: posts.length + 1,
      author: {
        name: "Current User",
        avatar: "https://i.pravatar.cc/150?img=12",
        username: "you"
      },
      timestamp: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      activity: "shared a new insight",
      tags: [],
      hasLiked: false,
      reactions: {
        "👍": 0,
        "🧠": 0,
        "💰": 0
      }
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    
    toast({
      title: "Post created",
      description: "Your post has been published to the community",
    });
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.hasLiked ? post.likes - 1 : post.likes + 1, hasLiked: !post.hasLiked } 
        : post
    ));
  };

  const handleReaction = (postId: number, emoji: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedReactions = { ...post.reactions };
        if (emoji in updatedReactions) {
          updatedReactions[emoji as keyof PostReactions] = (updatedReactions[emoji as keyof PostReactions] as number) + 1;
        } else {
          updatedReactions[emoji as keyof PostReactions] = 1;
        }
        return { ...post, reactions: updatedReactions };
      }
      return post;
    }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-optionpulse-blue" />
              Community
            </h1>
            <p className="text-muted-foreground">Connect with fellow traders and share insights</p>
          </div>
        </div>
        
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-card w-full justify-start mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="my-activity">My Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-6">
            {/* Post composer */}
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handlePostSubmit}>
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                      <AvatarFallback>OP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your options trading insights..."
                        className="mb-3 bg-background/50"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-optionpulse-blue hover:bg-optionpulse-blue/80">
                          <MessageSquarePlus className="mr-2 h-4 w-4" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Top Strategies Section with Info Icons */}
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Top Strategies
                  <div className="flex space-x-1 ml-2">
                    <ExplanationTooltip 
                      title={strategyExplanations.nakedCall.title}
                      content={strategyExplanations.nakedCall.content}
                      iconClass="text-[#00FF7F]"
                    />
                    <ExplanationTooltip 
                      title={strategyExplanations.nakedPut.title}
                      content={strategyExplanations.nakedPut.content}
                      iconClass="text-[#00FF7F]"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-border/50">
                    <h3 className="font-medium mb-1">Iron Condor</h3>
                    <p className="text-sm text-muted-foreground">Trading range-bound markets with defined risk</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-border/50">
                    <h3 className="font-medium mb-1">Covered Calls</h3>
                    <p className="text-sm text-muted-foreground">Generate income while holding stock positions</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-border/50">
                    <h3 className="font-medium mb-1">Bull Put Spread</h3>
                    <p className="text-sm text-muted-foreground">Bullish strategy with defined risk/reward</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Community feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <CommunityPost 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                  onReaction={handleReaction} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <ActivityFeed />
          </TabsContent>
          
          <TabsContent value="my-activity" className="space-y-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You don't have any activity yet. Start by posting or interacting with the community!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface CommunityPostProps {
  post: Post;
  onLike: (postId: number) => void;
  onReaction: (postId: number, emoji: string) => void;
}

// Community Post Component
const CommunityPost = ({ post, onLike, onReaction }: CommunityPostProps) => {
  const [showReactions, setShowReactions] = useState(false);
  
  const reactionEmojis = ["👍", "❤️", "🔥", "🚀", "🧠", "💰", "🤔", "👏"];
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{post.author.name}</h3>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <span>@{post.author.username}</span>
                  <span>·</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
              <div className="text-sm text-optionpulse-blue/80 italic">
                {post.activity}
              </div>
            </div>
            
            <div className="mt-3 space-y-3">
              <p>{post.content}</p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-optionpulse-blue/30 text-optionpulse-blue">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {Object.keys(post.reactions).length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 bg-background/20 rounded-md">
                  {Object.entries(post.reactions).map(([emoji, count]) => (
                    count > 0 && (
                      <Badge key={emoji} variant="outline" className="bg-background/30 border-background/30">
                        {emoji} {count}
                      </Badge>
                    )
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-4 pt-2">
                <button
                  className={cn(
                    "flex items-center text-sm gap-1",
                    post.hasLiked ? "text-optionpulse-blue" : "text-muted-foreground"
                  )}
                  onClick={() => onLike(post.id)}
                >
                  <Heart size={16} className={post.hasLiked ? "fill-current" : ""} />
                  <span>{post.likes}</span>
                </button>
                
                <button
                  className="flex items-center text-sm gap-1 text-muted-foreground"
                >
                  <MessageCircle size={16} />
                  <span>{post.comments}</span>
                </button>
                
                <div className="relative">
                  <button
                    className="flex items-center text-sm gap-1 text-muted-foreground"
                    onClick={() => setShowReactions(!showReactions)}
                  >
                    <span>React</span>
                  </button>
                  
                  {showReactions && (
                    <div className="absolute z-10 top-8 left-0 bg-card border border-border rounded-md p-2 flex space-x-2">
                      {reactionEmojis.map(emoji => (
                        <button
                          key={emoji}
                          className="hover:bg-muted p-1 rounded"
                          onClick={() => {
                            onReaction(post.id, emoji);
                            setShowReactions(false);
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  className="flex items-center text-sm gap-1 text-muted-foreground ml-auto"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Activity Feed Component
const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: "John Smith",
      action: "predicted a 20% gain on SPY calls",
      time: "1h ago"
    },
    {
      id: 2,
      user: "Emily Chen",
      action: "shared a new volatility strategy guide",
      time: "3h ago"
    },
    {
      id: 3,
      user: "David Wilson",
      action: "posted about TSLA iron condor success",
      time: "6h ago"
    },
    {
      id: 4,
      user: "Rachel Park",
      action: "analyzed earnings volatility on NVDA",
      time: "12h ago"
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "started a discussion on theta decay tactics",
      time: "1d ago"
    }
  ];
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Trending Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-optionpulse-blue animate-pulse-subtle"></div>
                <div className="flex-1">
                  <p>
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Community;
