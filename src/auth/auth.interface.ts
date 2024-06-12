import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";
import { roles } from "../user/user.constraint";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>;
  comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export interface ILoginData {
  email: string;
  password: string;
}

export type TRoles = keyof typeof roles 

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload; // imported from jsonwebtoken;
    }
  }
}
