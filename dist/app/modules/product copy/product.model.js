"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.productSchema = exports.inventorySchema = exports.variantSchema = void 0;
const mongoose_1 = require("mongoose");
exports.variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
exports.inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
});
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [
            {
                type: String,
                required: true,
            },
        ],
    },
    variants: [exports.variantSchema],
    inventory: exports.inventorySchema,
});
exports.ProductModel = (0, mongoose_1.model)("Product", exports.productSchema);
