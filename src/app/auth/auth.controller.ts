import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { authServices } from "./auth.services";

export const handleSignUpUser = catchAsync(async (req, res) => {
  const result = await authServices.signupUserService(req.body);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const handleLoginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserService(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "User logged in successfully",
    token: result.token,
    data: result.user,
  })
});

export const authentication = {
  handleSignUpUser,
  handleLoginUser,
};
