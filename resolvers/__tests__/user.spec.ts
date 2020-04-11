import User from "../UserResolver";

describe("Test for the User Resolver", () => {
  test("should return a users projects", async () => {
    const res = await User.projects({ id: 1 });

    expect(res).toBeDefined();
  });
});
