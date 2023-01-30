"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchase_request_order_model_1 = __importDefault(require("../models/purchase_request_order_model"));
const createPurchaseRequest = (req, res, next) => {
    const { requestId, itemId, quantity, itemPrice, requestTo, requestToId } = req.body;
    const PurchaseRequest = new purchase_request_order_model_1.default({
        requestId, itemId, quantity, itemPrice, requestTo, requestToId
    });
    return PurchaseRequest.save().then((order) => res.status(201).json(order)).catch(error => res.status(500).json({ error }));
};
const updatePurchaseRequest = (req, res, next) => {
    const id = req.params.id;
    return purchase_request_order_model_1.default.findById(id).then((order) => {
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
const getPurchaseRequests = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    const query = { companyId: companyID };
    return purchase_request_order_model_1.default
        .find(query).skip(page * page)
        .limit(offset)
        .then((orders) => res.status(200).json({ orders }))
        .catch(error => res.status(500).json({ error }));
};
const deletePurchaseRequest = (req, res, next) => {
    const id = req.params.id;
    return purchase_request_order_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getPurchaseRequestById = (req, res, next) => {
    const id = req.params.id;
    return purchase_request_order_model_1.default
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
exports.default = { createPurchaseRequest, updatePurchaseRequest, getPurchaseRequests, getPurchaseRequestById, deletePurchaseRequest };
