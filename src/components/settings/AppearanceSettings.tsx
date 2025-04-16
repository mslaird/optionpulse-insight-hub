
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Palette, LayoutGrid, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import SettingsCard from "./appearance/SettingsCard";
import ThemeSelector from "./appearance/ThemeSelector";
import DataDisplaySelector from "./appearance/DataDisplaySelector";
import ChartStyleSelector from "./appearance/ChartStyleSelector";

const AppearanceSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    dataDisplayMode: "detailed",
    chartStyle: "candlestick"
  });
  
  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Appearance settings updated",
        description: "Your display preferences have been saved."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize how the application looks and feels
        </p>
      </div>
      
      <SettingsCard 
        icon={Palette}
        title="Theme"
        description="Choose your preferred color theme"
      >
        <ThemeSelector />
      </SettingsCard>
      
      <SettingsCard 
        icon={LayoutGrid}
        title="Data Display"
        description="Choose how data is displayed throughout the app"
      >
        <DataDisplaySelector 
          value={settings.dataDisplayMode}
          onChange={(value) => handleSettingChange('dataDisplayMode', value)}
        />
      </SettingsCard>
      
      <SettingsCard 
        icon={List}
        title="Chart Style"
        description="Choose your preferred chart visualization"
        footer={
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        }
      >
        <ChartStyleSelector 
          value={settings.chartStyle}
          onChange={(value) => handleSettingChange('chartStyle', value)}
        />
      </SettingsCard>
    </div>
  );
};

export default AppearanceSettings;
