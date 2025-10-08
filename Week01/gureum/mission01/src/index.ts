const input = document.querySelector('.input-section input') as HTMLInputElement;
const addButton = document.querySelector('.add-button') as HTMLButtonElement;
const todoList = document.querySelector('.todo') as HTMLUListElement;
const doneList = document.querySelector('.done') as HTMLUListElement;

// 할 일 추가: 입력값 검사 후 할 일 항목 생성 및 todo 리스트에 추가
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

// 완료 처리: todo 항목 제거 후 done 리스트에 항목 추가 (삭제 버튼 포함)
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

// 이벤트 등록: 버튼 클릭 및 엔터 키로 추가
addButton.addEventListener('click', addTodo);

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});