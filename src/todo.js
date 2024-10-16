export default class Todo {
  static id = 0;

  constructor(title, description, dueDate, priority) {
    this.id = Todo.id++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
      ? priority
      : "0";
  }

  isValid() {
    return this.title && this.dueDate
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
    }
  }
}