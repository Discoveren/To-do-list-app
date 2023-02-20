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
    todoItems.push(itemText);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderItems();
    todoInput.value = '';
  }
});

// Render the items in the list
function renderItems() {
  todoList.innerHTML = '';
  todoItems.forEach(function(item, index) {
    const li = document.createElement('li');
    li.textContent = item;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Done :)';
    deleteButton.addEventListener('click', function() {
      todoItems.splice(index, 1);
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      renderItems();
    });
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}