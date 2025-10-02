import { createContext, useContext, useState, ReactNode } from 'react';

// 타입 정의
export interface Todo {
  id: number;
  text: string;
}

// Context 인터페이스 정의
interface TodoContextInterface {
  todos: Todo[];
  doneTodos: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

// Context 생성
const TodoContext = createContext<TodoContextInterface | undefined>(undefined);

// Provider 컴포넌트 정의
interface TodoProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

  // 할 일 추가 메서드
  const addTodo = (text: string): void => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim()
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  // 할 일 완료 메서드
  const completeTodo = (todoToComplete: Todo): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoToComplete.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todoToComplete]);
  };

  // 할 일 삭제 메서드
  const deleteTodo = (todoToDelete: Todo): void => {
    setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((todo) => todo.id !== todoToDelete.id));
  };

  // Context 값 설정
  const value = {
    todos,
    doneTodos,
    addTodo,
    completeTodo,
    deleteTodo,
  };

  // Provider로 감싸기
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook for using the TodoContext
// Context를 쉽게 사용할 수 있는 커스텀 훅
// Provider 외부에서 사용하면 에러를 발생시켜 안전성을 보장
function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

export default TodoProvider;
export { useTodo };