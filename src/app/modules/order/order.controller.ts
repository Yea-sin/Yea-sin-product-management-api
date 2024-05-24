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
      //validated order data
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
        //check if product has required quantity or not
        const existingQuantity = product.inventory.quantity;
        if (existingQuantity >= orderData.quantity) {
          const data = await orderServices.orderCreateIntoDb(orderData);
          //update product quantity when product ordered
          await ProductModel.updateOne(
            { _id: orderData.productId },
            {
              $set: {
                "inventory.quantity": existingQuantity - orderData.quantity,
              },
            }
          );

          res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data,
          });
        } else {
          //update stock availability to false on product
          await ProductModel.updateOne(
            { _id: orderData.productId },
            {
              $set: {
                "inventory.inStock": false,
              },
            }
          );
          return res.status(409).json({
            success: false,
            message: "Insufficient quantity available in inventory",
          });
        }
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

    //check if order exist or not
    if (!data) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      //check if searched data available or not
      const isSearched = email && data;

      //check if data fetched by search or not. and conditionally set success message
      const message = isSearched
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!";
      res.status(200).json({
        success: true,
        message: message,
        data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error",
      data: err,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
