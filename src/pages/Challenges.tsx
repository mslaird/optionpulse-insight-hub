
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Trophy, Dumbbell, BookOpen, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import ChallengeFilters from "@/components/challenges/ChallengeFilters";
import LeaderboardCard from "@/components/challenges/LeaderboardCard";
import LeaderboardStats from "@/components/challenges/LeaderboardStats";
import RewardsSection from "@/components/challenges/RewardsSection";
import { challenges, leaderboard } from "@/data/challengesData";
import type { Challenge } from "@/data/challengesData";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import PaywallModal from "@/components/modals/PaywallModal";

const Challenges = () => {
  const [filter, setFilter] = useState<"all" | Challenge["status"]>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const { 
    canAccessLite,
    canAccessPro,
    checkAccess, 
    showPaywallModal, 
    requiredTier, 
    featureName, 
    handleStartTrial, 
    handleClosePaywall 
  } = useFeatureAccess();
  
  // Filter challenges based on subscription tier as well
  const filteredChallenges = challenges
    .filter(challenge => {
      // First apply the user's explicit filters
      const statusMatch = filter === "all" || challenge.status === filter;
      const categoryMatch = categoryFilter === "all" || challenge.category === categoryFilter;
      
      // Then filter based on subscription tier
      const tierMatch = 
        challenge.tier === "Free" || 
        (challenge.tier === "Lite" && canAccessLite) || 
        (challenge.tier === "Pro" && canAccessPro);
      
      return statusMatch && categoryMatch && tierMatch;
    });
  
  const handleChallengeClick = (challenge: Challenge) => {
    if (challenge.tier === "Free") return true;
    if (challenge.tier === "Lite" && canAccessLite) return true;
    if (challenge.tier === "Pro" && canAccessPro) return true;
    
    checkAccess(challenge.tier as "Lite" | "Pro", `${challenge.category} Challenges`);
    return false;
  };
  
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
                <div 
                  key={challenge.id} 
                  onClick={() => handleChallengeClick(challenge)}
                  className={`relative ${
                    challenge.tier !== "Free" && 
                    ((challenge.tier === "Lite" && !canAccessLite) || 
                    (challenge.tier === "Pro" && !canAccessPro)) 
                      ? "cursor-pointer" 
                      : ""
                  }`}
                >
                  <ChallengeCard challenge={challenge} />
                  
                  {/* Overlay for locked challenges */}
                  {challenge.tier !== "Free" && 
                   ((challenge.tier === "Lite" && !canAccessLite) || 
                   (challenge.tier === "Pro" && !canAccessPro)) && (
                    <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                      <Lock size={24} className="text-optionpulse-blue mb-2" />
                      <p className="text-white font-medium text-center px-4">
                        {challenge.tier} subscription required
                      </p>
                      <div className="bg-optionpulse-blue/20 text-optionpulse-blue text-xs px-2 py-1 rounded-full mt-2">
                        Unlock with {challenge.tier}
                      </div>
                    </div>
                  )}
                </div>
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
      
      <PaywallModal
        open={showPaywallModal}
        onClose={handleClosePaywall}
        onStartTrial={handleStartTrial}
        requiredTier={requiredTier}
        featureName={featureName}
        features={[
          {
            title: `${requiredTier} Challenges`,
            tier: requiredTier,
            description: `Access to advanced ${featureName.toLowerCase()}`
          },
          {
            title: requiredTier === "Pro" ? "LEAPS Trading Challenges" : "Intermediate Strategies",
            tier: requiredTier,
            description: requiredTier === "Pro" 
              ? "Practice long-term options strategies and earn rewards" 
              : "Practice spreads and multi-leg strategies with guided challenges"
          },
          {
            title: "Exclusive Rewards",
            tier: requiredTier,
            description: "Earn badges and points only available to subscribers"
          }
        ]}
      />
    </Layout>
  );
};

export default Challenges;
