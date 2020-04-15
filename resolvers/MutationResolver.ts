import bcrypt from "bcryptjs";
import { User } from "../models/Model";
import generateToken from "../token/generateToken";

async function signup(_parent: any, args: SignupValues): Promise<AuthResults> {
  try {
    const password: string = await bcrypt.hash(args.password, 12);
    const [user] = await User.add({ ...args, password });
    const token: string = await generateToken(user);

    return {
      token,
      user,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function login(_parent: any, args: LoginValues): Promise<AuthResults> {
  try {
    const user = await User.findBy({ email: args.email });

    // Return error if there are no users found
    if (!user) {
      throw new Error("No such user found");
    }
    const valid = await bcrypt.compare(args.password, user.password);

    // Return error if the password is incorrect
    if (!valid) {
      throw new Error("Password is incorrect");
    }
    const token: string = await generateToken(user);

    return {
      token,
      user,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const updateUser = async (_parent: any, args: UserValues) => {
  const user = await User.findBy({ id: args.id });
  if (!user) {
    throw new Error("No such user found");
  }

  const [updatedUser] = await User.update(args.id, args);

  return updatedUser;
};

export default {
  signup,
  login,
  updateUser,
};

interface SignupValues {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}

interface UserValues {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  company?: string;
  dev_experience?: number;
  dev_education?: number;
}

interface LoginValues {
  email: string;
  password: string;
}

interface AuthResults {
  token: string;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}
