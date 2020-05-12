import bcrypt from "bcryptjs";
import { User } from "../models/Model";
import { Project } from "../models/Model";
import generateToken from "../token/generateToken";
import { sendgridVerify } from "../utils/sendgrid";

// Just for testing THIS WILL BE TEMPORARY AND REFACTORED
// TODO: REFACTOR RESOLVERS TO BE MORE ORGANIZED
import Reset from "./ResetMutations";
import Verify from "./VerifyResolver";

async function signup(_parent: any, args: SignupValues): Promise<AuthResults> {
  try {
    const password: string = await bcrypt.hash(args.password, 12);
    const [user] = await User.add({ ...args, password });
    const token: string = await generateToken(user);

    await sendgridVerify(user.email);

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

const addProject = async (_parent: any, args: ProjectValues) => {
  try {
    const [project] = await Project.add(args);
    return project;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProject = async (_parent: any, args: ProjectValues) => {
  try {
    const [project] = await Project.update(args.id, args);
    return project;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProject = async (_parent: any, args: ProjectValues) => {
  try {
    const project = await Project.findById(args.id);
    await Project.remove(args.id);
    return project;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  signup,
  login,
  updateUser,
  addProject,
  updateProject,
  deleteProject,
  ...Reset,
  ...Verify,
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
  dev_experience?: string;
  dev_education?: string;
}

interface ProjectValues {
  id: number;
  project_name?: string;
  project_owner?: number;
  project_developer?: number;
  completed?: boolean;
  marketplace?: boolean;
  showcase?: boolean;
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
