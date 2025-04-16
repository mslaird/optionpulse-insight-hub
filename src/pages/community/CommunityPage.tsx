
import { useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Post, CommentThread } from "@/types/community";
import { SavedPost } from "@/data/savedPosts";
import { initialSavedPosts } from "@/data/savedPosts";
import { initialFollowedUsers, FollowedUser } from "@/data/followedUsers";
import CommunityTabs from "./CommunityTabs";
import FeedTab from "./tabs/FeedTab";
import FollowingTab from "@/components/community/FollowingTab";
import TimelineTab from "@/components/community/TimelineTab";
import ActivityFeed from "@/components/community/ActivityFeed";
import SavedPostsList from "@/components/community/SavedPostsList";
import MyActivityTab from "./tabs/MyActivityTab";

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

const strategyLessons = {
  "Iron Condor": "iron-condor",
  "Covered Calls": "covered-calls",
  "Bull Put Spread": "cash-secured-puts"
};

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>(initialSavedPosts);
  const [followedUsers, setFollowedUsers] = useState<FollowedUser[]>(initialFollowedUsers);
  const [activeTab, setActiveTab] = useState("feed");
  const { toast } = useToast();

  const handlePostSubmit = (content: string) => {
    const newPostObj: Post = {
      id: posts.length + 1,
      author: {
        name: "Current User",
        avatar: "https://i.pravatar.cc/150?img=12",
        username: "you"
      },
      timestamp: "Just now",
      content: content,
      likes: 0,
      comments: 0,
      activity: "shared a new insight",
      tags: [],
      hasLiked: false,
      reactions: {
        "👍": 0,
        "🧠": 0,
        "💰": 0
      },
      commentThreads: []
    };
    
    setPosts([newPostObj, ...posts]);
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
          updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
        } else {
          updatedReactions[emoji] = 1;
        }
        return { ...post, reactions: updatedReactions };
      }
      return post;
    }));
  };

  const handleSavePost = (post: Post) => {
    const isAlreadySaved = savedPosts.some(savedPost => savedPost.id === post.id);
    
    if (isAlreadySaved) {
      setSavedPosts(savedPosts.filter(savedPost => savedPost.id !== post.id));
      toast({
        title: "Post removed",
        description: "This post has been removed from your saved posts.",
      });
    } else {
      setSavedPosts([...savedPosts, post as SavedPost]);
      toast({
        title: "Post saved",
        description: "This post has been added to your saved posts.",
      });
    }
  };

  const handleRemoveSavedPost = (postId: number) => {
    setSavedPosts(savedPosts.filter(post => post.id !== postId));
    toast({
      title: "Post removed",
      description: "This post has been removed from your saved posts.",
    });
  };

  const isPostSaved = (postId: number) => {
    return savedPosts.some(savedPost => savedPost.id === postId);
  };

  const getSavedPostIds = useCallback(() => {
    return savedPosts.map(post => post.id);
  }, [savedPosts]);

  const handleFollowUser = (username: string) => {
    const isAlreadyFollowing = followedUsers.some(user => user.username === username);
    
    if (isAlreadyFollowing) {
      setFollowedUsers(followedUsers.filter(user => user.username !== username));
      toast({
        title: "Unfollowed",
        description: `You are no longer following @${username}.`,
      });
    } else {
      const newFollowedUser: FollowedUser = {
        username,
        followedAt: new Date().toISOString()
      };
      setFollowedUsers([...followedUsers, newFollowedUser]);
      toast({
        title: "Following",
        description: `You are now following @${username}.`,
      });
    }
  };

  const handleComment = (postId: number, commentText: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: CommentThread = {
          name: "You",
          username: "current_user",
          avatar: "https://i.pravatar.cc/150?img=12",
          text: commentText
        };
        
        return {
          ...post,
          comments: post.comments + 1,
          commentThreads: [...(post.commentThreads || []), newComment]
        };
      }
      return post;
    }));
  };

  const isUserFollowing = useCallback((username: string) => {
    return followedUsers.some(user => user.username === username);
  }, [followedUsers]);

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
          <CommunityTabs />
          
          <TabsContent value="feed" className="space-y-6">
            <FeedTab 
              posts={posts}
              onPostSubmit={handlePostSubmit}
              strategyExplanations={strategyExplanations}
              strategyLessons={strategyLessons}
              onLike={handleLike}
              onReaction={handleReaction}
              onSave={handleSavePost}
              onFollow={handleFollowUser}
              onComment={handleComment}
              isPostSaved={isPostSaved}
              isUserFollowing={isUserFollowing}
            />
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <FollowingTab 
              followedUsers={followedUsers}
              savedPostIds={getSavedPostIds()}
              onLike={handleLike}
              onReaction={handleReaction}
              onSave={handleSavePost}
              onFollow={handleFollowUser}
              onComment={handleComment}
            />
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <TimelineTab 
              followedUsers={followedUsers}
              savedPostIds={getSavedPostIds()}
              onLike={handleLike}
              onSave={handleSavePost}
              onFollow={handleFollowUser}
              onComment={handleComment}
            />
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <ActivityFeed />
          </TabsContent>
          
          <TabsContent value="saved-posts" className="space-y-6">
            <SavedPostsList 
              savedPosts={savedPosts}
              onRemove={handleRemoveSavedPost}
            />
          </TabsContent>
          
          <TabsContent value="my-activity" className="space-y-6">
            <MyActivityTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
