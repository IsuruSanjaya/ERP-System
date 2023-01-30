"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_order_model_1 = __importDefault(require("../models/delivery_order_model"));
const createDeliveryOrder = (req, res, next) => {
    const { date, transactionDate, transactionType, coustomer, shippingAddress, totalBill, status, companyId, customerType } = req.body;
    const deliveryOrder = new delivery_order_model_1.default({
        date, transactionDate, transactionType, coustomer, shippingAddress, totalBill, status, companyId, customerType
    });
    return deliveryOrder.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }));
};
const updateDeliveryOrder = (req, res, next) => {
    const id = req.params.id;
    return delivery_order_model_1.default.findById(id).then((order) => {
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
const getDeliveryOrders = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    const query = { companyId: companyID };
    return delivery_order_model_1.default
        .find(query).skip(page * page)
        .limit(offset)
        .then((orders) => res.status(200).json({ orders }))
        .catch(error => res.status(500).json({ error }));
};
const deleteDeliveryOrder = (req, res, next) => {
    const id = req.params.id;
    return delivery_order_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getDeliveryOrderById = (req, res, next) => {
    const id = req.params.id;
    return delivery_order_model_1.default
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
exports.default = { createDeliveryOrder, updateDeliveryOrder, getDeliveryOrders, getDeliveryOrderById, deleteDeliveryOrder };
