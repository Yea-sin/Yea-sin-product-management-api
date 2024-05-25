"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
// Insert a product
productRouter.post("/", product_controller_1.productController.createProduct);
// Retrieve all products
productRouter.get("/", product_controller_1.productController.getAllProducts);
// Retrieve a single product
productRouter.get("/:productId", product_controller_1.productController.getSingleProduct);
// Update a product
productRouter.put("/:productId", product_controller_1.productController.updateProduct);
// Delete a product
productRouter.delete("/:productId", product_controller_1.productController.deleteProduct);
exports.default = productRouter;
