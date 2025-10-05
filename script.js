document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when the page is loaded
  loadTasks();

  /**
   * Load tasks from Local Storage:
   * This function retrieves tasks from Local Storage and displays them on the page.
   */
  function loadTasks() {
    // Retrieve tasks from localStorage or use an empty array if none are found
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Populate the task list with tasks from Local Storage
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid saving again to Local Storage
  }

  /**
   * Task Creation and Removal:
   * This function creates a new task element, adds it to the task list, 
   * saves it to Local Storage, and provides a button to remove it.
   */
  function addTask(taskText, save = true) {
    // Create the <li> element and set its text content to the task text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button, set its text content, and add a class using classList.add()
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // Using classList.add() to add the class

    // When the remove button is clicked, remove the task from the task list
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText); // Remove from Local Storage
    };

    // Append the remove button to the <li> element
    li.appendChild(removeBtn);

    // Append the <li> to the task list
    taskList.appendChild(li);

    // Save to Local Storage if 'save' is true
    if (save) {
      saveTaskToStorage(taskText);
    }

    // Clear the task input field
    taskInput.value = '';
  }

  /**
   * Save task to Local Storage:
   * This function adds a new task to Local Storage.
   */
  function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText); // Add new task to the array
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array back to Local Storage
  }

  /**
   * Remove task from Local Storage:
   * This function removes a task from Local Storage when it is deleted from the list.
   */
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText); // Remove task from the array
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage with the new array
  }

  /**
   * Attach Event Listeners:
   * We add event listeners to handle task creation when the user clicks the "Add Task" button
   * or presses the Enter key.
   */

  // Event listener for "Add Task" button
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText); // Add task if input is not empty
    } else {
      alert('Please enter a task');
    }
  });

  // Event listener for Enter key press inside the task input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText); // Add task if input is not empty
      } else {
        alert('Please enter a task');
      }
    }
  });
});
