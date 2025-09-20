const input = document.querySelector(".input");
const todoList = document.querySelector(".todo");
const doneList = document.querySelector(".done");

// input창을 통한 할 일 추가
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); //
    const text = input.value.trim();
    if (text !== "") {
      addTodo(text);
      input.value = "";
    }
  }
});

// 할 일 추가
function addTodo(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  // 완료
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.classList.add("complete");
  completeBtn.addEventListener("click", function () {
    moveToDone(li, text);
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  todoList.appendChild(li);
}

// 목록 이동
function moveToDone(item, text) {
  item.innerHTML = "";

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", function () {
    item.remove();
  });

  item.appendChild(span);
  item.appendChild(deleteBtn);
  doneList.appendChild(item);
}
