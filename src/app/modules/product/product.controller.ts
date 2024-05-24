import { Request, Response } from "express";
import { productServices } from "./product.service";
import { productValidateSchema } from "./product.validate";
import { ProductModel } from "./product.model";
import { Product } from "./product.interface";

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
  const { searchTerm } = req.query;
  const query = searchTerm || "";

  try {
    const data = await productServices.fetchProductsFromDb(query as string);
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
const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const data = await productServices.fetchSingleProductFromDb(productId);
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

//  Update product
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const body = req.body;
  try {
    //existing data on DB with this product ID
    const extData = await ProductModel.findOne({ _id: productId });
    if (!extData) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
        data: null,
      });
    } else {
      //Full product data with existing data and updated data
      const productData: Product = { ...extData.toObject(), ...body };
      //validate product schema before update document
      const validateData = productValidateSchema.safeParse(productData);
      if (!validateData.success) {
        res.status(403).json({
          success: false,
          message: "Validation Error!",
          data: validateData.error.errors,
        });
      } else {
        const data = await productServices.updateProductIntoDb(
          productId,
          validateData.data
        );
        res.status(200).json({
          success: true,
          message: "Products updated successfully!",
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

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const data = await productServices.deleteProductFromDb(productId);
    if (!data.deletedCount) {
      res.status(400).json({
        success: false,
        message: "Error on deleting product!",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
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

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
