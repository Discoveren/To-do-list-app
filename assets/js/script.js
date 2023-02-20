// Get references to the form and list elements
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// Load existing items from local storage
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

// Render the existing items
renderItems();

// Handle form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const itemText = todoInput.value.trim();
  if (itemText !== '') {
    // Check if the input matches an existing item, and update it if it does
    const index = todoItems.indexOf(itemText);
    if (index !== -1) {
      todoItems[index] = itemText;
    } else {
      todoItems.push(itemText);
    }
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderItems();
    todoInput.value = '';
  }
});

// Render the items in the list
function renderItems() {
  // Clear the existing list items
  todoList.innerHTML = '';

  // Loop through the array of todo items and create a new list item for each one
  todoItems.forEach(function(item, index) {
    const li = document.createElement('li');
    li.textContent = item;

    // Create an "edit" button for each item, with a click event listener that allows the user to edit the item
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      // Replace the list item text with an input field that has the current text as its value
      const input = document.createElement('input');
      input.value = item;
      li.textContent = '';
      li.appendChild(input);
      input.focus();

      // Replace the "edit" button with a "save" button, with a click event listener that saves the updated text
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', function() {
        const updatedItemText = input.value.trim();
        if (updatedItemText !== '') {
          todoItems[index] = updatedItemText;
          localStorage.setItem('todoItems', JSON.stringify(todoItems));
          renderItems();
        }
      });
      li.appendChild(saveButton);

      // Create a "delete" button for the item, with a click event listener that removes the item from the list
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        todoItems.splice(index, 1);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        renderItems();
      });
      li.appendChild(deleteButton);
    });

    // Add the "edit" button and the new list item to the todo list
    li.appendChild(editButton);
    todoList.appendChild(li);
  });
}
