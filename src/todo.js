export default function (title, description, dueDate, paramPriority) {
  function isValid() {
    return this.title && this.dueDate
  }

  const priority = paramPriority
    ? paramPriority
    : "0"

  return {
    title,
    description,
    dueDate,
    priority,
    isValid,
  }
}