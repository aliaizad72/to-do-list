export default class Project {
  static id = 0;

  constructor(name) {
    this.id = Project.id++;
    this.name = name;
    this.todos = [];
  }

  isValid() {
    return Boolean(this.name);
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  removeTodo(todoId) {
    this.todos.splice(this.todos.findIndex((todo) => todo.id == todoId), 1);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      todos: this.todos.map((todo) => JSON.stringify(todo)),
      addTodo: "(todo) => { this.todos.push(todo) }",
      removeTodo: "(todoId) => { this.todos.splice(this.todos.findIndex((todo) => todo.id == todoId), 1) }"
    }
  }

  static deserialize(string) {
    return JSON.parse(string, (key, value) => {
      if (key === "addTodo" || key === "removeTodo") {
        return eval(value);
      } else if (key === "todos") {
        return value.map((str) => JSON.parse(str));
      }
      return value
    })
  }
}