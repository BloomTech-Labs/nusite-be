import { User, Project } from "../models/Model";

function users() {
  return User.find();
}

function projects() {
  return Project.find();
}

function user(parent: any, args: { id: number }) {
  return User.findById(args.id);
}

function project(parent: any, args: { id: number }) {
  return Project.findById(args.id);
}

export default {
  users,
  projects,
  user,
  project,
};
