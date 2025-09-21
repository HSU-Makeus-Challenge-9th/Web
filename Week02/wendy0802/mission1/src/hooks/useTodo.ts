import { useContext } from "react";
import { TodoContext, type TodoContextType } from "../context/TodoContext";

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
