import todo from "./todo";

// const dueDate = document.getElementById("dueDate");
// const submit = document.getElementById("submit");

// submit.addEventListener("click", (e) => getTodoParams(e))

// function getTodoParams(event) {
//   event.preventDefault();
//   console.log(dueDate.value)
// }

const example = todo("Programming (JS)", "Have to complete my to-do-list project", "2024-10-14T00:31", 2);

function createTodoDiv(todo) {
  const div = document.createElement("div");
  const title = document.createElement("h4");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");

  div.classList.add(..."flex flex-col m-3 p-3 bg-white border border-gray-200 rounded-lg shadow text-lg".split(" "));

  title.textContent = todo.title
  title.classList.add("font-medium")

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

  dueDate.textContent = new Date(todo.dueDate).toLocaleString('en-GB', options)
  dueDate.classList.add("text-sm")
  
  div.appendChild(title)
  div.appendChild(description)
  div.appendChild(dueDate)
  document.body.appendChild(div);
}


createTodoDiv(example);