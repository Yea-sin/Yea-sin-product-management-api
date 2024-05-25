"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidateSchema = exports.inventoryValidateSchema = exports.variantValidateSchema = void 0;
const zod_1 = require("zod");
exports.variantValidateSchema = zod_1.z.object({
    type: zod_1.z.string({ message: "Product variant type is required!" }),
    value: zod_1.z.string({ message: "Product variant value is required!" }),
});
exports.inventoryValidateSchema = zod_1.z.object({
    quantity: zod_1.z.number({ message: "Product quantity is required!" }),
    inStock: zod_1.z.boolean({
        message: "Product stock availability is required!",
    }),
});
exports.productValidateSchema = zod_1.z
    .object({
    name: zod_1.z.string({ message: "Product name is required!" }),
    description: zod_1.z.string(),
    price: zod_1.z.number({ message: "Product price is required!" }),
    category: zod_1.z.string().nonempty({ message: "Product Category is required!" }),
    tags: zod_1.z.array(zod_1.z.string()).nonempty({
        message: "Tags cannot be empty!",
    }),
    variants: zod_1.z.array(exports.variantValidateSchema),
    inventory: exports.inventoryValidateSchema,
})
    .required();
