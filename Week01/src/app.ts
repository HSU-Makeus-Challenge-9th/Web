const input = document.querySelector(
  '.input-section input'
) as HTMLInputElement;
const todoList = document.querySelector('.todo') as HTMLUListElement;
const doneList = document.querySelector('.done') as HTMLUListElement;
const addButton = document.querySelector('.add-button') as HTMLButtonElement;

input.addEventListener('keypress', function (e: KeyboardEvent) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

addButton.addEventListener('click', addTodo);

function loadTodos(): void {
  const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const dones: string[] = JSON.parse(localStorage.getItem('dones') || '[]');

  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${todo}</span> <button class="complete">완료</button>`;
    li.querySelector('.complete')!.addEventListener('click', () =>
      completeTodo(todo)
    );
    todoList.appendChild(li);
  });

  dones.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="done">${todo}</span> <button class="delete">삭제</button>`;
    li.querySelector('.delete')!.addEventListener('click', () => {
      const newDones = dones.filter((done) => done !== todo);
      localStorage.setItem('dones', JSON.stringify(newDones));
      loadTodos();
    });
    doneList.appendChild(li);
  });
}

function addTodo(): void {
  const text = input.value.trim();
  if (!text) return;

  const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.push(text);
  localStorage.setItem('todos', JSON.stringify(todos));

  input.value = '';
  loadTodos();
}

function completeTodo(text: string): void {
  let todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]');
  todos = todos.filter((todo) => todo !== text);
  localStorage.setItem('todos', JSON.stringify(todos));

  const dones: string[] = JSON.parse(localStorage.getItem('dones') || '[]');
  dones.push(text);
  localStorage.setItem('dones', JSON.stringify(dones));

  loadTodos();
}

window.addEventListener('load', loadTodos);
