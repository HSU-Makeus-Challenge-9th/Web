import React from "react";
import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider } from "./context/ThemeProvider";
import ThemeContent from "./context/ThemeContent";
import ContextPage from "./context/ContextPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeContent>
          <ContextPage />
        </ThemeContent>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
