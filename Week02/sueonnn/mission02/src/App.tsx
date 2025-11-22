import Navbar from "./components/Navbar";
import ThemeContent from "./components/ThemeContent";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <ThemeContent />
    </ThemeProvider>
  );
}

export default App;
