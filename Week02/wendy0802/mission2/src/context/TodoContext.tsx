import React, { useState, createContext, type ReactNode } from "react";
import type { TTodo } from "../types/todo";

export interface TodoContextType {
  todos: TTodo[];
  inputText: string;
  setInputText: (text: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  incompleteTodos: TTodo[];
  completedTodos: TTodo[];
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    const text = inputText.trim();
    if (!text) return;

    const newTodo: TTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const value: TodoContextType = {
    todos,
    inputText,
    setInputText,
    addTodo,
    toggleTodo,
    deleteTodo,
    incompleteTodos,
    completedTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
