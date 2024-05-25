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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../product/product.model");
const order_validate_1 = require("./order.validate");
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const validateData = order_validate_1.orderValidateSchema.safeParse(body);
        if (!validateData.success) {
            res.status(403).json({
                success: false,
                message: "Validation Error!",
                data: validateData.error.errors,
            });
        }
        else {
            //validated order data
            const orderData = validateData.data;
            //check if product exist or not
            const product = yield product_model_1.ProductModel.findById({ _id: orderData.productId });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found!",
                    data: null,
                });
            }
            else {
                //check if product has required quantity or not
                const existingQuantity = product.inventory.quantity;
                if (existingQuantity >= orderData.quantity) {
                    const data = yield order_service_1.orderServices.orderCreateIntoDb(orderData);
                    //update product quantity when product ordered
                    yield product_model_1.ProductModel.updateOne({ _id: orderData.productId }, {
                        $set: {
                            "inventory.quantity": existingQuantity - orderData.quantity,
                        },
                    });
                    res.status(200).json({
                        success: true,
                        message: "Order created successfully!",
                        data,
                    });
                }
                else {
                    //update stock availability to false on product
                    yield product_model_1.ProductModel.updateOne({ _id: orderData.productId }, {
                        $set: {
                            "inventory.inStock": false,
                        },
                    });
                    return res.status(409).json({
                        success: false,
                        message: "Insufficient quantity available in inventory",
                    });
                }
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
//  Retrieve all products
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email || "";
    const query = {
        email: { $regex: email },
    };
    try {
        const data = yield order_service_1.orderServices.fetchOrdersFromDb(query);
        //check if order exist or not
        if (!data) {
            res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        else {
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
            data: err,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
};
