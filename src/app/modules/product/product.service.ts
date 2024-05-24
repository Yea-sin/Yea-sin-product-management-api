import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const productCreateIntoDb = async (product: Product) => {
  const data = await ProductModel.create(product);
  return data;
};

const fetchProductsFromDb = async () => {
  const data = await ProductModel.find({});
  return data;
};

const fetchSingleProductFromDb = async (productId: string) => {
  const data = await ProductModel.findOne({ _id: productId });
  return data;
};

const updateProductIntoDb = async (productId: string, data: Product) => {
  const product = await ProductModel.findOneAndUpdate(
    { _id: productId },
    data,
    { new: true, runValidators: true }
  );
  return product;
};

const deleteProductFromDb = async (productId: string) => {
  const data = await ProductModel.deleteOne({ _id: productId });
  return data;
};

export const productServices = {
  fetchProductsFromDb,
  fetchSingleProductFromDb,
  productCreateIntoDb,
  updateProductIntoDb,
  deleteProductFromDb,
};
