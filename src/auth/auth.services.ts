import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

const signupUserService = async (payload: TUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }
 
};

const loginUserService = async () => {};

export const authServices = {
  signupUserService,
  loginUserService,
};
