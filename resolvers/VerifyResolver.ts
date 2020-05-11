import { checkUser } from "../utils";
import generateToken from "../token/generateToken";
import { User } from "../models/Model";

async function verifyUser(_parent: any, args: { email: string }) {
  // Make sure the user exists
  const user = await checkUser(args.email);

  // Generate a token for the frontend to save
  const token = await generateToken({ id: user.id, username: user.username });

  await User.update(user.id, { verified: true });

  // return the token and a message for completion
  return token;
}

export default { verifyUser };
