
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/types/community";

interface CommunityPostProps {
  post: Post;
  onLike: (postId: number) => void;
  onReaction: (postId: number, emoji: string) => void;
  onSave: (post: Post) => void;
  isSaved: boolean;
}

const CommunityPost = ({ post, onLike, onReaction, onSave, isSaved }: CommunityPostProps) => {
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
                  className={cn(
                    "flex items-center text-sm gap-1",
                    isSaved ? "text-optionpulse-green" : "text-muted-foreground"
                  )}
                  onClick={() => onSave(post)}
                >
                  {isSaved ? (
                    <BookmarkCheck size={16} className="fill-current" />
                  ) : (
                    <Bookmark size={16} />
                  )}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
                
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

export default CommunityPost;
