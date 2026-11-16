import {useEffect, useState} from "react";

export type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "rixl-ui-playground-theme";

function getInitialTheme(): Theme {
  if (typeof localStorage === "undefined") return "system";
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

export function useTheme(): [Theme, (next: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (theme === "system") {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = prefersDark ? "dark" : "light";
      } else {
        root.dataset.theme = theme;
      }
    };
    apply();

    if (theme !== "system") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return [theme, setTheme];
}
