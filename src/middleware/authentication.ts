import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/higherOrderFunction";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorHandler } from "../utils/error";
import configs from "../app/configs";
import { TRoles } from "../auth/auth.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";

export const isAuthenticated = (...roles: TRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers?.authorization?.split("Bearer ")[1];

    if (!token) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        "You are un-authenticated. Please Login first"
      );
    }

    const decoded = jwt.verify(
      token,
      configs.jwtAccessTokenSecretKey as string
    ) as JwtPayload;

console.log(decoded)

    if (!decoded) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        "You are un-authorized or your token has been expired. Please Login first "
      );
    }

    const { userId , role} = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found");
    }

    if(roles && !roles.includes(role)){
      throw new ErrorHandler(httpStatus.FORBIDDEN, "You are not allowed to access these resource");
    }

    req.user = decoded;
    next();
  });
};
