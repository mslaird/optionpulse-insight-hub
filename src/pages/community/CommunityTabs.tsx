
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const CommunityTabs = () => {
  return (
    <TabsList className="glass-card w-full justify-start mb-6 flex-wrap h-auto min-h-10 py-1">
      <TabsTrigger value="feed">Feed</TabsTrigger>
      <TabsTrigger value="following">Following</TabsTrigger>
      <TabsTrigger value="timeline">Timeline</TabsTrigger>
      <TabsTrigger value="trending">Trending</TabsTrigger>
      <TabsTrigger value="saved-posts">Saved Posts</TabsTrigger>
      <TabsTrigger value="my-activity">My Activity</TabsTrigger>
    </TabsList>
  );
};

export default CommunityTabs;
