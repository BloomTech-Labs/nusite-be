import { sign } from "jsonwebtoken";
import { checkUser } from "../utils";
import { sendgridEmail } from "../utils/sendgrid";

async function initiateReset(_parent: any, args: { email: string }) {
  // Make sure the user exists
  await checkUser(args.email);

  // Generate a token for the frontend to save
  // reset mutation will check token before the password is actually reset
  const token = sign({ subject: args.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  // call sendgrid component
  await sendgridEmail(args.email);

  // return the token and a message for completion
  return {
    token,
    message: "Please check your email",
  };
}

export default { initiateReset };
