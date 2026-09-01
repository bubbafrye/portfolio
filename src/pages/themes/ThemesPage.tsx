import { useLayoutEffect, useState } from "react";
import "../../../design-tokens/tokens.css";
import "../../../design-tokens/gradients.css";
import "../../../design-tokens/layout-geometry.css";
import type { FigmaMode } from "../../../design-tokens/tokens";
import { figmaModes, setThemeMode } from "../../../design-tokens/tokens";
import { ExpandPage } from "../../components/ExpandPage";
import styles from "./ThemesPage.module.css";

/** Legacy EXPAND page with theme switcher — preserved at /themes */
export function ThemesPage() {
  const [theme, setTheme] = useState<FigmaMode>("root");

  useLayoutEffect(() => {
    setThemeMode(document.documentElement, theme);
  }, [theme]);

  return (
    <>
      <div className={styles.themeSwitcher}>
        Theme:{" "}
        {figmaModes.map((m) => (
          <label key={m} className={styles.themeOption}>
            <input type="radio" name="theme" checked={theme === m} onChange={() => setTheme(m)} /> {m}
          </label>
        ))}
      </div>
      <ExpandPage />
    </>
  );
}
