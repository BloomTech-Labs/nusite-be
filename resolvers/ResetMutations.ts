import { checkUser, resetToken, hashPassword } from "../utils";
import { sendgridEmail } from "../utils/sendgrid";
import { User } from "../models/Model";

async function initiateReset(_parent: any, args: { email: string }) {
  // Make sure the user exists
  const user = await checkUser(args.email);

  // Generate a token for the frontend to save
  const token = await resetToken(user.email);

  // call sendgrid component
  const message = await sendgridEmail(user.email);

  // return the token and a message for completion
  return {
    token,
    message,
  };
}

async function resetPassword(
  _parent: any,
  args: { email: string; password: string }
) {
  // checkUser returns the user
  const user = await checkUser(args.email);

  // hash the new password
  // hashPassword returns a promise
  const hashedPassword = await hashPassword(args.password);

  // Update the user password
  user.password = hashedPassword;
  await User.update(user.id, user);

  return "Password Updated";
}

export default { initiateReset, resetPassword };
