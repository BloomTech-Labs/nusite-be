import { User } from "../models/Model";

function userProject(parent: { project_owner: number }) {
  return User.findBy({ project_owner: parent.project_owner });
}

function devProject(parent: { project_developer: number }) {
  return User.findBy({ project_developer: parent.project_developer });
}

export default { userProject, devProject };
