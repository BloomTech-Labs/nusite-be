import { checkUser, resetToken, hashPassword } from "../index";
import { sendgridEmail } from "../sendgrid";

const email = "HarryPotter@gmail.com";

describe("tests for added utils", () => {
  test("should test checkUser function", async () => {
    const res = await checkUser(email);

    expect(res.email).toMatch(email);
  });

  test("should test resetToken function", async () => {
    const res = await resetToken(email);

    expect(res).toBeDefined();
  });

  test("should test hashPassword function", async () => {
    const password = "test-password";

    const res = await hashPassword(password);

    expect(res).toBeDefined();
    expect(res).not.toBe(password);
  });

  test("should test sendgrid function", async () => {
    const res = await sendgridEmail(email);
    expect(res).toMatch(/Please check your email/i);
  });
});
