import React, { useState, createContext, useContext, ReactNode } from "react";
import type { Task, TodoContextType } from "../types/todo";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTask = (task: Task) => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const value: TodoContextType = {
    todos,
    doneTasks,
    addTodo,
    completeTask,
    deleteTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx)
    throw new Error("useTodoContext must be used within a TodoProvider");
  return ctx;
};
