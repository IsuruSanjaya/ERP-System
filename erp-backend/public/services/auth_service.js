"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const validateToken = (__req, __res, __next) => {
    return __res.status(200).json({
        message: 'User Authorized'
    });
};
const register = (__req, __res, __next) => {
    let { email, password } = __req.body;
    bcryptjs_1.default.hash(password, 10, (hasError, hash) => {
        if (hasError)
            return __res.status(500).json({
                message: hasError.message,
                error: hasError
            });
        let _user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            email,
            password: hash
        });
        return _user
            .save()
            .then((user) => {
            return __res.status(201).json({ user });
        })
            .catch((err) => {
            return __res.send(500).json({ message: `error ${err.message}` });
        });
    });
};
const login = (__req, __res, __next) => {
    let { email, password } = __req.body;
    user_1.default.find({ email }).exec((error, users) => {
        if (error)
            return __res
                .status(500)
                .json({ message: `login error ${error.message}` });
        if (users == null)
            return __res.status(400).json({ message: 'not found' });
        if (users.length !== 1) {
            return __res.status(401).json({ message: 'Unauthorized' });
        }
        bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
            if (error)
                return __res
                    .status(402)
                    .json({ message: `Unauthorized ${error.message}` });
            else if (result) {
                (0, signJWT_1.default)(users[0], (_error, token) => {
                    if (_error) {
                        return __res
                            .status(401)
                            .json({ message: `Unauthorized ${_error}` });
                    }
                    else if (token) {
                        return __res.status(200).json({
                            message: 'Auth succesfull',
                            token,
                        });
                    }
                });
            }
        });
    });
};
const getAllUsers = (__req, __res, __next) => {
    user_1.default.find()
        .select('-password')
        .exec()
        .then((users) => {
        return __res.status(200).json({
            users,
            count: users.length
        });
    })
        .catch((error) => {
        return __res.status(500).json(error);
    });
};
const test = (__req, __res) => {
    return __res.status(200).json({ message: 'worked' });
};
exports.default = { login, register, validateToken, test, getAllUsers };
