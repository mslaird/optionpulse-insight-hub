
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface WatchlistFormProps {
  newSymbol: string;
  setNewSymbol: (symbol: string) => void;
  addToWatchlist: () => void;
}

const WatchlistForm = ({ newSymbol, setNewSymbol, addToWatchlist }: WatchlistFormProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Add symbol (e.g., AAPL)"
        value={newSymbol}
        onChange={(e) => setNewSymbol(e.target.value)}
        className="w-48 bg-muted/30 border-muted/30"
      />
      <Button 
        onClick={addToWatchlist}
        className="bg-optionpulse-blue hover:bg-optionpulse-blue/80"
      >
        <Plus size={16} className="mr-1" /> Add
      </Button>
    </div>
  );
};

export default WatchlistForm;
