
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Trade } from "./types";
import { exportTradesCsv } from "./utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  trades: Trade[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ trades }) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    exportTradesCsv(trades);
    
    toast({
      title: "Trades Exported",
      description: `${trades.length} trades exported to CSV file`,
    });
  };
  
  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      size="sm"
      className="flex gap-2 items-center"
    >
      <Download size={16} />
      Download Trades
    </Button>
  );
};

export default ExportButton;
