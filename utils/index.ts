import { User } from "../models/Model";

export const checkUser = async (email: string) => {
  const user = await User.findBy({ email });

  if (!user) {
    throw new Error("No user with that email exits");
  }

  return;
};
