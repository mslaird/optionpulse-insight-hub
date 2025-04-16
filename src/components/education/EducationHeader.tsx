
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EducationHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EducationHeader = ({ searchTerm, setSearchTerm }: EducationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Education Hub</h1>
        <p className="text-muted-foreground">Learn options trading strategies and concepts</p>
      </div>
      
      <div className="relative w-full md:w-64">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search lessons & resources..."
          className="pl-10 bg-muted/30 border-muted/30 focus:border-optionpulse-blue w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EducationHeader;
