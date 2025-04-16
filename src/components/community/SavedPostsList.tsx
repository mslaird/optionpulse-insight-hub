
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SavedPost } from "@/data/savedPosts";
import { Bookmark, BookmarkX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavedPostsListProps {
  savedPosts: SavedPost[];
  onRemove: (postId: number) => void;
}

const SavedPostsList = ({ savedPosts, onRemove }: SavedPostsListProps) => {
  if (savedPosts.length === 0) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground">
              Bookmark posts to save them for later
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {savedPosts.map((post) => (
          <Card key={post.id} className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Avatar className="flex-shrink-0">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{post.author.name}</h3>
                      <div className="flex items-center flex-wrap space-x-1 text-sm text-muted-foreground">
                        <span className="truncate">@{post.author.username}</span>
                        <span>·</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(post.id)}
                      className="text-optionpulse-red hover:text-optionpulse-red/90 hover:bg-optionpulse-red/10 flex-shrink-0"
                    >
                      <BookmarkX className="h-4 w-4 mr-1" />
                      <span className="text-sm">Remove</span>
                    </Button>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <p className="break-words whitespace-pre-wrap">{post.content}</p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-optionpulse-blue/30 text-optionpulse-blue">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-sm text-optionpulse-blue/80 italic">
                      {post.activity}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SavedPostsList;
