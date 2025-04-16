
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LessonHeaderProps {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
}

const LessonHeader = ({ 
  title, 
  description, 
  difficulty, 
  duration 
}: LessonHeaderProps) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "border-optionpulse-green text-optionpulse-green";
      case "intermediate":
        return "border-optionpulse-blue text-optionpulse-blue";
      case "advanced":
        return "border-optionpulse-red text-optionpulse-red";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/education")}
          className="border-border/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Badge
          variant="outline"
          className={`text-xs ${getDifficultyColor(difficulty)}`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
        
        <Badge variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
          {duration}
        </Badge>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </>
  );
};

export default LessonHeader;
