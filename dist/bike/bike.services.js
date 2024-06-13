"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeServices = void 0;
const bike_model_1 = require("./bike.model");
const createBikeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.create(payload);
    return result;
});
const getAllBikesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.find();
    return result;
});
const updateBikeService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
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
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBikeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, { isAvailable: false }, { new: true, runValidators: true });
    return result;
});
exports.bikeServices = {
    createBikeService,
    getAllBikesService,
    updateBikeService,
    deleteBikeService,
};
