const $input = document.querySelector('.input-section input');
const $todoList = document.querySelector('.todo');
const $doneList = document.querySelector('.done');
const $addButton = document.querySelector('.add-button');

// 타입 가드(DOM 요소가 없을 경우 에러 처리)
if (!$input || !$todoList || !$doneList || !$addButton) {
  throw new Error('DOM 요소가 없음');
}

// 강제 타입 단언 대신 안전하게 캐스팅
const input = $input as HTMLInputElement;
const todoList = $todoList as HTMLUListElement;
const doneList = $doneList as HTMLUListElement;
const addButton = $addButton as HTMLButtonElement;

// 이벤트 리스너 등록
input.addEventListener('keydown', function (e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.isComposing) {
    addTodo();
  }
});

addButton.addEventListener('click', addTodo);

// 할 일 목록 렌더링
function loadTodos(): void {
  const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const dones: string[] = JSON.parse(localStorage.getItem('dones') || '[]');

  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // 해야할 일 렌더링
  todos.forEach((todo) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = todo;

    const button = document.createElement('button');
    button.textContent = '완료';
    button.className = 'complete';
    button.addEventListener('click', () => completeTodo(todo));

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  });

  // 해낸 일 렌더링
  dones.forEach((todo) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = todo;
    span.className = 'done';

    const button = document.createElement('button');
    button.textContent = '삭제';
    button.className = 'delete';
    button.addEventListener('click', () => {
      const newDones = dones.filter((done) => done !== todo);
      localStorage.setItem('dones', JSON.stringify(newDones));
      loadTodos();
    });

    li.appendChild(span);
    li.appendChild(button);
    doneList.appendChild(li);
  });
}

// 새로운 할 일 추가
function addTodo(): void {
  const text = input.value.trim();
  if (!text) return;

  const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.push(text);
  localStorage.setItem('todos', JSON.stringify(todos));

  input.value = '';
  loadTodos();
}

// 할 일 완료 처리
function completeTodo(text: string): void {
  let todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  todos = todos.filter((todo) => todo !== text);
  localStorage.setItem('todos', JSON.stringify(todos));

  const dones: string[] = JSON.parse(localStorage.getItem('dones') || '[]');
  dones.push(text);
  localStorage.setItem('dones', JSON.stringify(dones));

  loadTodos();
}

// 페이지 로드 시 초기화
window.addEventListener('load', loadTodos);
