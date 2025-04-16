
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, Trophy, Users, Flame, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Diamond":
      return "bg-gradient-to-r from-blue-400 to-cyan-300 text-white";
    case "Platinum":
      return "bg-gradient-to-r from-slate-300 to-slate-400 text-white";
    case "Gold":
      return "bg-gradient-to-r from-yellow-400 to-amber-300 text-black";
    default:
      return "bg-muted";
  }
};

const RewardsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-sidebar border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-yellow-500" size={20} />
            Point Rewards
          </CardTitle>
          <CardDescription>
            Earn points by completing challenges and participating in the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-md">
                <Trophy size={24} className="text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Complete a Challenge</div>
                <div className="text-sm text-muted-foreground">Successfully finish any challenge</div>
              </div>
            </div>
            <Badge variant="outline" className="text-primary">300-600 pts</Badge>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-md">
                <Users size={24} className="text-green-400" />
              </div>
              <div>
                <div className="font-medium">Top 3 Placement</div>
                <div className="text-sm text-muted-foreground">Rank in the top 3 of any challenge</div>
              </div>
            </div>
            <Badge variant="outline" className="text-primary">200 pts</Badge>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 p-2 rounded-md">
                <Flame size={24} className="text-orange-400" />
              </div>
              <div>
                <div className="font-medium">Streak Bonus</div>
                <div className="text-sm text-muted-foreground">Complete 5+ challenges in a row</div>
              </div>
            </div>
            <Badge variant="outline" className="text-primary">100 pts</Badge>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-md">
                <Zap size={24} className="text-emerald-400" />
              </div>
              <div>
                <div className="font-medium">LEAPS Expert</div>
                <div className="text-sm text-muted-foreground">Complete 3+ LEAPS challenges</div>
              </div>
            </div>
            <Badge variant="outline" className="text-emerald-400">250 pts</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-sidebar border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-purple-500" size={20} />
            Achievement Badges
          </CardTitle>
          <CardDescription>
            Earn special badges by reaching significant milestones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/achievements">
                <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Diamond"))}>Diamond</Badge>
              </Link>
              <div>
                <div className="font-medium">Diamond Strategist</div>
                <div className="text-sm text-muted-foreground">Earn 1,500+ points</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/achievements">
                <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Platinum"))}>Platinum</Badge>
              </Link>
              <div>
                <div className="font-medium">Platinum Trader</div>
                <div className="text-sm text-muted-foreground">Earn 1,000+ points</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/achievements">
                <Badge className={cn("cursor-pointer hover:opacity-80", getBadgeColor("Gold"))}>Gold</Badge>
              </Link>
              <div>
                <div className="font-medium">Gold Analyst</div>
                <div className="text-sm text-muted-foreground">Earn 500+ points</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/achievements">
                <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-emerald-400 to-green-300 text-black">LEAPS</Badge>
              </Link>
              <div>
                <div className="font-medium">LEAPS Visionary</div>
                <div className="text-sm text-muted-foreground">Complete all LEAPS challenges</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <Link to="/achievements" className="w-full">
              <Button variant="outline" className="w-full">
                View All Achievements
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-blue-500/20">
                <AvatarFallback className="text-blue-400">
                  <Trophy size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Top Call Seller</div>
                <div className="text-xs text-muted-foreground">3 challenges completed</div>
              </div>
            </div>
            <Link to="/achievements">
              <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-blue-400 to-cyan-300 text-white">
                View
              </Badge>
            </Link>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-emerald-500/20">
                <AvatarFallback className="text-emerald-400">
                  <Zap size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">LEAPS Master</div>
                <div className="text-xs text-muted-foreground">LEAPS specialist certification</div>
              </div>
            </div>
            <Link to="/achievements">
              <Badge className="cursor-pointer hover:opacity-80 bg-gradient-to-r from-emerald-400 to-green-300 text-black">
                View
              </Badge>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsSection;
