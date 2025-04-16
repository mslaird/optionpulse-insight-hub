import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import strategyDefinitions from "@/data/strategyDefinitions";
import LessonHeader from "./LessonHeader";
import VideoPlayer from "./VideoPlayer";
import LessonTranscript from "./LessonTranscript";
import RelatedStrategy from "./RelatedStrategy";

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

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto">
        <LessonHeader 
          title={lesson.title}
          description={lesson.description}
          difficulty={lesson.difficulty}
          duration={lesson.duration}
        />
        
        <VideoPlayer 
          title={lesson.title}
          duration={lesson.duration}
          videoSrc={lesson.videoSrc}
        />
        
        <LessonTranscript transcript={lesson.transcript} />
        
        <RelatedStrategy strategy={relatedStrategy} />
      </div>
    </Layout>
  );
};

export default LessonPage;
