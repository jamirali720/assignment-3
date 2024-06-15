import jwt from "jsonwebtoken";
import { IUser } from "../auth/auth.interface";

const createToken = (
  payload: Partial<IUser>,
  secretKey: string,
  expiresIn: string
) => {
  const tokenObject = {
    userId: payload._id,
    email: payload.email,
    role: payload.role,
  };
  return jwt.sign(tokenObject, secretKey, { expiresIn });
};

export default createToken;
