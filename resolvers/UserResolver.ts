import { Project } from "../models/Model";

function projects(parent: { id: number }) {
  return Project.findOwnerProjects(parent.id);
}

export default { projects };
