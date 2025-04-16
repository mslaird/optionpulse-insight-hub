
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";

interface FilterLabels {
  [key: string]: string;
}

interface FilterButtonsProps {
  labels: FilterLabels;
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
}

export const FilterButtons = ({ 
  labels, 
  selectedFilter, 
  setSelectedFilter 
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(labels).map(([key, label]) => (
        <Button
          key={key}
          variant={selectedFilter === key ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedFilter(selectedFilter === key ? null : key)}
          className="flex gap-1"
        >
          {selectedFilter === key && <Check size={12} />}
          {label}
        </Button>
      ))}
    </div>
  );
};

export const FilterContent = ({ 
  labels, 
  selectedFilter, 
  setSelectedFilter 
}: FilterButtonsProps) => {
  return (
    <div className="space-y-2">
      {Object.entries(labels).map(([key, label]) => (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          onClick={() => setSelectedFilter(selectedFilter === key ? null : key)}
          className={`w-full justify-start ${selectedFilter === key ? "bg-muted" : ""}`}
        >
          <span className="mr-auto">{label}</span>
          {selectedFilter === key && <Check size={16} />}
        </Button>
      ))}
    </div>
  );
};

export const MobileFilterContent = ({ 
  difficultyLabels, 
  categoryLabels,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
  hasActiveFilters
}: {
  difficultyLabels: FilterLabels,
  categoryLabels: FilterLabels,
  selectedDifficulty: string | null,
  setSelectedDifficulty: (filter: string | null) => void,
  selectedCategory: string | null,
  setSelectedCategory: (filter: string | null) => void,
  clearFilters: () => void,
  hasActiveFilters: boolean
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2 text-sm">Difficulty</h4>
        <FilterButtons 
          labels={difficultyLabels} 
          selectedFilter={selectedDifficulty} 
          setSelectedFilter={setSelectedDifficulty}
        />
      </div>
      <div>
        <h4 className="font-medium mb-2 text-sm">Category</h4>
        <FilterButtons 
          labels={categoryLabels} 
          selectedFilter={selectedCategory} 
          setSelectedFilter={setSelectedCategory}
        />
      </div>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      )}
    </div>
  );
};
