
export type Theme = "dark" | "light" | "system";

export interface ThemeColors {
  primary: string;
  accent: string;
}

export interface ThemeSettings {
  mode: Theme;
  colors: ThemeColors;
}

export const defaultThemeColors: ThemeColors = {
  primary: "#1EAEDB", // Default blue
  accent: "#34D399"   // Default green
};
