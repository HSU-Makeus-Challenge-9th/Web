import { createContext, useContext, useState, ReactNode } from 'react';

export interface Todo {
  id: number;
  text: string;
}

interface TodoContextInterface {
  todos: Todo[];
  doneTodos: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const TodoContext = createContext<TodoContextInterface | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

  const addTodo = (text: string): void => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim()
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const completeTodo = (todoToComplete: Todo): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoToComplete.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todoToComplete]);
  };

  const deleteTodo = (todoToDelete: Todo): void => {
    setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((todo) => todo.id !== todoToDelete.id));
  };

  const value = {
    todos,
    doneTodos,
    addTodo,
    completeTodo,
    deleteTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

export default TodoProvider;
export { useTodo };