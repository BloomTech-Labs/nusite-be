import Verify from "../VerifyResolver";
import dbconfig from "../../data/dbconfig";

beforeAll(async done => {
  await dbconfig.seed.run();
  done();
});

describe("Testing verify user", () => {
  test("should test initiateReset mutation", async () => {
    const user = { email: "HarryPotter@gmail.com" };

    const res = await Verify.verifyUser(null, user);

    expect(res).toBeDefined();
  });
});
