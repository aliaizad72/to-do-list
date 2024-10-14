export default function() {
  const projects = [];
  const add = function (project) {
    projects.push(project)
  }
  return {
    projects,
    add,
  }
}