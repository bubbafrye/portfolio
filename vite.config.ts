import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset paths — works at domain root or in any subdirectory.
  base: "./",
  plugins: [react()],
});
