
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Trophy, 
  Award, 
  BookOpen, 
  Calendar, 
  Layers,
  Phone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Achievement {
  id: number;
  name: string;
  description: string;
  category: string;
  earnedOn: string;
  icon: React.ReactNode;
  progress?: number;
  maxProgress?: number;
}

// Define achievements data
const achievements: Achievement[] = [
  {
    id: 1,
    name: "Top Call Seller",
    description: "Completed 3 covered call challenges",
    category: "trading",
    earnedOn: "Apr 10, 2025",
    icon: <Trophy className="text-yellow-500" size={24} />,
    progress: 3,
    maxProgress: 3
  },
  {
    id: 2,
    name: "Layer 1 Starter",
    description: "Passed the Layer 1 blockchain quiz",
    category: "education",
    earnedOn: "Mar 28, 2025",
    icon: <Layers className="text-blue-500" size={24} />,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 3,
    name: "Options Strategist",
    description: "Created 5 custom options strategies",
    category: "trading",
    earnedOn: "Apr 05, 2025",
    icon: <Award className="text-purple-500" size={24} />,
    progress: 5,
    maxProgress: 5
  },
  {
    id: 4,
    name: "Early Adopter",
    description: "Joined OptionPulse in the first month",
    category: "platform",
    earnedOn: "Jan 15, 2025",
    icon: <Calendar className="text-green-500" size={24} />,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 5,
    name: "Mobile Trader",
    description: "Completed 3 trades on mobile",
    category: "platform",
    earnedOn: "Mar 20, 2025",
    icon: <Phone className="text-teal-500" size={24} />,
    progress: 3,
    maxProgress: 5
  },
  {
    id: 6,
    name: "Knowledge Seeker",
    description: "Completed 10 educational lessons",
    category: "education",
    earnedOn: "Feb 15, 2025",
    icon: <BookOpen className="text-amber-500" size={24} />,
    progress: 10,
    maxProgress: 20
  }
];

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "trading":
      return "Trading & Strategies";
    case "education":
      return "Education & Learning";
    case "platform":
      return "Platform Activity";
    default:
      return category;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "trading":
      return "bg-blue-500/20 text-blue-400";
    case "education":
      return "bg-purple-500/20 text-purple-400";
    case "platform":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const Achievements = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredAchievements = filter === "all" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Achievements</h1>
            <p className="text-muted-foreground">View your earned badges and accomplishments</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="all" 
              onClick={() => setFilter("all")}
            >
              All Achievements
            </TabsTrigger>
            <TabsTrigger 
              value="trading" 
              onClick={() => setFilter("trading")}
            >
              Trading
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              onClick={() => setFilter("education")}
            >
              Education
            </TabsTrigger>
            <TabsTrigger 
              value="platform" 
              onClick={() => setFilter("platform")}
            >
              Platform
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <Card className="bg-sidebar border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="text-primary" size={20} />
                  Your Achievements
                </CardTitle>
                <CardDescription>
                  Badges and accomplishments you've earned on OptionPulse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAchievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className="flex flex-col p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 p-2 rounded-md flex-shrink-0">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <Badge 
                              className={cn("mt-1", getCategoryColor(achievement.category))}
                              variant="outline"
                            >
                              {getCategoryLabel(achievement.category)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Earned: {achievement.earnedOn}
                            </span>
                          </div>
                          
                          {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="text-primary">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress 
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="h-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredAchievements.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Award size={48} className="mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg mb-1">No achievements found</h3>
                    <p>You don't have any achievements in this category yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {["trading", "education", "platform"].map((category) => (
            <TabsContent key={category} value={category}>
              {/* Content for each tab will be shown by the filtered achievements */}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-sidebar">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="text-yellow-500" size={18} />
                Trading Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-blue-500/20">
                    <AvatarFallback className="text-blue-400">
                      <Trophy size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Top Call Seller</div>
                    <div className="text-xs text-muted-foreground">3/3 challenges completed</div>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                    100%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-sidebar">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="text-purple-500" size={18} />
                Education Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-purple-500/20">
                    <AvatarFallback className="text-purple-400">
                      <Layers size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Layer 1 Starter</div>
                    <div className="text-xs text-muted-foreground">Quiz passed</div>
                  </div>
                  <Badge variant="outline" className="bg-purple-500/20 text-purple-400">
                    1/1
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-amber-500/20">
                    <AvatarFallback className="text-amber-400">
                      <BookOpen size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Knowledge Seeker</div>
                    <div className="text-xs text-muted-foreground">10/20 lessons completed</div>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-400">
                    50%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-sidebar">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="text-green-500" size={18} />
                Platform Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-green-500/20">
                    <AvatarFallback className="text-green-400">
                      <Calendar size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Early Adopter</div>
                    <div className="text-xs text-muted-foreground">Joined in first month</div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400">
                    ✓
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
