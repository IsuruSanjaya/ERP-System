"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_model_1 = __importDefault(require("../models/item_model"));
const createitem = (req, res, next) => {
    const { name, inStock, manufacturer, companyId, supplier, price } = req.body;
    const item = new item_model_1.default({
        name,
        inStock,
        manufacturer,
        companyId,
        supplier,
        price
    });
    return item.save().then((item) => res.status(201).json(item)).catch(error => res.status(500).json({ error }));
};
const updateitem = (req, res, next) => {
    const id = req.params.id;
    return item_model_1.default.findById(id).then((item) => {
        if (item) {
            return item.set(req.body)
                .save().then((item) => res.status(201)
                .json({ item }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "item not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const getitems = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    const query = { companyId: companyID };
    return item_model_1.default
        .find(query).skip(page * page)
        .limit(offset)
        .then((items) => res.status(200).json({ items }))
        .catch(error => res.status(500).json({ error }));
};
const deleteitem = (req, res, next) => {
    const id = req.params.id;
    return item_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getitemById = (req, res, next) => {
    const id = req.params.id;
    return item_model_1.default
        .findById(id)
        .then((item) => {
        if (item) {
            return res.status(200).json({
                item
            });
        }
        else {
            return res.status(404).json({ "message": "item not found" });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
exports.default = { createitem, updateitem, getitems, getitemById, deleteitem };
