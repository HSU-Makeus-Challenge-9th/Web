import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeContent } from "./components/ThemeContent";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh w-full transition-colors">
        <div className="mx-auto flex max-w-[1080px] justify-end px-6 pt-6">
          <ThemeToggle />
        </div>

        <div className="mx-auto max-w-[1080px] px-6">
          <ThemeContent />
        </div>
      </div>
    </ThemeProvider>
  );
}
