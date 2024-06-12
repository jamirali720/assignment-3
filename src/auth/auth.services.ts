import { ErrorHandler } from "../utils/error";
import { User } from "../user/user.model";
import { IUser } from "./auth.interface";
import configs from "../app/configs";
import createToken from "../utils/generateToken";
import { ILoginData } from "./auth.interface";

const signupUserService = async (payload: IUser) => {
  let result = await User.create(payload);
  return result;
};

const loginUserService = async (payload: ILoginData) => {
  const { email, password } = payload;
  const user = await User.isUserExists(email);
  if (!user) {
    throw new ErrorHandler(404, "User dose not exist");
  }
  const isPasswordMatched = await User.comparePassword(password, user.password);
  if (!isPasswordMatched) {
    throw new ErrorHandler(409, "Password not matched");
  }

  // const tokenOptions = {
  //   userId: user._id,
  //   email: user.email,
  //   role: user.role,
  // };

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
