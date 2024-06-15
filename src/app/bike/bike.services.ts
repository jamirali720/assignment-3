import { Bike } from "./bike.model";
import { TBike } from "./bike.interface";
import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";

const createBikeService = async (payload: TBike) => {
  const newBike = await Bike.create(payload);
  if(!newBike){
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to create  new bike")
  }
  return newBike;
};
const getAllBikesService = async () => {
  const result = await Bike.find(); 

  return result;
};
const updateBikeService = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = [
    "name",
    "description",
    "cc",
    "year",
    "model",
    "brand",
  ];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }
  const result = await Bike.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if(!result){
    throw new ErrorHandler(httpStatus.BAD_REQUEST, " Bike not found and update failed")
  }
  return result;
};
const deleteBikeService = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(id, {isAvailable: false}, {new :true, runValidators: true});
  return result;
};

export const bikeServices = {
  createBikeService,
  getAllBikesService,
  updateBikeService,
  deleteBikeService,
};
