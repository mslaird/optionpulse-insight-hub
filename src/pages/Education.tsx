
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import LessonCard from "@/components/education/LessonCard";
import ResourceCard from "@/components/education/ResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Filter, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  
  // Determine if any filters are active
  const hasActiveFilters = selectedDifficulty !== null || selectedCategory !== null;

  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Education Hub</h1>
            <p className="text-muted-foreground">Learn options trading strategies and concepts</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search lessons & resources..."
              className="pl-10 bg-muted/30 border-muted/30 focus:border-optionpulse-blue w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="lessons" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <TabsList className="bg-muted/30">
              <TabsTrigger value="lessons" className="flex gap-2 items-center">
                <BookOpen size={16} />
                <span>Lessons</span>
              </TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              {isMobile ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      <Filter size={14} />
                      <span>Filters</span>
                      {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-optionpulse-blue"></span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-3">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Difficulty</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(difficultyLabels).map(([key, label]) => (
                            <Button
                              key={key}
                              variant={selectedDifficulty === key ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedDifficulty(selectedDifficulty === key ? null : key)}
                              className="flex gap-1"
                            >
                              {selectedDifficulty === key && <Check size={12} />}
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Category</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(categoryLabels).map(([key, label]) => (
                            <Button
                              key={key}
                              variant={selectedCategory === key ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                              className="flex gap-1"
                            >
                              {selectedCategory === key && <Check size={12} />}
                              {label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={selectedDifficulty ? "border-optionpulse-blue text-optionpulse-blue" : ""}
                      >
                        {selectedDifficulty 
                          ? difficultyLabels[selectedDifficulty as keyof typeof difficultyLabels] 
                          : "Difficulty"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3">
                      <div className="space-y-2">
                        {Object.entries(difficultyLabels).map(([key, label]) => (
                          <Button
                            key={key}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedDifficulty(selectedDifficulty === key ? null : key)}
                            className={`w-full justify-start ${selectedDifficulty === key ? "bg-muted" : ""}`}
                          >
                            <span className="mr-auto">{label}</span>
                            {selectedDifficulty === key && <Check size={16} />}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={selectedCategory ? "border-optionpulse-blue text-optionpulse-blue" : ""}
                      >
                        {selectedCategory 
                          ? categoryLabels[selectedCategory as keyof typeof categoryLabels] 
                          : "Category"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3">
                      <div className="space-y-2">
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <Button
                            key={key}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                            className={`w-full justify-start ${selectedCategory === key ? "bg-muted" : ""}`}
                          >
                            <span className="mr-auto">{label}</span>
                            {selectedCategory === key && <Check size={16} />}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          
          <TabsContent value="lessons" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  difficulty={lesson.difficulty as "beginner" | "intermediate" | "advanced"}
                  duration={lesson.duration}
                  completed={lesson.completed}
                  progress={lesson.progress}
                />
              ))}
            </div>
            
            {filteredLessons.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No lessons found for "{searchTerm}"</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    clearFilters();
                  }} 
                  className="mt-4"
                >
                  Clear Search & Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  title={resource.title}
                  type={resource.type as "article" | "video" | "ebook"}
                  source={resource.source}
                  url={resource.url}
                  tags={resource.tags}
                />
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No resources found for "{searchTerm}"</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")} 
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Education;
