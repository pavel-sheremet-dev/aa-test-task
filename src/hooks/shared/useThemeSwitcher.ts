import { useLocalStorage } from "./useLocalStorage";

type Theme = "dark" | "light";

export const useThemeSwitcher = () => {
  const [themeTitle, setThemeTitle] = useLocalStorage<Theme>(
    "theme-title",
    "dark",
  );

  const switchTheme = () => {
    setThemeTitle((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { themeTitle, switchTheme };
};
