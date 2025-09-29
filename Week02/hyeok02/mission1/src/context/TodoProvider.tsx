import React, { useCallback, useMemo, useReducer } from "react";
import type { Todo } from "../types";
import { TodoContext, type TodoContextValue } from "./TodoContext";

type Action =
  | { type: "add"; text: string }
  | { type: "complete"; id: number }
  | { type: "remove"; id: number };

function reducer(state: readonly Todo[], action: Action): readonly Todo[] {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) return state;
      const next: Todo = { id: Date.now(), text, isDone: false };
      return [...state, next];
    }
    case "complete": {
      return state.map((t) =>
        t.id === action.id ? { ...t, isDone: true } : t
      );
    }
    case "remove": {
      return state.filter((t) => t.id != action.id);
    }
    default:
      return state;
  }
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, [] as readonly Todo[]);

  const add = useCallback(
    (text: string) => dispatch({ type: "add", text }),
    []
  );
  const complete = useCallback(
    (id: number) => dispatch({ type: "complete", id }),
    []
  );
  const remove = useCallback(
    (id: number) => dispatch({ type: "remove", id }),
    []
  );

  const value: TodoContextValue = useMemo(
    () => ({ todos, add, complete, remove }),
    [todos, add, complete, remove]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
