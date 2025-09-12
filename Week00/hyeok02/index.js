document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");

  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
      }
    }
  });

  function addTask(taskText) {
    const taskItem = document.createElement("div");
    taskItem.textContent = taskText;
    taskItem.classList.add("task-item");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", function () {
      moveTask(taskItem, todoList, completedList);
    });
    taskItem.appendChild(completeBtn);
    todoList.appendChild(taskItem);
  }

  function moveTask(task, fromList, toList) {
    fromList.removeChild(task);
    toList.appendChild(task);
    task.querySelector(".complete-btn").remove();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      toList.removeChild(task);
    });
    task.appendChild(deleteBtn);
  }
});
