import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import EducationHeader from "@/components/education/EducationHeader";
import EducationFilters from "@/components/education/EducationFilters";
import { LessonsContent, ResourcesContent } from "@/components/education/EducationContent";

// Mock data for lessons
const lessonsData = [
  {
    id: "covered-calls",
    title: "Selling Covered Calls",
    description: "Learn how to generate income on stocks you already own by selling call options.",
    difficulty: "beginner",
    duration: "20 min",
    completed: true,
    category: "options-basics"
  },
  {
    id: "cash-secured-puts",
    title: "Cash-Secured Puts",
    description: "Discover how to buy stocks at a discount using cash-secured puts.",
    difficulty: "beginner",
    duration: "25 min",
    progress: 60,
    category: "options-basics"
  },
  {
    id: "naked-calls",
    title: "Understanding Naked Calls",
    description: "Understand the risks and potential rewards of selling uncovered call options.",
    difficulty: "advanced",
    duration: "30 min",
    category: "options-basics"
  },
  {
    id: "bull-put-spread",
    title: "Bull Put Spread Strategy",
    description: "Learn how to use bull put spreads for a bullish market outlook with defined risk.",
    difficulty: "intermediate",
    duration: "22 min",
    category: "spreads"
  },
  {
    id: "iron-condor",
    title: "Iron Condor Strategy",
    description: "Master the iron condor strategy for neutral market environments.",
    difficulty: "advanced",
    duration: "35 min",
    category: "multi-leg"
  },
  {
    id: "straddle",
    title: "Long Straddle Strategy",
    description: "Learn how to profit from significant price movements regardless of direction.",
    difficulty: "intermediate",
    duration: "28 min",
    category: "multi-leg"
  },
  {
    id: "greeks-basics",
    title: "Options Greeks Basics",
    description: "Master the fundamental Greeks: Delta, Gamma, Theta, and Vega.",
    difficulty: "intermediate",
    duration: "35 min",
    progress: 25,
    category: "theory"
  },
  {
    id: "iv-explained",
    title: "Implied Volatility Explained",
    description: "Learn how implied volatility affects option prices and trading strategies.",
    difficulty: "intermediate",
    duration: "28 min",
    category: "theory"
  },
  {
    id: "options-expiration",
    title: "Options Expiration Guide",
    description: "Understand what happens during options expiration and how to prepare.",
    difficulty: "beginner",
    duration: "15 min",
    category: "theory"
  }
];

// Mock data for resources
const resourcesData = [
  {
    title: "The Wheel Strategy Explained",
    type: "article",
    source: "OptionAlpha",
    url: "#",
    tags: ["strategy", "income"]
  },
  {
    title: "Volatility Skew and Options Pricing",
    type: "video",
    source: "TastyTrade",
    url: "#",
    tags: ["volatility", "pricing"]
  },
  {
    title: "Options Strategies for Earnings Season",
    type: "ebook",
    source: "OptionPulse",
    url: "#",
    tags: ["earnings", "strategy"]
  },
  {
    title: "Adjusting Options Positions",
    type: "article",
    source: "Options Playbook",
    url: "#",
    tags: ["risk management", "adjustments"]
  }
];

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
};

const categoryLabels = {
  "options-basics": "Options Basics",
  "spreads": "Spread Strategies",
  "multi-leg": "Multi-Leg Strategies",
  "theory": "Options Theory"
};

const Education = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Filter lessons based on search term and filters
  const filteredLessons = lessonsData.filter(lesson => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty ? lesson.difficulty === selectedDifficulty : true;
    const matchesCategory = selectedCategory ? lesson.category === selectedCategory : true;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  // Filter resources based on search term
  const filteredResources = resourcesData.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Clear all filters
  const clearFilters = () => {
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };
  
  // Clear search and filters
  const clearAllFilters = () => {
    setSearchTerm("");
    clearFilters();
  };

  // Clear search only
  const clearSearch = () => {
    setSearchTerm("");
  };
  
  // Determine if any filters are active
  const hasActiveFilters = selectedDifficulty !== null || selectedCategory !== null;

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <EducationHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <Tabs defaultValue="lessons" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <EducationFilters 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            difficultyLabels={difficultyLabels}
            categoryLabels={categoryLabels}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            isMobile={isMobile}
          />
          
          <LessonsContent 
            filteredLessons={filteredLessons}
            searchTerm={searchTerm}
            clearAllFilters={clearAllFilters}
          />
          
          <ResourcesContent 
            filteredResources={filteredResources}
            searchTerm={searchTerm}
            clearSearch={clearSearch}
          />
        </Tabs>
      </div>
    </Layout>
  );
};

export default Education;
