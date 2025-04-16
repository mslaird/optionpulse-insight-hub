
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeaderboardUser {
  id: number;
  name: string;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  badge: string;
  completedChallenges: number;
}

interface LeaderboardCardProps {
  leaderboard: LeaderboardUser[];
}

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

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ leaderboard }) => {
  return (
    <Card className="bg-sidebar border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} />
          Top Performers
        </CardTitle>
        <CardDescription>
          Community members with the highest points from completed challenges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 font-bold">
                  {user.rank === 1 ? (
                    <Trophy size={20} className="text-yellow-500" />
                  ) : user.rank === 2 ? (
                    <Trophy size={20} className="text-gray-400" />
                  ) : user.rank === 3 ? (
                    <Trophy size={20} className="text-amber-700" />
                  ) : (
                    <span className="text-muted-foreground">{user.rank}</span>
                  )}
                </div>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">@{user.username}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{user.points.toLocaleString()} pts</div>
                <Link to="/achievements">
                  <Badge className={cn("mt-1 cursor-pointer hover:opacity-80", getBadgeColor(user.badge))}>
                    {user.badge}
                  </Badge>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/achievements">
            View Full Leaderboard
            <ChevronRight size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeaderboardCard;
