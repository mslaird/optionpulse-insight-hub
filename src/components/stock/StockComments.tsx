
import React, { useState } from "react";
import { StockComment, stockComments } from "@/data/stockComments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { toast } from "sonner";

interface StockCommentsProps {
  ticker: string;
}

const StockComments = ({ ticker }: StockCommentsProps) => {
  const [comments, setComments] = useState<StockComment[]>(
    stockComments.filter((comment) => comment.stock === ticker)
  );
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const comment: StockComment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      user: {
        name: "You",
        username: "currentuser",
        avatar: "https://ui-avatars.com/api/?name=You&background=5D5FEF&color=fff"
      },
      content: newComment,
      timestamp: new Date().toISOString().split("T")[0],
      stock: ticker
    };

    setComments([comment, ...comments]);
    setNewComment("");
    toast.success("Comment added");
  };

  if (comments.length === 0) {
    return (
      <Card className="bg-card/30 backdrop-blur-sm border-border/50 mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No comments yet. Be the first to comment!</p>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts on this stock..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] bg-sidebar-accent resize-none"
              />
              <Button 
                onClick={handleAddComment} 
                className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80"
              >
                <SendHorizontal className="mr-2 h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts on this stock..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-sidebar-accent resize-none"
          />
          <Button 
            onClick={handleAddComment} 
            className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80"
          >
            <SendHorizontal className="mr-2 h-4 w-4" />
            Post Comment
          </Button>
        </div>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-sidebar-accent p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="flex-shrink-0">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{comment.user.name}</h3>
                        <div className="flex items-center flex-wrap space-x-1 text-sm text-muted-foreground">
                          <span className="truncate">@{comment.user.username}</span>
                          <span>·</span>
                          <span>{comment.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="break-words whitespace-pre-wrap text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StockComments;
