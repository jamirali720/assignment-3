import { z } from "zod";


export const bookingSchemaValidation = z.object({
    body: z.object({
        booking: z.object({        
            bikeId: z.string({required_error: "Bike id is required"}),
            startTime: z.string({required_error: "Start time is required"}),
            returnTime: z.string().optional(),
            totalPrice: z.number().default(0),
            isReturned: z.boolean().default(false),
        })
    })
})