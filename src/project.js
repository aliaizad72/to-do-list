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
    }
  }


  static deserialize(string) {
    return Object.assign(JSON.parse(string), {
      addTodo: function addTodo(todo) { this.todos.push(todo) },
      removeTodo: function removeTodo(todoId) { this.todos.splice(this.todos.findIndex((todo) => todo.id == todoId), 1) }
    })
  }
}