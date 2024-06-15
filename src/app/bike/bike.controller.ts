import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { bikeServices } from "./bike.services";

const handleCreateBike = catchAsync(async (req, res) => {
  const result = await bikeServices.createBikeService(req.body.bike);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Bike added successfully",
    data: result,
  });
});
const handleGetAllBikes = catchAsync(async (req, res) => {
  const result = await bikeServices.getAllBikesService();
  console.log(result);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
    data: result,
  });
});
const handleUpdateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bikeServices.updateBikeService(id, req.body.bike);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Bike updated successfully",
    data: result,
  });
});
const handleDeleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bikeServices.deleteBikeService(id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: result === null ? "No Data Found" : "Bike deleted successfully",
    data: result,
  });
});

export const bikeController = {
  handleCreateBike,
  handleGetAllBikes,
  handleUpdateBike,
  handleDeleteBike,
};
