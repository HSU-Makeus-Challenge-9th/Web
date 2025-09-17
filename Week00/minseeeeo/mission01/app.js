const input = document.querySelector('.input-styled');

input.addEventListener('keydown', (e) => {

    if (e.key == 'Enter' && input.value.trim() != "") {
        const todoList = document.querySelector('.todo');
        const doneList = document.querySelector('.done');
        
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        const todoText = document.createElement('span');
        todoText.textContent = input.value;
        todoText.className = 'todo-text';

        const doneBtn = document.createElement('button');
        doneBtn.textContent='완료';
        doneBtn.className='done-btn';

        doneBtn.addEventListener('click', () => {
            if (doneBtn.textContent=='완료') {
                doneList.appendChild(todoItem);
                doneBtn.textContent='삭제';
            }
            else {
                todoItem.remove();
            }
        });

        todoItem.appendChild(todoText);
        todoItem.appendChild(doneBtn);

        todoList.appendChild(todoItem);

        input.value="";
    }
});