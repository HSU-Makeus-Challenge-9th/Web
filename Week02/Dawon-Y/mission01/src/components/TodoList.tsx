import React from 'react';
import { useTodo, Todo } from '../context/TodoContext';

interface TodoListProps {
  type: 'todo' | 'done';
}

function TodoList({ type }: TodoListProps) {
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  const listToRender = type === 'todo' ? todos : doneTodos;
  const title = type === 'todo' ? '할 일' : '완료';

  const handleClick = (todo: Todo) => {
    if (type === 'todo') {
      completeTodo(todo);
    } else {
      deleteTodo(todo);
    }
  };

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {listToRender.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              className="render-container__item-button"
              onClick={() => handleClick(todo)}
              style={{ backgroundColor: type === 'todo' ? '#28a745' : '#dc3545' }}
            >
              {type === 'todo' ? '완료' : '삭제'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;