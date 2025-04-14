
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
      <div className="flex items-end">
        <span className="text-[14px] font-bold text-[#00B7EB]">Option</span>
        <span className="text-[18px] font-bold text-[#00FF7F] leading-none ml-1">Pulse</span>
      </div>
      <div 
        className={cn(
          "h-0.5 bg-[#00FF7F] transition-all duration-700 ease-in-out", 
          animated ? "w-full opacity-100" : "w-0 opacity-0"
        )}
      />
    </div>
  );
};

export default Logo;
