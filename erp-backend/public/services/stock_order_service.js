"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_order_model_1 = __importDefault(require("../models/stock_order_model"));
const createStockOrder = (req, res, next) => {
    const { name, price, manufacturer, orderqty } = req.body;
    const StockOrder = new stock_order_model_1.default({
        name,
        price,
        manufacturer,
        orderqty,
    });
    return StockOrder.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }));
};
const updateStockOrder = (req, res, next) => {
    const id = req.params.id;
    return stock_order_model_1.default.findById(id).then((order) => {
        if (order) {
            return order.set(req.body)
                .save().then((order) => res.status(201)
                .json({ order }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "order not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const getStockOrders = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    const query = { companyId: companyID };
    return stock_order_model_1.default
        .find(query).skip(page * page)
        .limit(offset)
        .then((orders) => res.status(200).json({ orders }))
        .catch(error => res.status(500).json({ error }));
};
const deleteStockOrder = (req, res, next) => {
    const id = req.params.id;
    return stock_order_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getStockOrderById = (req, res, next) => {
    const id = req.params.id;
    return stock_order_model_1.default
        .findById(id)
        .then((order) => {
        if (order) {
            return res.status(200).json({
                order
            });
        }
        else {
            return res.status(404).json({ "message": "order not found" });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
exports.default = { createStockOrder, updateStockOrder, getStockOrders, getStockOrderById, deleteStockOrder };
