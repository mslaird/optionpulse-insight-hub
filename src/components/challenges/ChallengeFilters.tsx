
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={filter === "all" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setFilter("all")}
        >
          All Status
        </Badge>
        <Badge 
          variant={filter === "active" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setFilter("active")}
        >
          Active
        </Badge>
        <Badge 
          variant={filter === "upcoming" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </Badge>
        <Badge 
          variant={filter === "completed" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setFilter("completed")}
        >
          Completed
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={categoryFilter === "all" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setCategoryFilter("all")}
        >
          All Types
        </Badge>
        <Badge 
          variant={categoryFilter === "spreads" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setCategoryFilter("spreads")}
        >
          Credit Spreads
        </Badge>
        <Badge 
          variant={categoryFilter === "iron-condors" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setCategoryFilter("iron-condors")}
        >
          Iron Condors
        </Badge>
        <Badge 
          variant={categoryFilter === "straddles" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setCategoryFilter("straddles")}
        >
          Straddles
        </Badge>
        <Badge 
          variant={categoryFilter === "options" ? "default" : "outline"} 
          className="cursor-pointer" 
          onClick={() => setCategoryFilter("options")}
        >
          Options
        </Badge>
        <Badge 
          variant={categoryFilter === "leaps" ? "default" : "outline"} 
          className={cn("cursor-pointer", categoryFilter === "leaps" ? "bg-emerald-500 text-emerald-50" : "border-emerald-500/40 text-emerald-400")} 
          onClick={() => setCategoryFilter("leaps")}
        >
          <Zap size={14} className="mr-1" />
          LEAPS
        </Badge>
      </div>
    </div>
  );
};

export default ChallengeFilters;
