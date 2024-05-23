import { Request, Response } from "express";
import { productServices } from "./product.service";
import { productValidateSchema } from "./product.validate";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const validateData = productValidateSchema.safeParse(body);

    if (!validateData.success) {
      res.status(403).json({
        success: false,
        message: "Validation Error!",
        data: validateData.error.errors,
      });
    } else {
      const data = await productServices.productCreateIntoDb(validateData.data);

      res.status(200).json({
        success: true,
        message: "Product created successfully!",
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

//  Retrieve all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await productServices.fetchProductsFromDb();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

//  Retrieve a product by productId
const getSingleProduct = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: null,
  });
};

//  Update product
const updateProduct = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: null,
  });
};

// Delete product
const deleteProduct = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: null,
  });
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
