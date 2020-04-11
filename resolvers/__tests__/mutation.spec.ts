import Mutation from "../MutationResolver";

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
});
