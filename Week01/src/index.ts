const input = document.querySelector('.input-section input') as HTMLInputElement;
const addButton = document.querySelector('.add-button') as HTMLButtonElement;
const todoList = document.querySelector('.todo') as HTMLUListElement;
const doneList = document.querySelector('.done') as HTMLUListElement;

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    alert('할 일을 입력해주세요!');
    return;
  }

  const listItem = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = text;

  const doneButton = document.createElement('button');
  doneButton.textContent = '완료';
  doneButton.className = 'done-button';
  doneButton.addEventListener('click', () => completeTask(listItem, text));

  listItem.appendChild(taskSpan);
  listItem.appendChild(doneButton);
  todoList.appendChild(listItem);
  input.value = '';
}

function completeTask(item: HTMLLIElement, text: string) {
  item.remove();

  const doneItem = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = text;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';
  deleteButton.className = 'delete-button';
  deleteButton.addEventListener('click', () => doneItem.remove());

  doneItem.appendChild(taskSpan);
  doneItem.appendChild(deleteButton);
  doneList.appendChild(doneItem);
}

addButton.addEventListener('click', addTodo);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});