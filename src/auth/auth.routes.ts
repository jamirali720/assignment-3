import { Router } from "express";
import {runValidator} from "../middleware/runValidator";
import { userSignUpValidationSchema, userLoginValidationSchema } from "../user/user.zod.validation";
import { authentication } from "./auth.controller";


const authRouter = Router();
authRouter.route("/auth/signup").post(runValidator(userSignUpValidationSchema), authentication.handleSignUpUser)
authRouter.route("/auth/login").post(runValidator(userLoginValidationSchema), authentication.handleLoginUser)



export default authRouter;