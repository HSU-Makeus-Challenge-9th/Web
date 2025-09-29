import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

(function bootstrapTheme() {
  try {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
  } catch {
    // 무시
  }
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
