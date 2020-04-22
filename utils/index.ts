import { User } from "../models/Model";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";

export const checkUser = async (email: string) => {
  const user = await User.findBy({ email });

  if (!user) {
    throw new Error("No user with that email exits");
  }

  return user;
};

export const resetToken = async (email: string): Promise<string> => {
  // reset mutation will check token before the password is actually reset
  const token = await sign({ subject: email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

export const hashPassword = (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Please provide a new password");
  }

  const hashedPassword = hash(password, 12);

  return hashedPassword;
};
