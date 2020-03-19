import { Project } from "../models/Model";

function projects(parent: { id: number }) {
  return Project.findUserProjects(parent.id);
}

export default { projects };
