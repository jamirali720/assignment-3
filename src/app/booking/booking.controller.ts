import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { bookingServices } from "./booking.services";

const handleCreateRental = catchAsync(async(req, res) => {  
    const result  = await bookingServices.createRentalService(req.user, req.body.booking);
    successResponse(res, {
        success:true, 
        statusCode: 201, 
        message: "Rental created successfully", 
        data: result
    })
})
const handleReturnRental = catchAsync(async(req, res) => {
    const result  = await bookingServices.returnBikeService(req.params.id);
    successResponse(res, {
        success:true, 
        statusCode: 201, 
        message: "Rental Returned successfully", 
        data: result
    })
})
const handleGetAllRentals = catchAsync(async(req, res) => {
    const result  = await bookingServices.getAllRentalService(req.user.userId);
    successResponse(res, {
        success:true, 
        statusCode: 201, 
        message: "Rentals retrieved successfully", 
        data: result
    })
})


export const rentalController = {
    handleCreateRental, 
    handleReturnRental, 
    handleGetAllRentals
}