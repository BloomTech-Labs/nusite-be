import "dotenv/config";
import { sign } from "jsonwebtoken";

const generateToken = (user: UserValues): string => {
  const payload: PayloadValue = {
    subject: user.id,
    username: user.username,
  };

  const secret: string = process.env.JWT_SECRET || "super-secret-token-secret";

  const options: { expiresIn: string } = {
    expiresIn: "1d",
  };

  return sign(payload, secret, options);
};

export default generateToken;

interface PayloadValue {
  subject: number;
  username: string;
}

interface UserValues {
  id: number;
  username: string;
}
