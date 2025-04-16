
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostComposerProps {
  onPostSubmit: (content: string) => void;
}

const PostComposer = ({ onPostSubmit }: PostComposerProps) => {
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    onPostSubmit(newPost);
    setNewPost("");
    
    toast({
      title: "Post created",
      description: "Your post has been published to the community",
    });
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
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
  );
};

export default PostComposer;
