
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MyActivityTab = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Your Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">You don't have any activity yet. Start by posting or interacting with the community!</p>
      </CardContent>
    </Card>
  );
};

export default MyActivityTab;
