
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface LessonTranscriptProps {
  transcript: string;
}

const LessonTranscript = ({ transcript }: LessonTranscriptProps) => {
  return (
    <div className="w-full sm:w-3/4 mx-auto mt-6">
      <h3 className="font-medium text-lg mb-3">Transcript</h3>
      <Card className="bg-card/30 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{transcript}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonTranscript;
