import { useContext } from "react";
import { TodosContext } from "./TodosProvider";

export function useTodosContext() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside TodosProvider");
  return ctx;
}
