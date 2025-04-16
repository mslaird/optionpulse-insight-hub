
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame, Medal, Clock, Zap } from "lucide-react";

const LeaderboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card className="bg-sidebar">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Flame className="text-orange-500" size={18} />
            Hot Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">Ryan Kim</div>
                <div className="text-xs text-muted-foreground">8 challenges in a row</div>
              </div>
              <Badge variant="outline" className="bg-orange-500/20 text-orange-400">
                <Flame size={12} className="mr-1" />
                8
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">Lisa Miller</div>
                <div className="text-xs text-muted-foreground">6 challenges in a row</div>
              </div>
              <Badge variant="outline" className="bg-orange-500/20 text-orange-400">
                <Flame size={12} className="mr-1" />
                6
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-sidebar">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Medal className="text-blue-500" size={18} />
            Most Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">14 completed challenges</div>
              </div>
              <Link to="/achievements">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 cursor-pointer hover:opacity-80">
                  14
                </Badge>
              </Link>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">John Smith</div>
                <div className="text-xs text-muted-foreground">12 completed challenges</div>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                12
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-sidebar">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="text-green-500" size={18} />
            LEAPS Masters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">Thomas Davies</div>
                <div className="text-xs text-muted-foreground">5 LEAPS challenges completed</div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400">
                <Zap size={12} className="mr-1" />
                5
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">Michael Wong</div>
                <div className="text-xs text-muted-foreground">4 LEAPS challenges completed</div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400">
                <Zap size={12} className="mr-1" />
                4
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardStats;
