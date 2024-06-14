import { z } from "zod";
import { role } from "../user/user.constraint";


export const userSignUpValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be string",
      }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email({message: "Provided email is INVALID"}),
      password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      }).min(6, {message: "Password must be at least 6 characters"}),
      phone: z.string().startsWith("0").refine((val) => val.length === 11, {
        message: "Phone number must be 11 digits",
      }), // check if the phone number is 11 digits.
      address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be string",
      }),
      role: z.enum([...role] as [string, ...string[]]).default("user"),
    }),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    user: z.object({      
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        })
        .email({message: "Provided email is INVALID"}),
      password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      }).min(6, {message: "Password must be at least 6 characters"}),
     
    }),
  }),
});
