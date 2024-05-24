import express from "express";
import { productController } from "./order.controller";

const orderRouter = express.Router();

// Insert a Order
orderRouter.post("/", productController.createOrder);

// Retrieve all products
orderRouter.get("/", productController.getAllOrders);

export default orderRouter;
