// 타입 정의
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// TodoApp 클래스 정의
class TodoApp {
    private todos: Todo[] = [];
    private $todoInput: HTMLInputElement;
    private $addButton: HTMLButtonElement;
    private $todoList: HTMLUListElement;
    private $completedList: HTMLUListElement;

    constructor(
        todoInput: HTMLInputElement,
        addButton: HTMLButtonElement,
        todoList: HTMLUListElement,
        completedList: HTMLUListElement
    ) {
        // DOM 요소들을 매개변수로 받아 의존성 주입
        this.$todoInput = todoInput;
        this.$addButton = addButton;
        this.$todoList = todoList;
        this.$completedList = completedList;

        // 이벤트 리스너 연결
        this.init();
        this.render();
    }

    // 초기화 메서드
    private init(): void {
        // 추가 버튼 클릭 이벤트
        this.$addButton.addEventListener('click', () => this.addTodo());
        
        // Enter 키 입력 이벤트
        this.$todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    // 할 일 추가 메서드
    private addTodo(): void {
        const text = this.$todoInput.value.trim();
        
        if (text === '') {
            alert('할 일을 입력해주세요!');
            return;
        }

        const newTodo: Todo = {
            id: Date.now(), // 고유 ID 생성
            text: text,
            completed: false
        };

        this.todos.push(newTodo);
        this.$todoInput.value = ''; // 입력창 초기화
        this.render(); // 화면 업데이트
    }

    // 할 일 완료 메서드
    private completeTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            this.render();
        }
    }

    // 할 일 삭제 메서드
    private deleteTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.render();
    }

    // 완료 버튼 생성 메서드 
    private createCompleteButton(todoId: number): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = 'todo-item__button todo-item__button--complete';
        button.textContent = '완료';
        button.addEventListener('click', () => this.completeTodo(todoId));
        return button;
    }

    // 삭제 버튼 생성 메서드
    private createDeleteButton(todoId: number): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = 'todo-item__button todo-item__button--delete';
        button.textContent = '삭제';
        button.addEventListener('click', () => this.deleteTodo(todoId));
        return button;
    }

    // 할 일 아이템 HTML 생성 메서드
    private createTodoElement(todo: Todo): HTMLLIElement {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-item__text';
        span.textContent = todo.text;

        const completeButton = this.createCompleteButton(todo.id);

        li.appendChild(span);
        li.appendChild(completeButton);

        return li;
    }

    // 완료된 할 일 아이템 HTML 생성 메서드 
    private createCompletedElement(todo: Todo): HTMLLIElement {
        const li = document.createElement('li');
        li.className = 'completed-item';

        const span = document.createElement('span');
        span.className = 'completed-item__text';
        span.textContent = todo.text;

        const deleteButton = this.createDeleteButton(todo.id);

        li.appendChild(span);
        li.appendChild(deleteButton);

        return li;
    }

    // 화면 렌더링 메서드
    private render(): void {
        // 기존 리스트 초기화
        this.$todoList.innerHTML = '';
        this.$completedList.innerHTML = '';

        // 할 일 목록과 완료된 목록 분리
        const incompleteTodos = this.todos.filter(todo => !todo.completed);
        const completedTodos = this.todos.filter(todo => todo.completed);

        // 할 일 목록 렌더링
        if (incompleteTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = '할 일을 추가해보세요!';
            this.$todoList.appendChild(emptyMessage);
        } else {
            incompleteTodos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.$todoList.appendChild(todoElement);
            });
        }

        // 완료된 목록 렌더링
        if (completedTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = '완료된 할 일이 없습니다.';
            this.$completedList.appendChild(emptyMessage);
        } else {
            completedTodos.forEach(todo => {
                const completedElement = this.createCompletedElement(todo);
                this.$completedList.appendChild(completedElement);
            });
        }
    }
}

// DOM 요소들을 가져와서 앱 초기화
function initializeTodoApp(): void {
    const todoInput = document.querySelector('#todo-input') as HTMLInputElement;
    const addButton = document.querySelector('#add-button') as HTMLButtonElement;
    const todoList = document.querySelector('#todo-list') as HTMLUListElement;
    const completedList = document.querySelector('#completed-list') as HTMLUListElement;

    // null 체크
    if (!todoInput || !addButton || !todoList || !completedList) {
        console.error('필요한 DOM 요소를 찾을 수 없습니다.');
        return;
    }

    // 의존성 주입을 통한 앱 초기화
    const app = new TodoApp(
        todoInput,
        addButton,
        todoList,
        completedList
    );
}

// DOM이 로드된 후 앱 초기화
document.addEventListener('DOMContentLoaded', initializeTodoApp);