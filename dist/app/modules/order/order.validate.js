"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidateSchema = void 0;
const zod_1 = require("zod");
exports.orderValidateSchema = zod_1.z
    .object({
    email: zod_1.z.string({ message: "email must be string" }).email({
        message: "Email format is not valid!",
    }),
    productId: zod_1.z.string({ message: "email must be string" }),
    price: zod_1.z
        .number({
        message: "Price must be a number",
    })
        .min(1, {
        message: "Price value should be minimum 1 character",
    }),
    quantity: zod_1.z.number({ message: "Quantity must be a number" }).min(1, {
        message: "Quantity should be minimum 1",
    }),
})
    .required();
