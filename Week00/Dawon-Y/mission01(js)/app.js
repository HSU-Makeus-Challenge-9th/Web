document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    // 할 일 아이템을 생성하고 DOM에 추가하는 함수
    function createTodoItem(text, isCompleted = false) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        const itemText = document.createElement('span');
        itemText.classList.add('item-text');
        itemText.textContent = text;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        // 완료 버튼 생성 (해야 할 일 목록에만)
        if (!isCompleted) {
            const completeBtn = document.createElement('button');
            completeBtn.classList.add('button', 'complete-btn');
            completeBtn.textContent = '완료';
            completeBtn.addEventListener('click', () => {
                // '해낸 일' 목록으로 이동
                const completedItem = createTodoItem(text, true);
                completedList.appendChild(completedItem);
                listItem.remove();
            });
            buttonGroup.appendChild(completeBtn);
        }

        // 삭제 버튼 생성 (해낸 일 목록에만)
        if (isCompleted) {
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('button', 'delete-btn');
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click', () => {
                deleteItem(listItem);
            });
            buttonGroup.appendChild(deleteBtn);
        }

        listItem.appendChild(itemText);
        listItem.appendChild(buttonGroup);

        return listItem;
    }

    // 할 일 추가
    todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                const newTodoItem = createTodoItem(text);
                todoList.appendChild(newTodoItem);
                todoInput.value = ''; // 입력창 초기화
            }
        }
    });

    // 할 일 삭제
    function deleteItem(item) {
        item.remove();
    }
});
