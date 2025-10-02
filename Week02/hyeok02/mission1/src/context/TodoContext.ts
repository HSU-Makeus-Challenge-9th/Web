import { createContext } from "react";
import type { Todo } from "../types";

export interface TodoContextValue {
  todos: readonly Todo[];
  add: (text: string) => void;
  complete: (id: number) => void;
  remove: (id: number) => void;
}

export const TodoContext = createContext<TodoContextValue | undefined>(
  undefined
);
