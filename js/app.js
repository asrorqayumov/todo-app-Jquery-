$(document).ready(function () {
  let database = [...JSON.parse(localStorage.todo ? localStorage.todo : "[]")];

  function saveTodosToLocalStorage(todo) {
    localStorage.todo = JSON.stringify(todo);
  }

  let form = $(".todo-form");
  let todoList = $(".todos")[0];

  function ToDo(title, category) {
    this.id = Math.round(Math.random() * (999999 - 100000) + 100000);
    this.title = title;
    this.date = new Date();
    this.isChecked = false;
    this.category = category;
  }

  form.submit(function (e) {
    e.preventDefault();
    let todo = new ToDo(form[0].title.value, form[0].category.value);
    AddToDo(todo);
  });

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
    <i id="edit" class="fa-solid fa-pen"></i> 
    <i id="delete" class="fa-solid fa-trash"></i> 
    </div> 
    </li>`;
    });
    todoList.innerHTML = html;
  }

  // Add
  function AddToDo(todo) {
    database.push(todo);
    let li = document.createElement("li");
    li.classList.add("list");
    li.id = todo.id;
    li.innerHTML = `
    <span class="todoTitle">
    ${todo.title}
    </span>
    <span class="todoCategory">
    ${todo.category}
    </span>
    <div>
    <i id="edit" class="fa-solid fa-pen"></i> 
    <i id="delete" class="fa-solid fa-trash"> </i>
    </div> `;

    todoList.append(li);
    form[0].reset();
    saveTodosToLocalStorage(database);
  }
  //  Edit
  $(todoList).on("click", ".fa-pen", function (e) {
    let id = e.target.closest("li").id;
    let findTodo = database.find((item) => item.id == id);
    let title = prompt("Edit a name:");
    if (title == "" || title == null) {
      title = findTodo.title;
    }
    findTodo.title = title;
    displayToDoList(database);
    saveTodosToLocalStorage(database);
  });

  // Delete
  $(todoList).on("click", ".fa-trash", function (e) {
    let id = e.target.closest("li").id;
    let filteredDatabase = database.filter((item) => item.id != id);
    database = filteredDatabase;
    displayToDoList(database);
    saveTodosToLocalStorage(database);
  });

  displayToDoList(database);
});
