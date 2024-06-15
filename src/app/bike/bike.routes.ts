import { Router } from "express";

import { isAuthenticated } from "../middleware/authentication";

import { runValidator } from "../middleware/runValidator";
import { bikeController } from "./bike.controller";
import { roles } from "../user/user.constraint";
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from "./bike.zod.validation";

const bikeRouter = Router();

bikeRouter
  .route("/")
  .post(
    isAuthenticated(roles.admin),
    runValidator(createBikeValidationSchema),
    bikeController.handleCreateBike
  );
bikeRouter.route("/").get(bikeController.handleGetAllBikes);

bikeRouter
  .route("/:id")
  .put(
    isAuthenticated(roles.admin),
    runValidator(updateBikeValidationSchema),
    bikeController.handleUpdateBike
  );


bikeRouter
  .route("/:id")
  .delete(isAuthenticated(roles.admin), bikeController.handleDeleteBike);

export default bikeRouter;
