
import { ExternalLink, FileText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  title: string;
  type: "article" | "video" | "ebook";
  source: string;
  url: string;
  tags: string[];
}

const ResourceCard = ({ title, type, source, url, tags }: ResourceCardProps) => {
  return (
    <Card className="h-full bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden flex flex-col transition-all hover:border-optionpulse-blue/50">
      <CardHeader className="p-4 flex flex-row items-start space-y-0 gap-3">
        <div className="w-10 h-10 rounded-full bg-optionpulse-neutral/20 flex items-center justify-center flex-shrink-0">
          <FileText size={18} className="text-optionpulse-neutral" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{source}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant="outline"
            className="text-xs border-muted-foreground text-muted-foreground"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-optionpulse-blue/40 text-optionpulse-blue-light"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className="w-full text-optionpulse-blue hover:text-optionpulse-blue-light hover:bg-optionpulse-blue/10">
            View Resource
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
