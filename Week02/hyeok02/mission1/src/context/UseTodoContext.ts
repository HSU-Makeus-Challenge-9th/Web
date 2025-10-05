import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodoContext must be used within TodoProvider");
  return ctx;
};
