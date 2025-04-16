
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterContent, MobileFilterContent } from "./FilterComponents";

interface EducationFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  difficultyLabels: {[key: string]: string};
  categoryLabels: {[key: string]: string};
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  isMobile: boolean;
}

const EducationFilters = ({
  activeTab,
  setActiveTab,
  difficultyLabels,
  categoryLabels,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  hasActiveFilters,
  isMobile
}: EducationFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <TabsList className="bg-muted/30">
        <TabsTrigger value="lessons" className="flex gap-2 items-center">
          <BookOpen size={16} />
          <span>Lessons</span>
        </TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2">
        {isMobile ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Filter size={14} />
                <span>Filters</span>
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-optionpulse-blue"></span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3">
              <MobileFilterContent 
                difficultyLabels={difficultyLabels}
                categoryLabels={categoryLabels}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={selectedDifficulty ? "border-optionpulse-blue text-optionpulse-blue" : ""}
                >
                  {selectedDifficulty 
                    ? difficultyLabels[selectedDifficulty] 
                    : "Difficulty"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3">
                <FilterContent 
                  labels={difficultyLabels}
                  selectedFilter={selectedDifficulty}
                  setSelectedFilter={setSelectedDifficulty}
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={selectedCategory ? "border-optionpulse-blue text-optionpulse-blue" : ""}
                >
                  {selectedCategory 
                    ? categoryLabels[selectedCategory] 
                    : "Category"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3">
                <FilterContent 
                  labels={categoryLabels}
                  selectedFilter={selectedCategory}
                  setSelectedFilter={setSelectedCategory}
                />
              </PopoverContent>
            </Popover>
            
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EducationFilters;
