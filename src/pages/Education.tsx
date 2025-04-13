
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import LessonCard from "@/components/education/LessonCard";
import ResourceCard from "@/components/education/ResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for lessons
const lessonsData = [
  {
    id: "covered-calls",
    title: "Selling Covered Calls",
    description: "Learn how to generate income on stocks you already own by selling call options.",
    difficulty: "beginner",
    duration: "20 min",
    completed: true
  },
  {
    id: "cash-secured-puts",
    title: "Cash-Secured Puts",
    description: "Discover how to buy stocks at a discount using cash-secured puts.",
    difficulty: "beginner",
    duration: "25 min",
    progress: 60
  },
  {
    id: "naked-calls",
    title: "Understanding Naked Calls",
    description: "Understand the risks and potential rewards of selling uncovered call options.",
    difficulty: "advanced",
    duration: "30 min"
  },
  {
    id: "greeks-basics",
    title: "Options Greeks Basics",
    description: "Master the fundamental Greeks: Delta, Gamma, Theta, and Vega.",
    difficulty: "intermediate",
    duration: "35 min",
    progress: 25
  },
  {
    id: "iv-explained",
    title: "Implied Volatility Explained",
    description: "Learn how implied volatility affects option prices and trading strategies.",
    difficulty: "intermediate",
    duration: "28 min"
  },
  {
    id: "options-expiration",
    title: "Options Expiration Guide",
    description: "Understand what happens during options expiration and how to prepare.",
    difficulty: "beginner",
    duration: "15 min"
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

const Education = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lessons");
  
  // Filter lessons based on search term
  const filteredLessons = lessonsData.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter resources based on search term
  const filteredResources = resourcesData.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <div className="flex justify-between items-center">
            <TabsList className="bg-muted/30">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Beginner</Button>
              <Button variant="outline" size="sm">Intermediate</Button>
              <Button variant="outline" size="sm">Advanced</Button>
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
                  onClick={() => setSearchTerm("")} 
                  className="mt-4"
                >
                  Clear Search
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
