import Mutation from "../MutationResolver";
import dbconfig from "../../data/dbconfig";

beforeAll(async done => {
  await dbconfig.seed.run();
  done();
});

describe("testing auth mutations", () => {
  test("should test signup mutation", async () => {
    const user = {
      username: "test",
      first_name: "test",
      last_name: "test",
      password: "test",
      email: "test@testing.com",
    };

    const res = await Mutation.signup(null, user);

    expect(res.token).toBeDefined();
    expect(res.user).toBeDefined();
  });

  test("should test login mutation", async () => {
    const user = {
      password: "test",
      email: "test@testing.com",
    };

    const res = await Mutation.login(null, user);

    expect(res.token).toBeDefined();
    expect(res.user).toBeDefined();
  });

  test("should test update mutation", async () => {
    const user = {
      id: 1,
      username: "testing update",
      last_name: "testing update",
      password: "testing update",
      email: "testing update@testing.com",
      company: "testing update",
    };

    const res = await Mutation.updateUser({ id: 1 }, user);

    expect(res.username).toBe(user.username);
  });

  test("test should add a project from project mutation", async () => {
    const project = {
      id: 7,
      project_name: "Adding Project",
      project_owner: 2,
      project_developer: 2,
    };

    const res = await Mutation.addProject(null, project);

    expect(res.id).toBeDefined();
  });

  test("test should update a project from project mutation", async () => {
    const project = {
      id: 1,
      project_name: "Testing update project",
      project_owner: 2,
      project_developer: 2,
    };

    const res = await Mutation.updateProject({ id: 1 }, project);

    expect(res.project_owner).toBe(project.project_owner);
  });
  test("test should delete a project", async () => {
    const project = {
      id: 2,
      project_name: "Delete",
      project_owner: 2,
      project_developer: 2,
    };

    const res = await Mutation.deleteProject({ id: 2 }, project);
    expect(res).toBeDefined();
  });
});
