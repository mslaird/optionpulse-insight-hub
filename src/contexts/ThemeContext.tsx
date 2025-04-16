
import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeColors, ThemeSettings, defaultThemeColors } from "@/types/theme";

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  setColors: (colors: ThemeColors) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    // Get saved theme from localStorage or default to dark with default colors
    const savedTheme = localStorage.getItem("theme") as Theme || "dark";
    
    let savedColors: ThemeColors = defaultThemeColors;
    try {
      const savedColorsString = localStorage.getItem("themeColors");
      if (savedColorsString) {
        savedColors = JSON.parse(savedColorsString);
      }
    } catch (error) {
      console.error("Failed to parse theme colors from localStorage", error);
    }
    
    return {
      mode: savedTheme,
      colors: savedColors
    };
  });

  const setTheme = (theme: Theme) => {
    setThemeSettings(prev => ({
      ...prev,
      mode: theme
    }));
  };

  const setColors = (colors: ThemeColors) => {
    setThemeSettings(prev => ({
      ...prev,
      colors
    }));
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", themeSettings.mode);
    localStorage.setItem("themeColors", JSON.stringify(themeSettings.colors));
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove("light-mode");
    
    // If theme is system, check system preference
    if (themeSettings.mode === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (!systemPrefersDark) {
        root.classList.add("light-mode");
      }
    } else if (themeSettings.mode === "light") {
      root.classList.add("light-mode");
    }

    // Apply custom colors to CSS variables
    root.style.setProperty('--primary', convertHexToHSL(themeSettings.colors.primary));
    root.style.setProperty('--accent', convertHexToHSL(themeSettings.colors.accent));
  }, [themeSettings]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (themeSettings.mode === "system") {
        const root = window.document.documentElement;
        root.classList.toggle("light-mode", !mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeSettings.mode]);

  return (
    <ThemeContext.Provider value={{ 
      theme: themeSettings.mode, 
      colors: themeSettings.colors, 
      setTheme, 
      setColors 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};

// Helper function to convert hex color to HSL format for CSS variables
function convertHexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find the min and max values to compute the lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate lightness
  let l = (max + min) / 2;
  
  // Calculate saturation
  let s = 0;
  
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  }
  
  // Calculate hue
  let h = 0;
  
  if (max !== min) {
    if (max === r) {
      h = (g - b) / (max - min) + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / (max - min) + 2;
    } else {
      h = (r - g) / (max - min) + 4;
    }
    
    h = h * 60;
  }
  
  // Round values
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}
