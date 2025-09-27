import React from 'react';

// 컴포넌트 import
import { useTodo } from '../../context/TodoProvider';

// 스타일 import
import './TodoList.css';

const TodoList: React.FC = () => {
    const { todos, toggleComplete, deleteTodo } = useTodo();

    // 할일/완료 목록 필터링용
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <>
            <div className="render-container">

                {/* 할 일 목록 */}
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {activeTodos.map(todo => (
                            <li key={todo.id} className='render-container__item'>
                                <span className='.render-container__item-text'>
                                    {todo.text}
                                </span>
                                <button
                                    className="render-container-item__button--complete"
                                    onClick={() => toggleComplete(todo.id)}
                                >
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 완료 목록 */}
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="done-list" className="render-container__list">
                        {completedTodos.map(todo => (
                            <li key={todo.id} className='render-container__item'>
                                <span>{todo.text}</span>
                                <button
                                    className="render-container-item__button--delete"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TodoList;