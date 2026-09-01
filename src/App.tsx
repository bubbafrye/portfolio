import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ThemesPage } from "./pages/themes";
import { getRouterBasename } from "./routerBasename";

export function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/themes" element={<ThemesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
