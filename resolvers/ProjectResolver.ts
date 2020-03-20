import { User } from "../models/Model";

function project_owner(parent: { project_owner: number }) {
  return User.findBy({ id: parent.project_owner });
}

function project_developer(parent: { project_developer: number }) {
  return User.findBy({ id: parent.project_developer });
}

export default { project_owner, project_developer };
