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
      li.classList.add("task-item"); // Add a class to the <li> element

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

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
          deleteTask(li);
      });
      deleteBtn.classList.add("delete-button"); // Add delete-button class here

      li.appendChild(checkbox);
      li.appendChild(spanName);
      li.appendChild(spanPrice);
      li.appendChild(spanDate);
      li.appendChild(deleteBtn);

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

function deleteTask(taskItem) {
  taskItem.remove();
  // Save tasks to localStorage after deleting a task
  saveTasks();
}

function showPopup() {
  const popup = document.createElement("div");
  popup.textContent = "Good job finishing the task! Task money will be sent to your bank account in a minute.";
  popup.classList.add("popup");
  document.body.appendChild(popup);

  // Delay before showing the popup
  setTimeout(() => {
    popup.style.opacity = "1"; // Make the popup visible
    setTimeout(() => {
      popup.style.opacity = "0"; // Fade out the popup
      setTimeout(() => {
        popup.remove(); // Remove the popup after fading out
      }, 1000); // Adjust the duration of fading out
    }, 3000); // Duration of showing the popup
  }, 500); // Delay before showing the popup
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
      // Add event listeners to checkboxes and delete buttons of loaded tasks
      const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.addEventListener("change", () => {
              markTaskAsFinished(checkbox.parentElement);
          });
      });

      const deleteButtons = taskList.querySelectorAll('.delete-button'); // Use class selector for delete buttons
      deleteButtons.forEach(button => {
          button.addEventListener("click", () => {
              deleteTask(button.parentElement);
          });
      });
  }
}
