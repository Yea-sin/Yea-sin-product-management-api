import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { ProductModel } from "../product/product.model";
import { orderValidateSchema } from "./order.validate";

// Create a new order
const createOrder = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const validateData = orderValidateSchema.safeParse(body);

    if (!validateData.success) {
      res.status(403).json({
        success: false,
        message: "Validation Error!",
        data: validateData.error.errors,
      });
    } else {
      const orderData = validateData.data;
      //check if product exist or not
      const product = await ProductModel.findById({ _id: orderData.productId });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
          data: null,
        });
      } else {
        const data = await orderServices.orderCreateIntoDb(orderData);

        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          data,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error",
      data: err,
    });
  }
};

//  Retrieve all products
const getAllOrders = async (req: Request, res: Response) => {
  const email: string = (req.query.email as string) || "";

  const query = {
    email: { $regex: email },
  };
  try {
    const data = await orderServices.fetchOrdersFromDb(query);

    const isSearched = email && data;
    const message = isSearched
      ? "Orders fetched successfully for user email!"
      : "Orders fetched successfully!";
    res.status(200).json({
      success: true,
      message: message,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error",
      data: err,
    });
  }
};

export const productController = {
  createOrder,
  getAllOrders,
};
