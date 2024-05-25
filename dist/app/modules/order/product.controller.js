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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validate_1 = require("./product.validate");
const product_model_1 = require("./product.model");
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const validateData = product_validate_1.productValidateSchema.safeParse(body);
        if (!validateData.success) {
            res.status(403).json({
                success: false,
                message: "Validation Error!",
                data: validateData.error.errors,
            });
        }
        else {
            const data = yield product_service_1.productServices.productCreateIntoDb(validateData.data);
            res.status(200).json({
                success: true,
                message: "Product created successfully!",
                data,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
//  Retrieve all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const query = searchTerm || "";
    try {
        const data = yield product_service_1.productServices.fetchProductsFromDb(query);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
//  Retrieve a product by productId
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const data = yield product_service_1.productServices.fetchSingleProductFromDb(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
//  Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const body = req.body;
    try {
        //existing data on DB with this product ID
        const extData = yield product_model_1.ProductModel.findOne({ _id: productId });
        if (!extData) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
                data: null,
            });
        }
        else {
            //Full product data with existing data and updated data
            const productData = Object.assign(Object.assign({}, extData.toObject()), body);
            //validate product schema before update document
            const validateData = product_validate_1.productValidateSchema.safeParse(productData);
            if (!validateData.success) {
                res.status(403).json({
                    success: false,
                    message: "Validation Error!",
                    data: validateData.error.errors,
                });
            }
            else {
                const data = yield product_service_1.productServices.updateProductIntoDb(productId, validateData.data);
                res.status(200).json({
                    success: true,
                    message: "Products updated successfully!",
                    data,
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
// Delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const data = yield product_service_1.productServices.deleteProductFromDb(productId);
        if (!data.deletedCount) {
            res.status(400).json({
                success: false,
                message: "Error on deleting product!",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
