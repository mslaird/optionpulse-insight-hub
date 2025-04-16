
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeColors } from "@/types/theme";
import { Palette, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorCustomizer = () => {
  const { colors, setColors } = useTheme();
  const { toast } = useToast();
  
  const [customColors, setCustomColors] = useState<ThemeColors>({
    primary: colors.primary,
    accent: colors.accent
  });

  const handleColorChange = (colorType: keyof ThemeColors, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const applyColors = () => {
    setColors(customColors);
    toast({
      title: "Colors updated",
      description: "Your custom color theme has been applied."
    });
  };

  const resetColors = () => {
    const defaultColors = {
      primary: "#1EAEDB",
      accent: "#34D399"
    };
    setCustomColors(defaultColors);
    setColors(defaultColors);
    toast({
      title: "Colors reset",
      description: "Default colors have been restored."
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primaryColor" className="flex items-center gap-2">
          Primary Color
          <div 
            className="inline-block w-4 h-4 rounded-full border" 
            style={{ backgroundColor: customColors.primary }}
          />
        </Label>
        <div className="flex gap-2">
          <Input
            id="primaryColor"
            type="color"
            value={customColors.primary}
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={customColors.primary}
            onChange={(e) => handleColorChange('primary', e.target.value)}
            className="font-mono"
            placeholder="#1EAEDB"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accentColor" className="flex items-center gap-2">
          Accent Color
          <div 
            className="inline-block w-4 h-4 rounded-full border" 
            style={{ backgroundColor: customColors.accent }}
          />
        </Label>
        <div className="flex gap-2">
          <Input
            id="accentColor"
            type="color"
            value={customColors.accent}
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={customColors.accent}
            onChange={(e) => handleColorChange('accent', e.target.value)}
            className="font-mono"
            placeholder="#34D399"
          />
        </div>
      </div>

      <div className="pt-2 flex gap-2">
        <Button onClick={applyColors} className="flex-1">
          <Palette className="mr-2 h-4 w-4" />
          Apply Colors
        </Button>
        <Button variant="outline" onClick={resetColors}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center p-4 rounded-md border bg-background">
          <div className="h-8 w-16 rounded-full mb-2 bg-primary"></div>
          <span className="text-xs text-muted-foreground">Primary</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 rounded-md border bg-background">
          <div className="h-8 w-16 rounded-full mb-2 bg-accent"></div>
          <span className="text-xs text-muted-foreground">Accent</span>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
