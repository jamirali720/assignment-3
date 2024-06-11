import catchAsync from "../helper/higherOrderFunction";
import { successResponse } from "../helper/success";
import { authServices } from "./auth.services";

class AuthController {
  handleSignUpUser = catchAsync(async (req, res) => {
    const result = await authServices.signupUserService(req.body);
    successResponse(res, {
      success: true,
      statusCode: 201,
      message: "You have successfully signed up",
      payload: result,
    });
  });
  handleLoginUser = catchAsync(async (req, res) => {
    const result = await authServices.signupUserService(req.body);
    successResponse(res, {
      success: true,
      statusCode: 201,
      message: "You have logged in successfully",
      payload: result,
    });
  });
}


export const authentication  = new AuthController();