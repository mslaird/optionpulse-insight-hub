
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
}

const Logo = ({ collapsed = false }: LogoProps) => {
  const [animated, setAnimated] = useState(false);
  
  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (collapsed) {
    return (
      <div className="w-10 h-10 rounded-full bg-optionpulse-blue flex items-center justify-center text-white font-bold text-lg">
        OP
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-end relative">
        <span className="text-[18px] font-bold relative">
          <span className="text-[#00B7EB]">Option</span>
          <span className="text-[22px] font-bold text-[#00FF7F]">Pulse</span>
          <div className="absolute -bottom-1 w-full left-0">
            <svg 
              viewBox="0 0 120 10" 
              width="100%" 
              height="100%" 
              preserveAspectRatio="none"
              className={cn(
                "transition-opacity duration-700",
                animated ? "opacity-100" : "opacity-0"
              )}
            >
              <path 
                d="M 0,5 L 20,5 C 22,5 23,2 25,2 C 27,2 28,8 30,8 C 32,8 33,0 35,0 C 37,0 38,10 40,10 C 42,10 43,3 45,3 C 47,3 48,7 50,7 L 120,7" 
                fill="none" 
                stroke="#00FF7F" 
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={animated ? "200" : "0"}
                strokeDashoffset={animated ? "0" : "200"}
                className={cn(
                  "transition-all duration-1500 ease-in-out",
                )}
              />
            </svg>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Logo;
