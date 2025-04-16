
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TimelinePost, mockTimelinePosts } from "@/data/timelinePosts";

const TimelineTab = () => {
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  
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
      interactionScore: post.likes + (post.comments * 2)
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
                      <div>
                        <h3 className="font-medium">{post.author.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <span>@{post.author.username}</span>
                          <span>·</span>
                          <span>{formatTimestamp(post.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="flex items-center text-optionpulse-green">
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center text-optionpulse-blue">
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments}
                        </span>
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
