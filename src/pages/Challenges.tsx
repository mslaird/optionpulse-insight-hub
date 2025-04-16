
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Trophy, Dumbbell, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import LeaderboardCard from "@/components/challenges/LeaderboardCard";
import LeaderboardStats from "@/components/challenges/LeaderboardStats";
import RewardsSection from "@/components/challenges/RewardsSection";
import { challenges, leaderboard } from "@/data/challengesData";
import type { Challenge } from "@/data/challengesData";

const Challenges = () => {
  const [filter, setFilter] = useState<"all" | Challenge["status"]>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const filteredChallenges = challenges
    .filter(challenge => filter === "all" || challenge.status === filter)
    .filter(challenge => categoryFilter === "all" || challenge.category === categoryFilter);
  
  return (
    <Layout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Challenges</h1>
            <p className="text-muted-foreground">Compete with the community and earn points</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/tools?tab=strategy-trader">
                <Dumbbell size={16} className="mr-2" />
                Practice Trading
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/education">
                <BookOpen size={16} className="mr-2" />
                Education Hub
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges" className="animate-fade-in">
            <ChallengeFilters 
              filter={filter}
              setFilter={setFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
            
            {filteredChallenges.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                <h3 className="text-lg mb-1">No challenges found</h3>
                <p>There are no challenges matching your current filter.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="leaderboard" className="animate-fade-in">
            <LeaderboardCard leaderboard={leaderboard} />
            <LeaderboardStats />
          </TabsContent>
          
          <TabsContent value="rewards" className="animate-fade-in">
            <RewardsSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Challenges;
