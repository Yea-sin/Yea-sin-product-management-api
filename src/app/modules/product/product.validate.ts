import { z } from "zod";

export const variantValidateSchema = z.object({
  type: z.string({ message: "Product variant type is required!" }),
  value: z.string({ message: "Product variant value is required!" }),
});

export const inventoryValidateSchema = z.object({
  quantity: z.number({ message: "Product quantity is required!" }),
  inStock: z.boolean({
    message: "Product stock availability is required!",
  }),
});

export const productValidateSchema = z
  .object({
    name: z.string({ message: "Product name is required!" }),
    description: z.string(),
    price: z.number({ message: "Product price is required!" }),
    category: z.string().nonempty({ message: "Product Category is required!" }),
    tags: z.array(z.string()).nonempty({
      message: "Tags cannot be empty!",
    }),
    variants: z.array(variantValidateSchema),
    inventory: inventoryValidateSchema,
  })
  .required();
