import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Todo 타입 정의
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Context 타입 정의
interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleComplete: (id: number) => void;
    deleteTodo: (id: number) => void;
}

// Context 생성
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Context Provider 생성
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // 할일 추가 함수
    const addTodo = (text: string) => {
        if (text.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: text.trim(),
                completed: false,
            };
            setTodos([...todos, newTodo]);
        }
    }

    // 할일 -> 완료 이동 함수
    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) return { ...todo, completed: true };
            else return todo;
        }));
    };

    // 목록 삭제 함수
    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleComplete, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
}


// 커스텀 훅
export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within TodoProvider');
    }
    return context;
}