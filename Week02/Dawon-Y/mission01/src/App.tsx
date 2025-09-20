import React from 'react';
import TodoProvider from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">YANG TODO</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList type="todo" />
          <TodoList type="done" />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;