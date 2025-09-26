import { createContext, useReducer } from "react";
import {
  todosReducer,
  type TodosState,
  type TodosAction,
} from "./todosReducer";
import type { TodoItem } from "../../types/todo/todo";

type TodosContextValue = {
  todos: TodoItem[];
  doneTodos: TodoItem[];
  add: (text: string) => void;
  complete: (id: number) => void;
  remove: (id: number) => void;
};

export const TodosContext = createContext<TodosContextValue | null>(null);

export const TodosProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todosReducer, {
    items: [],
  } as TodosState);

  const add = (text: string) =>
    text.trim() && dispatch({ type: "ADD", text } as TodosAction);
  const complete = (id: number) =>
    dispatch({ type: "COMPLETE", id } as TodosAction);
  const remove = (id: number) =>
    dispatch({ type: "REMOVE", id } as TodosAction);

  const todos = state.items.filter((i) => i.type === "todo");
  const doneTodos = state.items.filter((i) => i.type === "doneTodo");

  return (
    <TodosContext.Provider value={{ todos, doneTodos, add, complete, remove }}>
      {children}
    </TodosContext.Provider>
  );
};
