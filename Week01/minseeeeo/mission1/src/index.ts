const $todoBtn = document.querySelector<HTMLButtonElement>('.todo__button');
const $todoInput = document.querySelector<HTMLInputElement>('.todo__input');
const $todoList = document.querySelector<HTMLSelectElement>('.todo__todoList');
const $doneList = document.querySelector<HTMLSelectElement>('.todo__doneList');

// 로컬스토리지용 배열
let todos: string[] = [];
let dones: string[] = [];

// 로컬스토리지에 저장된거 불러오는 함수
function saveLists() {
    localStorage.setItem('todos_key', JSON.stringify(todos));
    localStorage.setItem('dones_key', JSON.stringify(dones));
}

function loadList() {
    const savedTodos = localStorage.getItem('todos_key');
    const savedDones = localStorage.getItem('dones_key');
    todos = savedTodos ? JSON.parse(savedTodos) : [];
    dones = savedDones ? JSON.parse(savedDones) : [];
}

// 할일 item 만들기
const createTodoItem = (text: string, isDone: boolean): HTMLDivElement => {
    // 컨테이너 div
    const todoItem = document.createElement('div');
    todoItem.className = 'todo__item';

    // 할일 내용 span
    const todoText = document.createElement('span');
    todoText.className = 'todo__text'
    todoText.textContent = text;
    
    // 완료 button
    const todoBtn = document.createElement('button');

    if (isDone) {
        todoBtn.className = 'todo__button delete';
        todoBtn.textContent = '삭제';
    } else {
        todoBtn.className = 'todo__button done';
        todoBtn.textContent = '완료';
    }
    todoBtn.addEventListener('click', doneToDelete);

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoBtn);

    return todoItem;
}

// add 할일
const addTodo = (): void => {
    // 존재 여부 검사
    if (!$todoInput || !$todoList) return;
    const newTodoText = $todoInput.value.trim();

    // 로컬스토리지 배열에 추가+저장
    todos.push(newTodoText);
    saveLists();

    // 할일 목록에 붙임
    const newTodoItem = createTodoItem(newTodoText, false);
    $todoList.appendChild(newTodoItem);

    $todoInput.value = '';
    $todoInput.focus();
}

// 완료->삭제 이동 리스너
function doneToDelete(e: MouseEvent): void {
    const actionBtn = e.target as HTMLButtonElement;
    const todoItem = actionBtn.parentElement;
    const $todoText = todoItem?.querySelector('.todo__text') as HTMLParagraphElement;
    const text = $todoText.textContent || '';

    // 실제하는지 검증
    if (!todoItem || !$doneList) return;

    if (actionBtn.textContent === '완료') {
        // todos배열 -> dones 배열 이동
        todos = todos.filter(todo => todo !== text);
        dones.push(text);

        $doneList?.appendChild(todoItem);
        actionBtn.textContent = '삭제';
        actionBtn.className = 'todo__button delete';
    } else {
        dones = dones.filter(done => done !== text);
        todoItem.remove();
    }
    saveLists();
}

function initialRender() {
    if (!$todoList || !$doneList) return;

    todos.forEach(todoText => {
        const todoItem = createTodoItem(todoText, false);
        $todoList.appendChild(todoItem);
    });

    dones.forEach(doneText => {
        const doneItem = createTodoItem(doneText, true);
        $doneList.appendChild(doneItem);
    })
}


// todoBtn 클릭 리스너
$todoBtn?.addEventListener("click", addTodo);

// todoInput 리스너 - 엔터
$todoInput?.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key=='Enter' && $todoInput.value?.trim() != '') {
        addTodo();
    }
})

loadList();
initialRender();