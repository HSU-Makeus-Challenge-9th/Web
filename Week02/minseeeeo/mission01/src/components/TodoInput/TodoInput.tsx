import React, { useState } from 'react';
import { useTodo } from '../../context/TodoProvider';

// 스타일 import
import './TodoInput.css';

const TodoInput: React.FC = () => {
    const [input, setInput] = useState('');
    const { addTodo } = useTodo();

    // 폼 제출 관련
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(input);
        setInput('');
    }

    return (
        <>
            <h1 className="todo-container__header">YONG TODO</h1>
            <form
                id="todo-form"
                className="todo-container__form"
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo-input"
                    className="todo-container__input"
                    placeholder="할 일 입력"
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit" 
                    className="todo-container__button">
                    할 일 추가
                </button>
            </form>
        </>
    );
}

export default TodoInput;