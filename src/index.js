import todo from "./todo";

const dueDate = document.getElementById("dueDate");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => createTodo(e))

function createTodo(event) {
  event.preventDefault();

  const newTodo = todo(
    document.getElementById("title").value, 
    document.getElementById("description").value, 
    document.getElementById("duedate").value, 
    document.getElementById("priority").value
  )

  if(newTodo.isValid()) {;
    createTodoDiv(newTodo)
  } else {
    alert("Please fill in the title and due date!")
  }
}

function createTodoDiv(todo) {
  const div = document.createElement("div");
  const titleDiv = document.createElement("div");
  const title = document.createElement("h4");
  const priority = document.createElement("p");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");

  div.classList.add(..."flex flex-col m-3 p-3 bg-white border border-gray-200 rounded-lg shadow text-lg gap-1".split(" "));

  titleDiv.classList.add(..."flex gap-2 items-center".split(" "));

  title.textContent = todo.title;
  title.classList.add("font-medium");

  priority.textContent = todo.priority
  priority.classList.add(..."text-sm bg-red-100".split(" "));

  titleDiv.appendChild(title);
  titleDiv.appendChild(priority);

  description.textContent = todo.description
  description.classList.add()

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  dueDate.textContent = "Due by: " + new Date(todo.dueDate).toLocaleString('en-GB', options)
  dueDate.classList.add("text-sm")

  const statusDiv = document.createElement("div");
  statusDiv.classList.add(..."flex gap-2 items-center".split(" "));

  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  deleteBtn.textContent = "Delete";
  completeBtn.classList.add(..."text-sm hover:text-blue-700".split(" "));
  deleteBtn.classList.add(..."text-sm hover:text-blue-700".split(" "));
  completeBtn.addEventListener("click", (e) => deleteDiv(e));
  deleteBtn.addEventListener("click", (e) => deleteDiv(e));

  statusDiv.appendChild(completeBtn);
  statusDiv.appendChild(deleteBtn);
  
  div.appendChild(titleDiv);
  div.appendChild(description);
  div.appendChild(dueDate);
  div.appendChild(statusDiv);
  document.getElementById("todos").appendChild(div);
}

function deleteDiv(e) {
  e.target.parentElement.parentElement.remove();
}

createTodoDiv(todo("Coding", "Finish JS project", "2024-10-14T18:17", "1"))