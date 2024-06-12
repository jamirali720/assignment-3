import { Router } from "express";
import {runValidator} from "../middleware/runValidator";
import { userSignUpValidationSchema, userLoginValidationSchema } from "../auth/auth.zod.validation";
import { authentication } from "./auth.controller";


const authRouter = Router();
authRouter.route("/signup").post(runValidator(userSignUpValidationSchema), authentication.handleSignUpUser)
authRouter.route("/login").post(runValidator(userLoginValidationSchema), authentication.handleLoginUser)



export default authRouter;