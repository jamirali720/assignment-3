import { ErrorHandler } from "../utils/error";
import { User } from "../user/user.model";
import { IUser } from "./auth.interface";
import configs from "../configs";
import createToken from "../utils/generateToken";
import { ILoginData } from "./auth.interface";
import httpStatus from "http-status";

const signupUserService = async (payload: IUser) => {
  let result = await User.create(payload);  
  return result;
};

const loginUserService = async (payload: ILoginData) => {
  const { email, password } = payload;
  const user = await User.isUserExists(email);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User dose not exist");
  }
  const isPasswordMatched = await User.comparePassword(password, user.password);
  if (!isPasswordMatched) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Password not matched");
  }

  const accessToken = createToken(
    user,
    configs.jwtAccessTokenSecretKey as string,
    configs.jwtAccessTokenExpiration as string
  );

  return {
    user,
    accessToken,
  };
};

export const authServices = {
  signupUserService,
  loginUserService,
};
