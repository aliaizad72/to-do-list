export default function (name) {
  const todos = [];
  const isValid = function() {
    return Boolean(name)
  }
  const addTodo = function(todo) {
    todos.push(todo)
  }

  return {
    name,
    todos,
    isValid,
    addTodo
  }
}