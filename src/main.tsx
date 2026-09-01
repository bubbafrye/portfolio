import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../design-tokens/tokens.css";
import { setThemeMode } from "../design-tokens/tokens";
import "./global.css";
import "./fonts.css";
import { App } from "./App";

setThemeMode(document.documentElement, "root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
