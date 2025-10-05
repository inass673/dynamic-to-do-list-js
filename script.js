document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  /**
   * Task Creation and Removal
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    // Only proceed if taskText is not empty
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    // Create a new list item (li)
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn'; // Assign class for styling

    // When the remove button is clicked, remove the task from the list
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append the remove button to the list item (li)
    li.appendChild(removeBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = '';
  }

  /**
   * Attach Event Listeners
   */

  // Event listener for the "Add Task" button
  addButton.addEventListener('click', addTask);

  // Event listener for the "Enter" key to add a task
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
