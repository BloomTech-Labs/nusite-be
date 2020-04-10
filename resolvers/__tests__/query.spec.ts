import Query from "../Query";

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

    console.log(res);
  });
});
