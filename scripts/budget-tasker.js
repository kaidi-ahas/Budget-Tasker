document.addEventListener("DOMContentLoaded", () => {
  // Load tasks from localStorage when the page loads
  loadTasks();
  document.getElementById("addTaskBtn").addEventListener("click", addTask);
});

function addTask() {
  const taskName = document.getElementById("taskName").value;
  const taskPrice = document.getElementById("taskPrice").value;
  const dueDate = document.getElementById("dueDate").value;

  if (taskName && taskPrice) {
      const taskList = document.getElementById("taskList");

      const li = document.createElement("li");
      const spanName = document.createElement("span");
      spanName.classList.add("task-name");
      spanName.textContent = taskName;
      const spanPrice = document.createElement("span");
      spanPrice.classList.add("task-price");
      spanPrice.textContent = taskPrice + " €";
      const spanDate = document.createElement("span");
      spanDate.classList.add("due-date");
      spanDate.textContent = dueDate ? "Due Date: " + dueDate : "";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => {
          markTaskAsFinished(li);
          showPopup();
      });

      li.appendChild(checkbox);
      li.appendChild(spanName);
      li.appendChild(spanPrice);
      li.appendChild(spanDate);

      taskList.appendChild(li);

      // Save tasks to localStorage
      saveTasks();

      // Clear input fields
      document.getElementById("taskName").value = "";
      document.getElementById("taskPrice").value = "";
      document.getElementById("dueDate").value = "";
  } else {
      alert("Please enter task name and price.");
  }
}

function markTaskAsFinished(taskItem) {
  taskItem.classList.toggle("finished");
  // Save tasks to localStorage when a task is marked as finished
  saveTasks();
}

function showPopup() {
  const popup = document.createElement("div");
  popup.textContent = "Good job finishing the task! Task money will be sent to your bank account in a minute.";
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.background = "#007bff";
  popup.style.color = "#fff";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  setTimeout(() => {
      popup.remove();
  }, 3000);
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = savedTasks;
      // Add event listeners to checkboxes of loaded tasks
      const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.addEventListener("change", () => {
              markTaskAsFinished(checkbox.parentElement);
          });
      });
  }
}
