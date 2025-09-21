const $todoInput = document.getElementById('todo-input');
const $todoList = document.getElementById('todo-list');
const $completedList = document.getElementById('completed-list');

// 완료 버튼 생성 함수
function createCompleteButton(text, listItem) {
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('button', 'complete-btn');
    completeBtn.textContent = '완료';
    completeBtn.addEventListener('click', () => {
        // '해낸 일' 목록으로 이동
        const completedItem = createTodoItem(text, true);
        $completedList.appendChild(completedItem);
        listItem.remove();
    });
    return completeBtn;
}

// 삭제 버튼 생성 함수
function createDeleteButton(listItem) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('button', 'delete-btn');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
        deleteItem(listItem);
    });
    return deleteBtn;
}

// 버튼 그룹 생성 함수
function createButtonGroup(text, listItem, isCompleted) {
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    if (!isCompleted) {
        // 해야 할 일 목록: 완료 버튼
        const completeBtn = createCompleteButton(text, listItem);
        buttonGroup.appendChild(completeBtn);
    } else {
        // 해낸 일 목록: 삭제 버튼
        const deleteBtn = createDeleteButton(listItem);
        buttonGroup.appendChild(deleteBtn);
    }

    return buttonGroup;
}

// 할 일 아이템을 생성하고 DOM에 추가하는 함수
function createTodoItem(text, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const itemText = document.createElement('span');
    itemText.classList.add('item-text');
    itemText.textContent = text;

    // 버튼 그룹 생성 로직을 별도 함수로 분리
    const buttonGroup = createButtonGroup(text, listItem, isCompleted);

    listItem.appendChild(itemText);
    listItem.appendChild(buttonGroup);

    return listItem;
}

// 할 일 추가
$todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const text = $todoInput.value.trim();
        if (text) {
            const newTodoItem = createTodoItem(text);
            $todoList.appendChild(newTodoItem);
            $todoInput.value = ''; // 입력창 초기화
        }
    }
});

// 할 일 삭제
function deleteItem(item) {
    item.remove();
}