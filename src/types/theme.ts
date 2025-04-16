
export type Theme = "dark" | "light" | "system";

export interface ColorCustomization {
  primary: string;
  accent: string;
}

export interface ThemeConfig {
  theme: Theme;
  colors: ColorCustomization;
}
