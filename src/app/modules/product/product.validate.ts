import { z } from "zod";

export const variantValidateSchema = z.object({
  type: z.string({ message: "Product variant type must be string!" }),
  value: z.string({ message: "Product variant value must be string!" }),
});

export const inventoryValidateSchema = z.object({
  quantity: z.number({ message: "Product quantity must be number!" }),
  inStock: z.boolean({
    message: "Product stock must be boolean!",
  }),
});

export const productValidateSchema = z
  .object({
    name: z.string({ message: "Product name must be string!" }),
    description: z.string(),
    price: z.number({ message: "Product price must be number!" }),
    category: z
      .string()
      .nonempty({ message: "Product Category must be string!" }),
    tags: z.array(z.string()).nonempty({
      message: "Tags cannot be empty!",
    }),
    variants: z.array(variantValidateSchema),
    inventory: inventoryValidateSchema,
  })
  .required();
