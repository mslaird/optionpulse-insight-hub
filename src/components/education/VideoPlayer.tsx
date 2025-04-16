
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration: string;
  videoSrc: string;
}

const VideoPlayer = ({ title, duration, videoSrc }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startVideo = () => {
    setIsPlaying(true);
    // In a real app, we would increment progress gradually
    // For demo purposes, we'll set a timeout to simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 500);
  };
  
  return (
    <div className="w-full flex flex-col space-y-4">
      {!isPlaying ? (
        <div 
          className="relative w-full sm:w-3/4 aspect-video mx-auto bg-optionpulse-charcoal rounded-lg overflow-hidden cursor-pointer flex items-center justify-center border border-border/50 group hover:border-optionpulse-blue/70 transition-all" 
          onClick={startVideo}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-optionpulse-navy/70 to-optionpulse-charcoal/70 z-10"></div>
          <div className="w-20 h-20 rounded-full bg-optionpulse-blue/20 flex items-center justify-center z-20 transition-all group-hover:scale-110">
            <Play size={32} className="text-optionpulse-blue ml-1" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>
      ) : (
        <div className="w-full sm:w-3/4 mx-auto">
          <video 
            src={videoSrc} 
            className="w-full rounded-lg border border-border/50"
            controls 
            autoPlay
            onTimeUpdate={(e) => {
              const video = e.target as HTMLVideoElement;
              const percent = (video.currentTime / video.duration) * 100;
              setProgress(percent);
            }}
          >
            Your browser does not support the video tag.
          </video>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 mt-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
