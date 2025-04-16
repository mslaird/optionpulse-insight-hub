
import { Moon, Monitor, Sun } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/types/theme";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup 
      defaultValue={theme}
      value={theme}
      onValueChange={(value) => setTheme(value as Theme)}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <Label
        htmlFor="dark"
        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary cursor-pointer ${
          theme === 'dark' ? 'border-optionpulse-blue' : ''
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
          theme === 'light' ? 'border-optionpulse-blue' : ''
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
          theme === 'system' ? 'border-optionpulse-blue' : ''
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
  );
};

export default ThemeSelector;
