import './App.css';
import TodoInput from './components/TodoInput.tsx';
import TodoList from './components/TodoList.tsx';
import { useTheme } from './context/ThemeContext.tsx';
import { useEffect } from 'react';

export default function App() {
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    document.body.className = isDark ? 'dark-body' : 'light-body';
  }, [isDark]);

  return (
    <main className="bg-white dark:bg-slate-800 dark:text-slate-100">
      <header className="dark:text-slate-100">
        <span>HYEON TODO</span>
      </header>
      <button onClick={toggle} className={`dark-button ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
        {isDark ? '☀️ light' : '🌙 dark'}
      </button>
      <TodoInput />
      <section className="container">
        <section>
          <h2>해야할 일</h2>
          <TodoList classification="todo" />
        </section>
        <section>
          <h2>해낸 일</h2>
          <TodoList classification="done" />
        </section>
      </section>
    </main>
  );
}
