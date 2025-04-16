
import React from "react";
import { Post } from "@/types/community";
import CommunityPost from "@/components/community/CommunityPost";
import PostComposer from "@/components/community/PostComposer";
import TopStrategies from "@/components/community/TopStrategies";

interface FeedTabProps {
  posts: Post[];
  onPostSubmit: (content: string) => void;
  strategyExplanations: {
    [key: string]: {
      title: string;
      content: string;
    }
  };
  strategyLessons: {
    [key: string]: string;
  };
  onLike: (postId: number) => void;
  onReaction: (postId: number, emoji: string) => void;
  onSave: (post: Post) => void;
  onFollow: (username: string) => void;
  onComment: (postId: number, comment: string) => void;
  isPostSaved: (postId: number) => boolean;
  isUserFollowing: (username: string) => boolean;
}

const FeedTab = ({ 
  posts, 
  onPostSubmit, 
  strategyExplanations, 
  strategyLessons,
  onLike,
  onReaction,
  onSave,
  onFollow,
  onComment,
  isPostSaved,
  isUserFollowing
}: FeedTabProps) => {
  return (
    <>
      <PostComposer onPostSubmit={onPostSubmit} />
      
      <TopStrategies 
        strategyExplanations={strategyExplanations} 
        strategyLessons={strategyLessons} 
      />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <CommunityPost 
            key={post.id} 
            post={post} 
            onLike={onLike} 
            onReaction={onReaction} 
            onSave={onSave}
            onFollow={onFollow}
            onComment={onComment}
            isSaved={isPostSaved(post.id)}
            isFollowing={isUserFollowing(post.author.username)}
          />
        ))}
      </div>
    </>
  );
};

export default FeedTab;
