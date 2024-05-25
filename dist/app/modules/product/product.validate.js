"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidateSchema = exports.inventoryValidateSchema = exports.variantValidateSchema = void 0;
const zod_1 = require("zod");
exports.variantValidateSchema = zod_1.z.object({
    type: zod_1.z.string({ message: "Product variant type must be string!" }),
    value: zod_1.z.string({ message: "Product variant value must be string!" }),
});
exports.inventoryValidateSchema = zod_1.z.object({
    quantity: zod_1.z.number({ message: "Product quantity must be number!" }),
    inStock: zod_1.z.boolean({
        message: "Product stock must be boolean!",
    }),
});
exports.productValidateSchema = zod_1.z
    .object({
    name: zod_1.z.string({ message: "Product name must be string!" }),
    description: zod_1.z.string(),
    price: zod_1.z.number({ message: "Product price must be number!" }),
    category: zod_1.z
        .string()
        .nonempty({ message: "Product Category must be string!" }),
    tags: zod_1.z.array(zod_1.z.string()).nonempty({
        message: "Tags cannot be empty!",
    }),
    variants: zod_1.z.array(exports.variantValidateSchema),
    inventory: exports.inventoryValidateSchema,
})
    .required();
