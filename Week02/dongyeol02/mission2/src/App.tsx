import "./App.css";
import MainSection from "./component/mainSection";
import Navbar from "./component/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <MainSection />
    </ThemeProvider>
  );
}

export default App;
