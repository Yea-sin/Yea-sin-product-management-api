import express from "express";
import { productController } from "./product.controller";

const productRouter = express.Router();

// Insert a product
productRouter.post("/", productController.createProduct);

// Retrive all products
productRouter.get("/", productController.getAllProducts);

// Retrive a single product
productRouter.get("/:productId", productController.getSingleProduct);

// Update a product
productRouter.put("/:productId", productController.updateProduct);

// Deleter a product
productRouter.delete("/:productId", productController.deleteProduct);

export default productRouter;
