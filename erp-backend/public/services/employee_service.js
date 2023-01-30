"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_model_1 = __importDefault(require("../models/employee_model"));
const createemployee = (req, res, next) => {
    const { name, nic, age, salary, role, address, contactNumber, } = req.body;
    const employee = new employee_model_1.default({
        name,
        nic,
        age,
        salary,
        role,
        address,
        contactNumber,
    });
    return employee.save().then((employee) => res.status(201).json(employee)).catch(error => res.status(500).json({ error }));
};
const updateemployee = (req, res, next) => {
    const id = req.params.id;
    return employee_model_1.default.findById(id).then((employee) => {
        if (employee) {
            return employee.set(req.body)
                .save().then((employee) => res.status(201)
                .json({ employee }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "employee not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const getemployees = (req, res, next) => {
    const companyID = req.params.id;
    const offset = parseInt(req.params.offset);
    const page = parseInt(req.params.page);
    return employee_model_1.default.find({}).skip(page * page)
        .limit(offset)
        .then((employees) => res.status(200).json({ employees }))
        .catch(error => res.status(500).json({ error }));
};
const deleteemployee = (req, res, next) => {
    const id = req.params.id;
    return employee_model_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
const getemployeeById = (req, res, next) => {
    const id = req.params.id;
    return employee_model_1.default
        .findById(id)
        .then((employee) => {
        if (employee) {
            return res.status(200).json({
                employee
            });
        }
        else {
            return res.status(404).json({ "message": "employee not found" });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
exports.default = { createemployee, updateemployee, getemployees, getemployeeById, deleteemployee };
