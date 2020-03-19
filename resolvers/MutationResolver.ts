import bcrypt from "bcryptjs";
import { User } from "../models/Model";
import generateToken from "../token/generateToken";

async function signup(_parent: any, args: SignupValues) {
  try {
    const password: string = await bcrypt.hash(args.password, 12);
    const [user] = await User.add({ ...args, password });
    const token: string = await generateToken(user);

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error(error);
  }
}

interface SignupValues {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
