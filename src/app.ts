import express from "express";
import cors from "cors";
import productRouter from "./app/modules/product/product.route";

const app = express();

app.use(express.json());
app.use(cors());

//middleware
app.use("/api/products/", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
