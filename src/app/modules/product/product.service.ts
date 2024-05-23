import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const fetchProductsFromDb = async () => {
  const data = await ProductModel.find({});
  return data;
};

const productCreateIntoDb = async (product: Product) => {
  console.log(product);
  const data = await ProductModel.create(product);

  return data;
};

export const productServices = {
  fetchProductsFromDb,
  productCreateIntoDb,
};
