let database = [
  ...JSON.parse(
    localStorage.getItem("todo") ? localStorage.getItem("todo") : "[]"
  ),
];
function saveTodosToLocalStorage(todo) {
  localStorage.setItem("todo", JSON.stringify(todo));
}

let form = document.forms[0];
let todoList = document.querySelector(".todos");

function ToDo(title, category) {
  this.id = Math.round(Math.random() * (999999 - 100000) + 100000);
  this.title = title;
  this.date = new Date();
  this.isChecked = false;
  this.category = category;
}

form.onsubmit = (e) => {
  let todo = new ToDo(form.title.value, form.category.value);
  e.preventDefault();
  AddToDo(todo);
};

function displayToDoList(database) {
  let html = "";
  database.forEach((todo) => {
    html += `
    <li class="list" id="${todo.id}">
    <span class="todoTitle">
    ${todo.title}
  </span>
  <span class="todoCategory">
  ${todo.category}
  </span>
  <div>
  <i id="edit" class="fa-solid fa-pen" onclick="editTodo(this)"></i> 
  <i id="delete" class="fa-solid fa-trash"  onclick="deleteToDo(this)"></i> 
  </div> 
  </li>`;
  });
  todoList.innerHTML = html;
}

// Add
function AddToDo(todo) {
  database.push(todo);
  todoList.innerHTML += `
  <li class="list" id="${todo.id}">
  <span class="todoTitle">
  ${todo.title}
  </span>
  <span class="todoCategory">
  ${todo.category}
  </span>
  <div>
  <i id="edit" class="fa-solid fa-pen" onclick="editTodo(this)"></i> 
  <i id="delete" class="fa-solid fa-trash"  onclick="deleteToDo(this)"> </i>
  </div>  
  </li>`;
  form.title.value = "";
  saveTodosToLocalStorage(database);
}

//  Edit
function editTodo(e) {
  let id = e.parentElement.parentElement.id;
  let findTodo = database.find((item) => {
    return item.id == id;
  });
  let title = prompt("Edit a name:");
  if (title == '' || title == null) {
    title = findTodo.title
  }
  findTodo.title = title;
  displayToDoList(database);
  saveTodosToLocalStorage(database);
}

// Delete
function deleteToDo(e) {
  let id = e.parentElement.parentElement.id;
  let filteredDatabase = database.filter((item) => {
    return item.id != id;
  });
  database = filteredDatabase;
  displayToDoList(database);
  saveTodosToLocalStorage(database);
}

window.onload = () => {
  displayToDoList(database);
};