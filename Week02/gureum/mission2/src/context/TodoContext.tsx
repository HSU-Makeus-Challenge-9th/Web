import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Todo = { id: number; text: string };

type TodoContextValue = {
  todos: Todo[];
  dones: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteDone: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: value }]);
  };

  const completeTodo = (id: number) => {
    const target = todos.find((x) => x.id === id);
    if (!target) return;
    setTodos((prev) => prev.filter((x) => x.id !== id));
    setDones((prev) => [...prev, target]);
  };

  const deleteDone = (id: number) => {
    setDones((prev) => prev.filter((x) => x.id !== id));
  };

  const value = useMemo(
    () => ({ todos, dones, addTodo, completeTodo, deleteDone }),
    [todos, dones]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos must be used within TodoProvider');
  return ctx;
}
