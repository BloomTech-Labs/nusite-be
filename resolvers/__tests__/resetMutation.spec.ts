import Reset from "../ResetMutations";
import dbconfig from "../../data/dbconfig";

beforeAll(async done => {
  await dbconfig.seed.run();
  done();
});

describe("Testing reset password", () => {
  test("should test initiateReset mutation", async () => {
    const user = { email: "HarryPotter@gmail.com" };

    const res = await Reset.initiateReset(null, user);

    expect(res).toBeDefined();
  });

  test("should test resetPassword Mutation", async () => {
    const user = { email: "HarryPotter@gmail.com", password: "testing" };

    const res = await Reset.resetPassword(null, user);

    expect(res).toMatch(/password updated/i);
  });
});
