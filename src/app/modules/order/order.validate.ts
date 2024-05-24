import { z } from "zod";

export const orderValidateSchema = z
  .object({
    email: z.string({ message: "email must be string" }).email({
      message: "Email format is not valid!",
    }),
    productId: z.string({ message: "email must be string" }),
    price: z
      .number({
        message: "Price must be a number",
      })
      .min(1, {
        message: "Price value should be minimum 1 character",
      }),
    quantity: z.number({ message: "Quantity must be a number" }).min(1, {
      message: "Quantity should be minimum 1",
    }),
  })
  .required();
