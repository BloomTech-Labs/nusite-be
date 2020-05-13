import Query from "../Query";
import dbconfig from "../../data/dbconfig";

beforeAll(async done => {
  await dbconfig.seed.run();
  done();
});

describe("Should test main queries", () => {
  test("should get list of users", async () => {
    const res = await Query.users();
    // ensure it returns a list of users
    expect(res.length).toBeGreaterThan(0);
  });

  test("should get list of projects", async () => {
    const res = await Query.projects();
    // ensure it returns a list of projects
    expect(res.length).toBeGreaterThan(0);
  });

  test("should get user id 1", async () => {
    const res = await Query.user(null, { id: 1 });
    // should return user with id of 1
    expect(res.id).toBe(1);
    expect(res.first_name).toMatch(/meredith/i);
  });

  test("should get project id 1", async () => {
    const res = await Query.project(null, { id: 1 });
    // should return project with id of 1
    expect(res.id).toBe(1);
    expect(res.project_name).toMatch(/Hospital/i);
  });
});
