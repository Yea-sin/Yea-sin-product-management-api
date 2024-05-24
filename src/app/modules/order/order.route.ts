import express from "express";
import { orderController } from "./order.controller";

const orderRouter = express.Router();

// Insert a Order
orderRouter.post("/", orderController.createOrder);

// Retrieve all products
orderRouter.get("/", orderController.getAllOrders);

export default orderRouter;
