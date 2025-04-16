
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: 1,
      user: "John Smith",
      action: "predicted a 20% gain on SPY calls",
      time: "1h ago"
    },
    {
      id: 2,
      user: "Emily Chen",
      action: "shared a new volatility strategy guide",
      time: "3h ago"
    },
    {
      id: 3,
      user: "David Wilson",
      action: "posted about TSLA iron condor success",
      time: "6h ago"
    },
    {
      id: 4,
      user: "Rachel Park",
      action: "analyzed earnings volatility on NVDA",
      time: "12h ago"
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "started a discussion on theta decay tactics",
      time: "1d ago"
    }
  ];
  
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Trending Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-optionpulse-blue animate-pulse-subtle"></div>
                <div className="flex-1">
                  <p>
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
