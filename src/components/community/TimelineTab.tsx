
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCcw, Heart, MessageCircle, Bookmark, UserPlus, UserCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TimelinePost, mockTimelinePosts } from "@/data/timelinePosts";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FollowedUser } from "@/data/followedUsers";

interface TimelineTabProps {
  followedUsers: FollowedUser[];
  savedPostIds: number[];
  onLike: (postId: number) => void;
  onSave: (post: any) => void;
  onFollow: (username: string) => void;
  onComment: (postId: number, comment: string) => void;
}

interface EnhancedTimelinePost extends TimelinePost {
  hasLiked: boolean;
  comments: number;
  commentThreads?: Array<{
    name: string;
    username: string;
    avatar: string;
    text: string;
  }>;
}

const TimelineTab = ({ 
  followedUsers, 
  savedPostIds, 
  onLike, 
  onSave, 
  onFollow,
  onComment
}: TimelineTabProps) => {
  const [posts, setPosts] = useState<EnhancedTimelinePost[]>([]);
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  
  // Function to sort posts based on recency and interaction score
  const sortPosts = (postsToSort: TimelinePost[]) => {
    // Filter to only include posts from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // First, sort by timestamp (newest first)
    const sortedByTime = [...postsToSort].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Calculate interaction score for each post (likes + 2*comments)
    const withScores = sortedByTime.map(post => ({
      ...post,
      interactionScore: post.likes + (post.comments * 2),
      hasLiked: false, // Initialize hasLiked property
      commentThreads: [] // Initialize commentThreads property
    }));
    
    // Identify the top 20% posts by interaction score
    const numTopPosts = Math.ceil(withScores.length * 0.2);
    const topPosts = [...withScores]
      .sort((a, b) => (b.interactionScore || 0) - (a.interactionScore || 0))
      .slice(0, numTopPosts);
    
    // Remove the top posts from the time-sorted array
    const regularPosts = withScores.filter(
      post => !topPosts.some(topPost => topPost.id === post.id)
    );
    
    // Combine arrays: top posts first, then regular time-sorted posts
    return [...topPosts, ...regularPosts];
  };
  
  // Initialize posts
  useEffect(() => {
    setPosts(sortPosts(mockTimelinePosts));
  }, []);
  
  // Handler for refresh button
  const handleRefresh = () => {
    // Shuffle posts to simulate updates
    const shuffled = [...mockTimelinePosts]
      .sort(() => Math.random() - 0.5)
      .map((post, index) => ({
        ...post,
        id: index + 1,
        likes: Math.floor(Math.random() * 50) + 5,
        comments: Math.floor(Math.random() * 15) + 1,
        hasLiked: false,
        commentThreads: []
      }));
      
    setPosts(sortPosts(shuffled));
  };
  
  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return timestamp;
    }
  };

  // Handle like button click
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1, 
            hasLiked: !post.hasLiked 
          } 
        : post
    ));
    
    onLike(postId);
  };

  // Handle comment submission
  const handleCommentSubmit = (postId: number) => {
    if (commentText.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentThreads: [
                ...(post.commentThreads || []),
                {
                  name: "You",
                  username: "current_user",
                  avatar: "https://i.pravatar.cc/150?img=50",
                  text: commentText
                }
              ]
            }
          : post
      ));
      
      onComment(postId, commentText);
      setCommentText("");
      setCommentingPostId(null);
    }
  };

  // Check if a user is being followed
  const isFollowing = (username: string) => {
    return followedUsers.some(user => user.username === username);
  };

  // Convert timeline post to savable format
  const convertToSavablePost = (post: EnhancedTimelinePost) => {
    return {
      id: post.id,
      author: post.author,
      timestamp: formatTimestamp(post.timestamp),
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      activity: `shared insights on ${post.tags.join(", ")}`,
      tags: post.tags,
      hasLiked: post.hasLiked,
      reactions: { "👍": 0, "❤️": 0, "🔥": 0, "🚀": 0, "🧠": 0, "💰": 0 },
      commentThreads: post.commentThreads || []
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          className="bg-optionpulse-blue/10 hover:bg-optionpulse-blue/20 text-optionpulse-blue"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <ScrollArea className="h-[700px] pr-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card/30 backdrop-blur-sm border-border/50 hover:bg-card/40 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{post.author.name}</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={cn(
                            "h-8 px-3 text-xs gap-1",
                            isFollowing(post.author.username) 
                              ? "bg-optionpulse-blue/20 text-optionpulse-blue border-optionpulse-blue/30" 
                              : "bg-background/30 hover:bg-optionpulse-blue/10 hover:text-optionpulse-blue"
                          )}
                          onClick={() => onFollow(post.author.username)}
                        >
                          {isFollowing(post.author.username) ? (
                            <>
                              <UserCheck size={14} />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus size={14} />
                              <span>Follow</span>
                            </>
                          )}
                        </Button>
                        <div className="text-sm text-muted-foreground">
                          <span>@{post.author.username}</span>
                          <span className="mx-1">·</span>
                          <span>{formatTimestamp(post.timestamp)}</span>
                        </div>
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

                      {post.commentThreads && post.commentThreads.length > 0 && (
                        <div className="mt-4 space-y-3 bg-background/20 p-3 rounded-md">
                          <h4 className="text-sm font-medium">Comments</h4>
                          {post.commentThreads.map((comment, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium">{comment.name}</span>
                                  <span className="text-xs text-muted-foreground">@{comment.username}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <button 
                          className={`flex items-center gap-1 ${post.hasLiked ? 'text-optionpulse-blue' : 'text-muted-foreground'} hover:text-optionpulse-blue transition-colors`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart size={18} className={post.hasLiked ? 'fill-current' : ''} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center gap-1 text-muted-foreground hover:text-optionpulse-blue transition-colors"
                          onClick={() => setCommentingPostId(commentingPostId === post.id ? null : post.id)}
                        >
                          <MessageCircle size={18} />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button 
                          className={`flex items-center gap-1 ${savedPostIds.includes(post.id) ? 'text-optionpulse-green' : 'text-muted-foreground'} hover:text-optionpulse-green transition-colors`}
                          onClick={() => onSave(convertToSavablePost(post))}
                        >
                          <Bookmark size={18} className={savedPostIds.includes(post.id) ? 'fill-current' : ''} />
                          <span>{savedPostIds.includes(post.id) ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>

                      {commentingPostId === post.id && (
                        <div className="mt-3 space-y-2">
                          <Textarea 
                            placeholder="Write a comment..." 
                            className="min-h-[80px] bg-background/30"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setCommentingPostId(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!commentText.trim()}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TimelineTab;
