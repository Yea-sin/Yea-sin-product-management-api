"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const productCreateIntoDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.ProductModel.create(product);
    return data;
});
const fetchProductsFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = { $regex: searchTerm };
    const query = {
        $or: [{ name: regex }, { description: regex }, { category: regex }],
    };
    const data = yield product_model_1.ProductModel.find(query);
    return data;
});
const fetchSingleProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.ProductModel.findOne({ _id: productId });
    return data;
});
const updateProductIntoDb = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findOneAndUpdate({ _id: productId }, data, { new: true, runValidators: true });
    return product;
});
const deleteProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.ProductModel.deleteOne({ _id: productId });
    return data;
});
exports.productServices = {
    fetchProductsFromDb,
    fetchSingleProductFromDb,
    productCreateIntoDb,
    updateProductIntoDb,
    deleteProductFromDb,
};
