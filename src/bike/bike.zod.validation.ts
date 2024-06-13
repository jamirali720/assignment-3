import { z } from "zod"



export const createBikeValidationSchema = z.object({
   body: z.object({
      bike: z.object({
         name: z.string({required_error: "Name is required", invalid_type_error: "Name must be string"}),
         description: z.string({required_error: "Description is required", invalid_type_error: "Description must be string"}),
         pricePerHour: z.number({required_error: "Price per hour is required", invalid_type_error: "Price per hour must be string"}),
         isAvailable: z.boolean().default(true),
         cc: z.number({required_error: "Cc is required", invalid_type_error: "Cc must be number"}),
         year: z.number({required_error: "Year is required", invalid_type_error: "Year must be number"}),
         model: z.string({required_error: "Model is required", invalid_type_error: "Model must be string"}),
         brand: z.string({required_error: "Brand is required", invalid_type_error: "Brand must be string"}),
      })
   })
})


export const updateBikeValidationSchema = z.object({
   body: z.object({
      bike: z.object({
         name: z.string().optional(),
         description: z.string().optional(),
         pricePerHour: z.number().optional(),
         isAvailable: z.boolean().default(true).optional(),
         cc: z.number().optional(),
         year: z.number().optional(),
         model: z.string().optional(),
         brand: z.string().optional(),
      })
   })
})