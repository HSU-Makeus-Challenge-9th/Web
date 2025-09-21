const $input = document.getElementById('input');
const $todoList = document.getElementById('todo');
const $doneList = document.getElementById('done');

$input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function createTodo(todo) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${todo}</span> <button class="complete">완료</button>`;
  li.querySelector('.complete').addEventListener('click', () => {
    completeTodo(todo);
  });
  return li;
}

function createDone(todo) {
  const li = document.createElement('li');
  li.innerHTML = `<span class="done">${todo}</span> <button class="delete">삭제</button>`;
  li.querySelector('.delete').addEventListener('click', () => {
    deleteTodo(todo);
  });
  return li;
}

function deleteTodo(todo) {
  const dones = JSON.parse(localStorage.getItem('dones')) || [];
  const newDones = dones.filter((done) => done !== todo);
  localStorage.setItem('dones', JSON.stringify(newDones));
  loadTodos();
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const dones = JSON.parse(localStorage.getItem('dones')) || [];

  $todoList.innerHTML = '';
  $doneList.innerHTML = '';

  todos.forEach((todo) => {
    const todo = createTodo(todo);
    $todoList.appendChild(todo);
  });

  dones.forEach((todo) => {
    const done = createDone(todo);
    $doneList.appendChild(done);
  });
}

function addTodo() {
  const text = $input.value.trim();
  if (!text) return;

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(text);
  localStorage.setItem('todos', JSON.stringify(todos));

  $input.value = '';
  loadTodos();
}

function completeTodo(text) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter((todo) => todo !== text);
  localStorage.setItem('todos', JSON.stringify(todos));

  const dones = JSON.parse(localStorage.getItem('dones')) || [];
  dones.push(text);
  localStorage.setItem('dones', JSON.stringify(dones));

  loadTodos();
}

window.addEventListener('load', loadTodos);
