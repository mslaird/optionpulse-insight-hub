
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommunityPost from "./CommunityPost";
import { initialFollowedUsers, FollowedUser } from "@/data/followedUsers";
import { mockTimelinePosts } from "@/data/timelinePosts";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/types/community";

interface FollowingTabProps {
  followedUsers: FollowedUser[];
  savedPostIds: number[];
  onLike: (postId: number) => void;
  onReaction: (postId: number, emoji: string) => void;
  onSave: (post: Post) => void;
  onFollow: (username: string) => void;
  onComment: (postId: number, comment: string) => void;
}

const FollowingTab = ({ 
  followedUsers, 
  savedPostIds,
  onLike, 
  onReaction, 
  onSave,
  onFollow,
  onComment
}: FollowingTabProps) => {
  const [followingPosts, setFollowingPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Get usernames of followed users
    const followedUsernames = followedUsers.map(user => user.username);
    
    // Filter timeline posts to only include those from followed users
    const filteredPosts = mockTimelinePosts
      .filter(post => followedUsernames.includes(post.author.username))
      .map(post => {
        // Format to Post type
        return {
          id: post.id,
          author: post.author,
          timestamp: formatDistanceToNow(new Date(post.timestamp), { addSuffix: true }),
          content: post.content,
          likes: post.likes,
          comments: post.comments,
          activity: `shared a post about ${post.tags.join(", ")}`,
          tags: post.tags,
          hasLiked: false,
          reactions: { "👍": 0, "❤️": 0, "🔥": 0, "🚀": 0, "🧠": 0, "💰": 0 },
          commentThreads: []
        };
      })
      .sort((a, b) => {
        // Sort by most recent first (based on timestamp)
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    
    setFollowingPosts(filteredPosts);
  }, [followedUsers]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Following</h2>
      </div>
      
      {followingPosts.length > 0 ? (
        <ScrollArea className="h-[700px] pr-4">
          <div className="space-y-4">
            {followingPosts.map((post) => (
              <CommunityPost 
                key={post.id} 
                post={post} 
                onLike={onLike} 
                onReaction={onReaction} 
                onSave={onSave}
                onFollow={onFollow}
                onComment={onComment}
                isSaved={savedPostIds.includes(post.id)}
                isFollowing={true}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">No Posts From Followed Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You're not following anyone yet, or the users you follow haven't posted anything.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FollowingTab;
