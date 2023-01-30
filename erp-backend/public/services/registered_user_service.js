"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registered_user_1 = __importDefault(require("../models/registered_user"));
const createRegisteredUser = (req, res, next) => {
    const { email, name, photoUrl, companyId } = req.body;
    const regUser = new registered_user_1.default({
        email, name, photoUrl, companyId
    });
    return regUser.save().then((user) => res.status(201).json({ user }))
        .catch(err => res.status(500).json({ "error": err }));
};
const getRegisteredUser = (req, res, next) => {
    const id = req.params.id;
    return registered_user_1.default.findById(id)
        .then(user => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(404).json({ "message": "user not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const updateRegisteredUser = (req, res, next) => {
    const id = req.params.id;
    return registered_user_1.default.findById(id).then((user) => {
        if (user) {
            return user.set(req.body)
                .save().then((user) => res.status(201)
                .json({ user }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ "message": "user not found" });
        }
    }).catch(error => res.status(500).json({ error }));
};
const deleteRegisteredUser = (req, res, next) => {
    const id = req.params.id;
    return registered_user_1.default.findByIdAndDelete(id)
        .then(() => res.status(201).json({ success: true }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createRegisteredUser, getRegisteredUser, updateRegisteredUser, deleteRegisteredUser };
