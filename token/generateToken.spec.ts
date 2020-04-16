import generateToken from "./generateToken";

describe("Test for token generation", () => {
  test("if passed a user, should return a token string", async () => {
    const user = { id: 1, username: "test" };
    const res = await generateToken(user);
    // expect the type of res to be a string
    expect(typeof res).toBe("string");
  });
});
