
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeaderboardEntry } from "@/data/challengesData";

interface LeaderboardCardProps {
  leaderboard: LeaderboardEntry[];
}

const getBadgeColor = (level: number) => {
  if (level >= 10) return "bg-gradient-to-r from-blue-400 to-cyan-300 text-white";
  if (level >= 8) return "bg-gradient-to-r from-slate-300 to-slate-400 text-white";
  if (level >= 5) return "bg-gradient-to-r from-yellow-400 to-amber-300 text-black";
  return "bg-muted";
};

const getBadgeLabel = (level: number) => {
  if (level >= 10) return "Diamond";
  if (level >= 8) return "Platinum";
  if (level >= 5) return "Gold";
  return "Silver";
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
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 font-bold">
                  {index === 0 ? (
                    <Trophy size={20} className="text-yellow-500" />
                  ) : index === 1 ? (
                    <Trophy size={20} className="text-gray-400" />
                  ) : index === 2 ? (
                    <Trophy size={20} className="text-amber-700" />
                  ) : (
                    <span className="text-muted-foreground">{index + 1}</span>
                  )}
                </div>
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">Level {user.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{user.points.toLocaleString()} pts</div>
                <Link to="/achievements">
                  <Badge className={cn("mt-1 cursor-pointer hover:opacity-80", getBadgeColor(user.level))}>
                    {getBadgeLabel(user.level)}
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
