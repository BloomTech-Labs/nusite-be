const db = require("../data/dbconfig");
// const User = require("./Model");
import { User, Project } from "./Model";

// beforeEach(async () => {
//   await db.seed.run();
// });

describe(" Model", () => {
  test("find user/project in db", async () => {
    const users = await User.find();
    const projects = await Project.find();

    expect(users.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
  });

  test("should find user/project by id", async () => {
    const user = await User.findById(1);
    const project = await Project.findById(1);

    expect(user.id).toBe(1);
    expect(project.id).toBe(1);
  });

  test("should add a project", async () => {
    const project = {
      project_name: "testing1",
      project_avatar: null,
      project_owner: 4,
      completed: true,
      marketplace: false,
      showcase: true,
    };
    const [addProject] = await Project.add(project);

    expect(addProject.id).toBeDefined();
  });

  test("should update a project", async () => {
    const project = {
      id: 1,
      project_name: "update",
      project_avatar: null,
      project_owner: 4,
      completed: true,
      marketplace: false,
      showcase: true,
    };
    const [updateProject] = await Project.update(1, project);
    expect(updateProject.project_name).toBe("update");
  });

  test("should delete aa project", async () => {
    const project = await Project.remove(2);

    console.log(project);
  });
});
