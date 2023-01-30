"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = __importDefault(require("../models/customer_model"));
const createcustomer = (req, res, next) => {
    const { name, nic, mobile, email, address, companyId, } = req.body;
    const customer = new customer_model_1.default({
        name,
        nic, mobile,
        email, address, companyId,
    });
    console.log(customer);
    return customer.save().then((customer) => res.status(201).json(customer)).catch(error => res.status(500).json({ error }));
};
const updatecustomer = (req, res, next) => {
    const id = req.params.id;
    return customer_model_1.default.findById(id).then((customer) => {
        if (customer) {
            return customer.set(req.body)
                .save().then((customer) => res.status(201)
                .json({ customer }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "customer not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const getcustomers = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    const query = { companyId: companyID };
    return customer_model_1.default
        .find(query).skip(page * page)
        .limit(offset)
        .then((customers) => res.status(200).json({ customers }))
        .catch(error => res.status(500).json({ error }));
};
const deletecustomer = (req, res, next) => {
    const id = req.params.id;
    return customer_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getcustomerById = (req, res, next) => {
    const id = req.params.id;
    return customer_model_1.default
        .findById(id)
        .then((customer) => {
        if (customer) {
            return res.status(200).json({
                customer
            });
        }
        else {
            return res.status(404).json({ "message": "customer not found" });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
exports.default = { createcustomer, updatecustomer, getcustomers, getcustomerById, deletecustomer };
