import react from 'React';

// 컴포넌트 import
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';

// 스타일 import
import './TodoLayout.css';

const TodoLayout: React.FC = () => {
    return (
        <div className='todo-container'>
            <TodoInput />
            <TodoList />
        </div>
    );
}

export default TodoLayout;