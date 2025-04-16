
import React from "react";
import { Button } from "@/components/ui/button";
import LessonCard from "@/components/education/LessonCard";
import ResourceCard from "@/components/education/ResourceCard";
import { TabsContent } from "@/components/ui/tabs";

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  completed?: boolean;
  progress?: number;
  category: string;
}

interface Resource {
  title: string;
  type: "article" | "video" | "ebook";
  source: string;
  url: string;
  tags: string[];
}

interface EducationContentProps {
  activeTab: string;
  searchTerm: string;
  filteredLessons: Lesson[];
  filteredResources: Resource[];
  clearSearch: () => void;
  clearAllFilters: () => void;
}

export const LessonsContent = ({ 
  filteredLessons, 
  searchTerm, 
  clearAllFilters 
}: {
  filteredLessons: Lesson[],
  searchTerm: string,
  clearAllFilters: () => void
}) => {
  return (
    <TabsContent value="lessons" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            description={lesson.description}
            difficulty={lesson.difficulty}
            duration={lesson.duration}
            completed={lesson.completed}
            progress={lesson.progress}
          />
        ))}
      </div>
      
      {filteredLessons.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No lessons found for "{searchTerm}"</p>
          <Button 
            variant="outline" 
            onClick={clearAllFilters} 
            className="mt-4"
          >
            Clear Search & Filters
          </Button>
        </div>
      )}
    </TabsContent>
  );
};

export const ResourcesContent = ({ 
  filteredResources, 
  searchTerm, 
  clearSearch 
}: {
  filteredResources: Resource[],
  searchTerm: string,
  clearSearch: () => void
}) => {
  return (
    <TabsContent value="resources" className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredResources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            type={resource.type}
            source={resource.source}
            url={resource.url}
            tags={resource.tags}
          />
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No resources found for "{searchTerm}"</p>
          <Button 
            variant="outline" 
            onClick={clearSearch} 
            className="mt-4"
          >
            Clear Search
          </Button>
        </div>
      )}
    </TabsContent>
  );
};
