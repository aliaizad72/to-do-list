import Todo from "./todo";
import Project from "./project"
import user from "./user"

const user0 = user();
const todosubmit = document.getElementById("todosubmit");
const projectsubmit = document.getElementById("projectsubmit");
const projectOptions = document.querySelector("select");

document.getElementById("opentaskform").addEventListener("click", toggleTodoForm);
document.getElementById("closeform").addEventListener("click", toggleTodoForm);
document.getElementById("openprojectform").addEventListener("click", toggleProjectForm);
document.getElementById("closeprojectform").addEventListener("click", toggleProjectForm);

todosubmit.addEventListener("click", (e) => createTodo(e));
projectsubmit.addEventListener("click", (e) => createProject(e));

projectOptions.addEventListener("change", () => loadProject())

function createTodo(event) {
  event.preventDefault();

  const newTodo = new Todo(
    document.getElementById("title").value, 
    document.getElementById("description").value, 
    document.getElementById("duedate").value, 
    document.getElementById("priority").value
  )

  const currentProject = getCurrentProject(event);
  currentProject.addTodo(newTodo);

  if(newTodo.isValid()) {;
    createTodoDiv(newTodo);
  } else {
    alert("Please fill in the title and due date!");
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

  description.textContent = todo.description;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  dueDate.textContent = "Due by: " + new Date(todo.dueDate).toLocaleString('en-GB', options);
  dueDate.classList.add("text-sm");

  const statusDiv = document.createElement("div");
  statusDiv.classList.add(..."flex gap-2 items-center".split(" "));

  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  deleteBtn.textContent = "Delete";
  completeBtn.classList.add(..."text-sm hover:text-blue-700".split(" "));
  deleteBtn.classList.add(..."text-sm hover:text-blue-700".split(" "));
  completeBtn.addEventListener("click", (e) => deleteTodo(e));
  deleteBtn.addEventListener("click", (e) => deleteTodo(e));

  statusDiv.appendChild(completeBtn);
  statusDiv.appendChild(deleteBtn);
  
  div.classList.add("todo");
  div.setAttribute("data-todo-id", todo.id)
  div.appendChild(titleDiv);
  div.appendChild(description);
  div.appendChild(dueDate);
  div.appendChild(statusDiv);
  document.getElementById("todos").appendChild(div);
}

function deleteTodo(e) {
  getCurrentProject().removeTodo(e.target.parentElement.parentElement.dataset.todoId);
  e.target.parentElement.parentElement.remove();
}

function toggleTodoForm() {
  document.getElementById("form").classList.toggle("hidden");
  document.getElementById("opentaskform").classList.toggle("hidden");
}

function toggleProjectForm() {
  document.getElementById("projectform").classList.toggle("hidden");
  document.getElementById("openprojectform").classList.toggle("hidden");
}

function setDefaultProject() {
  user0.add(new Project("Project 0"))
  user0.add(new Project("Project 1"))
}

function addProjectsToSelect() {
  clearSelectedProject();
  user0.projects.forEach((project) => {
    const option = document.createElement("option");
    option.textContent = project.name;
    option.value = project.name;
    option.setAttribute("id", project.name)

    document.getElementById("projects").appendChild(option);
  })
}

function clearProjectsSelects() {
  const projects = document.getElementById("projects");

  while (projects.lastChild) {
    projects.lastChild.remove()
  }
}

function clearSelectedProject() {
  for(const project of document.getElementById("projects").children) {
    project.setAttribute("selected", false);
  }
}

function selectProject(project) {
  document.getElementById(project.name).setAttribute("selected", true);
}

function createProject(event) {
  event.preventDefault();

  const newProject = new Project(document.getElementById("project-name").value)

  if (newProject.isValid()) {
    user0.add(newProject);
    clearProjectsSelects();
    addProjectsToSelect();
    selectProject(newProject);
  } else {
    alert("Projects must have a name!");
  }
}

function setDefaultTodo(project) {
  const newTodo = new Todo("Title", "Description", "Mon Oct 14 2024 18:54:23 GMT+0800 (Malaysia Time)", "1")

  project.addTodo(newTodo)
}

function loadTodos(project) {
  project.todos.forEach((todo) => createTodoDiv(todo))
}

function getCurrentProject() {
  return user0.projects.find((project) => project.name == document.getElementById("projects").value)
}

function loadProject() {
  removeTodoDivs();
  const project = getCurrentProject();
  loadTodos(project);
}

function removeTodoDivs() {
  const todos = [...document.querySelectorAll(".todo")];
  todos.forEach((todo) => todo.remove());
}

document.body.onload = () => {
  setDefaultProject();
  setDefaultTodo(user0.projects[0]);
  addProjectsToSelect();
  loadTodos(user0.projects[0])
  const desObj = Project.deserialize(JSON.stringify(user0.projects[0]));
}