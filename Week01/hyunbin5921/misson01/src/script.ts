// 1. Html 요소 선언
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일 타입 정의
type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할 일 목록 렌더링 함수
const renderTask = () : void =>{
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo): void =>{
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo): void=>{
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });

};

// 3. 할 일 텍스트 입력 함수
const getTodoText = (): string => {
    return todoInput.value.trim();
}

// 4. 할 일 리스트 추가 함수
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text});
    todoInput.value = '';
    renderTask();
};

// 5. 완료 리스트 추가 함수
const doneTask = (todo: Todo): void =>{
    todos = todos.filter((t) : boolean => t.id !== todo.id)
    doneTasks.push(todo);
    renderTask();
};

// 6. 완료 리스트 요소 삭제 함수
const deleteTask = (todo: Todo): void =>{
    doneTasks = doneTasks.filter((t) : boolean => t.id !== todo.id)
    renderTask();
};

// 7. 할 일 아이템 생성 함수
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement =>{
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add("render-container_item-button");

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'green';
    }

    button.addEventListener('click', (): void =>{
        if (isDone){
            deleteTask(todo);
        }
        else{
            doneTask(todo); 
        }}
    )
    li.appendChild(button);
    return li;
}

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text){
        addTodo(text)
    }
})

renderTask();