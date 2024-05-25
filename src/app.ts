import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import productRouter from "./app/modules/product/product.route";
import orderRouter from "./app/modules/order/order.route";

const app = express();

app.use(express.json());
app.use(cors());

// middleware
app.use("/api/products/", productRouter);
app.use("/api/orders/", orderRouter);

// Handle unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
