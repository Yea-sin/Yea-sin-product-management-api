import { Request, Response } from "express";

// Create a new product
const createProduct = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: null,
  });
};

//  Retrive all products
const getAllProducts = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: null,
  });
};

//  Retrive a product by productId
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
