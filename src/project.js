export default function (name) {
  const todos = [];
  const completed = [];
  const isValid = function() {
    return Boolean(name)
  }

  return {
    name,
    todos,
    completed,
    isValid,
  }
}