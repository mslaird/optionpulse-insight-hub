
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import strategyDefinitions from "@/data/strategyDefinitions";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock lesson data - In a real app, this would come from an API
const lessonsData = {
  "covered-calls": {
    title: "Selling Covered Calls",
    description: "Learn how to generate income on stocks you already own by selling call options.",
    difficulty: "beginner",
    duration: "20 min",
    videoSrc: "/assets/videos/covered-call.mp4",
    transcript: "In this lesson, we'll explore how to sell covered calls - a popular options strategy for generating income on stocks you already own. A covered call involves selling a call option against shares of stock you own, collecting premium upfront. This strategy is considered relatively low-risk and can be a great way to earn additional income on stocks you plan to hold long-term."
  },
  "cash-secured-puts": {
    title: "Cash-Secured Puts",
    description: "Discover how to buy stocks at a discount using cash-secured puts.",
    difficulty: "beginner",
    duration: "25 min",
    videoSrc: "/assets/videos/cash-secured-put.mp4",
    transcript: "Cash-secured puts are a strategy where you sell put options while setting aside the cash needed to purchase shares if assigned. This strategy can help you acquire stocks at a lower price than the current market value while earning premium income. It's ideal for investors who want to buy a stock but are willing to wait for a better entry point."
  },
  "naked-calls": {
    title: "Understanding Naked Calls",
    description: "Understand the risks and potential rewards of selling uncovered call options.",
    difficulty: "advanced",
    duration: "30 min",
    videoSrc: "/assets/videos/naked-call.mp4",
    transcript: "Naked calls, or uncovered calls, involve selling call options without owning the underlying stock. This is considered a high-risk strategy as it exposes the seller to potentially unlimited losses if the stock price rises significantly. In this lesson, we'll explore when this strategy might be appropriate, how to manage risk, and alternatives to consider."
  },
  "bull-put-spread": {
    title: "Bull Put Spread Strategy",
    description: "Learn how to use bull put spreads for a bullish market outlook with defined risk.",
    difficulty: "intermediate",
    duration: "22 min",
    videoSrc: "/assets/videos/bull-put-spread.mp4",
    transcript: "A bull put spread is a credit spread options strategy used when an investor has a moderately bullish view on a security. This strategy involves selling a higher strike put option and buying a lower strike put option of the same expiration. The maximum profit is the net credit received, while the maximum loss is the difference between strike prices minus the net credit."
  },
  "iron-condor": {
    title: "Iron Condor Strategy",
    description: "Master the iron condor strategy for neutral market environments.",
    difficulty: "advanced",
    duration: "35 min",
    videoSrc: "/assets/videos/iron-condor.mp4",
    transcript: "The iron condor is a popular options strategy that combines a bull put spread with a bear call spread to create a position that profits when the underlying asset trades within a range. This strategy is market-neutral and aims to benefit from time decay and low volatility. We'll explore how to set up an iron condor, manage risk, and adjust the position as needed."
  },
  "straddle": {
    title: "Long Straddle Strategy",
    description: "Learn how to profit from significant price movements regardless of direction.",
    difficulty: "intermediate",
    duration: "28 min",
    videoSrc: "/assets/videos/straddle.mp4",
    transcript: "A long straddle is an options strategy where you simultaneously purchase a call option and a put option on the same underlying asset, with the same strike price and expiration date. This strategy is used when you expect a significant price movement but are uncertain about the direction. The strategy profits when the underlying asset moves significantly in either direction."
  }
};

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Get lesson data
  const lesson = id && lessonsData[id as keyof typeof lessonsData];
  
  // Get related strategy definition
  const relatedStrategy = strategyDefinitions[id as keyof typeof strategyDefinitions];
  
  if (!lesson) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-semibold mb-4">Lesson not found</h2>
          <Button onClick={() => navigate("/education")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Education Hub
          </Button>
        </div>
      </Layout>
    );
  }
  
  const startVideo = () => {
    setIsPlaying(true);
    // In a real app, we would increment progress gradually
    // For demo purposes, we'll set a timeout to simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 500);
  };
  
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
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto">
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
            className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}
          >
            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
          </Badge>
          
          <Badge variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
            {lesson.duration}
          </Badge>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
        
        <div className="w-full flex flex-col space-y-4">
          {!isPlaying ? (
            <div 
              className="relative w-full sm:w-3/4 aspect-video mx-auto bg-optionpulse-charcoal rounded-lg overflow-hidden cursor-pointer flex items-center justify-center border border-border/50 group hover:border-optionpulse-blue/70 transition-all" 
              onClick={startVideo}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-optionpulse-navy/70 to-optionpulse-charcoal/70 z-10"></div>
              <div className="w-20 h-20 rounded-full bg-optionpulse-blue/20 flex items-center justify-center z-20 transition-all group-hover:scale-110">
                <Play size={32} className="text-optionpulse-blue ml-1" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-medium">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.duration}</p>
              </div>
            </div>
          ) : (
            <div className="w-full sm:w-3/4 mx-auto">
              <video 
                src={lesson.videoSrc} 
                className="w-full rounded-lg border border-border/50"
                controls 
                autoPlay
                onTimeUpdate={(e) => {
                  const video = e.target as HTMLVideoElement;
                  const percent = (video.currentTime / video.duration) * 100;
                  setProgress(percent);
                }}
              >
                Your browser does not support the video tag.
              </video>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5 mt-1" />
              </div>
            </div>
          )}
          
          <div className="w-full sm:w-3/4 mx-auto mt-6">
            <h3 className="font-medium text-lg mb-3">Transcript</h3>
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{lesson.transcript}</p>
              </CardContent>
            </Card>
          </div>
          
          {relatedStrategy && (
            <div className="w-full sm:w-3/4 mx-auto mt-6">
              <h3 className="font-medium text-lg mb-3">Related Strategy Guide</h3>
              <Card className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-optionpulse-blue/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{relatedStrategy.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{relatedStrategy.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      View <ExternalLink size={14} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LessonPage;
