"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const extractJWT = (__req, __res, __next) => {
    console.log("extract jwt function");
    let token = __req.headers.authorization?.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.token.secret, (error, decoded) => {
            if (error) {
                return __res.status(404).json({
                    message: error,
                    error
                });
            }
            else {
                __res.locals.jwt = decoded;
                __next();
            }
        });
    }
    else {
        return __res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.default = extractJWT;
