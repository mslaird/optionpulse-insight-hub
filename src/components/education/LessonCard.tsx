
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  completed?: boolean;
  progress?: number;
}

const LessonCard = ({ 
  id, 
  title, 
  description, 
  difficulty, 
  duration, 
  completed = false,
  progress = 0
}: LessonCardProps) => {
  return (
    <Card className="h-full bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden flex flex-col transition-all hover:border-optionpulse-blue/50">
      <CardHeader className="bg-gradient-to-r from-optionpulse-navy to-optionpulse-charcoal p-4 flex flex-row items-start space-y-0 gap-3">
        <div className="w-10 h-10 rounded-full bg-optionpulse-blue/20 flex items-center justify-center flex-shrink-0">
          <BookOpen size={18} className="text-optionpulse-blue" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                difficulty === "beginner" && "border-optionpulse-green text-optionpulse-green",
                difficulty === "intermediate" && "border-optionpulse-blue text-optionpulse-blue",
                difficulty === "advanced" && "border-optionpulse-red text-optionpulse-red",
              )}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
              {duration}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {!completed && progress > 0 && (
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-optionpulse-blue rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/education/${id}`} className="w-full">
          <Button 
            variant={completed ? "outline" : "default"} 
            className={cn(
              "w-full",
              completed && "border-optionpulse-green text-optionpulse-green hover:text-optionpulse-green hover:bg-optionpulse-green/10"
            )}
          >
            {completed ? "Review Lesson" : progress > 0 ? "Continue" : "Start Lesson"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
