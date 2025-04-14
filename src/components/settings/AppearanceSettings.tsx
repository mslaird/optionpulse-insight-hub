
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Palette, Sun, Moon, Monitor, Info, LayoutGrid, List, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppearanceSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    theme: "dark",
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
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette size={18} className="text-optionpulse-blue" />
            Theme
          </CardTitle>
          <CardDescription>Choose your preferred color theme</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue={settings.theme}
            value={settings.theme}
            onValueChange={(value) => handleSettingChange('theme', value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Label
              htmlFor="dark"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer ${
                settings.theme === 'dark' ? 'border-optionpulse-blue' : ''
              }`}
            >
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <Moon className="h-6 w-6 mb-3" />
              <div className="text-center">
                <h3 className="text-base font-medium">Dark</h3>
                <p className="text-xs text-muted-foreground">
                  Dark background with light text
                </p>
              </div>
            </Label>
            
            <Label
              htmlFor="light"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer ${
                settings.theme === 'light' ? 'border-optionpulse-blue' : ''
              }`}
            >
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <Sun className="h-6 w-6 mb-3" />
              <div className="text-center">
                <h3 className="text-base font-medium">Light</h3>
                <p className="text-xs text-muted-foreground">
                  Light background with dark text
                </p>
              </div>
            </Label>
            
            <Label
              htmlFor="system"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer ${
                settings.theme === 'system' ? 'border-optionpulse-blue' : ''
              }`}
            >
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <Monitor className="h-6 w-6 mb-3" />
              <div className="text-center">
                <h3 className="text-base font-medium">System</h3>
                <p className="text-xs text-muted-foreground">
                  Follow system preferences
                </p>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid size={18} className="text-optionpulse-blue" />
            Data Display
          </CardTitle>
          <CardDescription>Choose how data is displayed throughout the app</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue={settings.dataDisplayMode}
            value={settings.dataDisplayMode}
            onValueChange={(value) => handleSettingChange('dataDisplayMode', value)}
            className="space-y-4"
          >
            <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact" className="font-normal">Compact</Label>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Compact Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Displays more data in less space with smaller text and minimal padding
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="detailed" id="detailed" />
                <Label htmlFor="detailed" className="font-normal">Detailed</Label>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Detailed Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Displays comprehensive information with larger text and more spacing
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List size={18} className="text-optionpulse-blue" />
            Chart Style
          </CardTitle>
          <CardDescription>Choose your preferred chart visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue={settings.chartStyle}
            value={settings.chartStyle}
            onValueChange={(value) => handleSettingChange('chartStyle', value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="candlestick" id="candlestick" />
              <Label htmlFor="candlestick" className="font-normal">Candlestick</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="line" id="line" />
              <Label htmlFor="line" className="font-normal">Line Chart</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="area" id="area" />
              <Label htmlFor="area" className="font-normal">Area Chart</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4 border-border/30">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
