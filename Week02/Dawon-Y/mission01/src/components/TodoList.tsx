import React from 'react';
import { useTodo, Todo } from '../context/TodoContext';

// 할일 목록을 표시하고 상태 변경을 처리
// type prop에 따라 두 가지 모드로 동작

interface TodoListProps {
  type: 'todo' | 'done';
}

// TodoList 컴포넌트
function TodoList({ type }: TodoListProps) {
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  // ✅ 수정: 삼항 연산자 대신 객체 매핑을 통한 데이터와 설정 관리
  const todoConfig = {
    todo: {
      list: todos,
      title: '할 일',
      buttonText: '완료',
      buttonColor: '#28a745',
      action: completeTodo
    },
    done: {
      list: doneTodos,
      title: '완료',
      buttonText: '삭제',
      buttonColor: '#dc3545',
      action: deleteTodo
    }
  };

  // ✅ 수정: 현재 type에 해당하는 설정 가져오기 (기본값: todo)
  const config = todoConfig[type] || todoConfig.todo;

  // ✅ 수정: 단일 함수로 처리 (이전: type별 분기 처리)
  const handleClick = (todo: Todo) => {
    config.action(todo);
  };

  // 할 일과 완료된 할 일을 구분하여 렌더링
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{config.title}</h2>
      <ul className="render-container__list">
        {config.list.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              className="render-container__item-button"
              onClick={() => handleClick(todo)}
              style={{ backgroundColor: config.buttonColor }}
            >
              {config.buttonText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;