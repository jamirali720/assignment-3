import { Bike } from "./bike.model";
import { TBike } from "./bike.interface";

const createBikeService = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
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
  const allowedUpdates = [
    "name",
    "description",
    "cc",
    "year",
    "model",
    "brand",
  ];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdates.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }
  const result = await Bike.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
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
