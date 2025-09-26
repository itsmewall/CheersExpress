import React, { createContext, useEffect, useState } from "react";
import defaultTheme from "../theme/defaultTheme";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ce_theme");
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    // aplica nas CSS Variables
    const root = document.documentElement;
    root.style.setProperty("--brand", theme.brand);
    root.style.setProperty("--brand-2", theme.brand2);
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--ink", theme.ink);
    root.style.setProperty("--radius", theme.radius);
  }, [theme]);

  const updateTheme = (partial) => {
    const next = { ...theme, ...partial };
    setTheme(next);
    localStorage.setItem("ce_theme", JSON.stringify(next));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
