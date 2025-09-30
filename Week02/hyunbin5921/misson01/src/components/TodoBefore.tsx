import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TTodo } from '../types/todo';

// 안전한 ID
const genId = () =>
  (globalThis.crypto && 'randomUUID' in globalThis.crypto)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function TodoBefore() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const newTodo: TTodo = { id: genId(), text };
    setTodos(prev => [...prev, newTodo]);
    setInput('');
  };

  const completeTodo = (todo: TTodo) => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
    setDoneTodos(prev => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos(prev => prev.filter(t => t.id !== todo.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">JJANGTODO</h1>

      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => completeTodo(todo)}
                  className="render-container__item-button"
                  style={{ backgroundColor: 'green' }}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  className="render-container__item-button"
                  style={{ backgroundColor: 'red' }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
