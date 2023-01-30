"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_model_1 = __importDefault(require("../models/company_model"));
const createRegisteredcompany = (req, res, next) => {
    const { name, location } = req.body;
    const company = new company_model_1.default({
        name, location
    });
    return company.save().then((company) => res.status(201).json({ company }))
        .catch(err => res.status(500).json({ "error": err }));
};
const getRegisteredcompany = (req, res, next) => {
    const id = req.params.id;
    return company_model_1.default.findById(id)
        .then(company => {
        if (company) {
            return res.status(200).json({ company });
        }
        else {
            return res.status(404).json({ "message": "company not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const updateRegisteredcompany = (req, res, next) => {
    const id = req.params.id;
    return company_model_1.default.findById(id).then((company) => {
        if (company) {
            return company.set(req.body)
                .save().then((company) => res.status(201)
                .json({ company }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "company not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const deleteRegisteredcompany = (req, res, next) => {
    const id = req.params.id;
    return company_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createRegisteredcompany, getRegisteredcompany, updateRegisteredcompany, deleteRegisteredcompany };
