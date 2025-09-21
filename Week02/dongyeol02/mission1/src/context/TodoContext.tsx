import { createContext, useState, type ReactNode } from "react";

interface TodoContextType {
  inputValue: string;
  todos: string[];
  completetodos: string[];

  setInputValue: (value: string) => void;
  addTodo: () => void;
  handleComplete: (completeIdx: number) => void;
  handleDelete: (deleteIdx: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [completetodos, setCompletetodos] = useState<string[]>([]);

  function addTodo() {
    const value = inputValue.trim();

    if (value) {
      setTodos([...todos, value]);
      setInputValue("");
    }
  }
  const handleComplete = (completeIdx: number) => {
    const todocomplete = todos[completeIdx];

    //해낸 일로 이동
    setCompletetodos([...completetodos, todocomplete]);

    //해야 할일 [한거]지우고 다시 보여주기!
    const updateTodos = todos.filter((_, index) => index !== completeIdx);
    setTodos(updateTodos);
  };
  const handleDelete = (deleteIdx: number) => {
    const updateCompletes = completetodos.filter(
      (_, index) => index !== deleteIdx
    );
    setCompletetodos(updateCompletes);
  };
  return (
    <TodoContext.Provider
      value={{
        inputValue,
        todos,
        completetodos,
        setInputValue,
        addTodo,
        handleComplete,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
