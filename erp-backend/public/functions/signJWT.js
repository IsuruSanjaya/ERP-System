"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signJWT = (user, callback) => {
    var timeSinchEpoch = new Date().getTime();
    var expireTime = timeSinchEpoch + Number(config_1.default.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expireTime / 1000);
    console.log('Attemp to signin token fro ' + user.email);
    try {
        jsonwebtoken_1.default.sign({
            email: user.email
        }, config_1.default.token.secret, {
            issuer: config_1.default.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (err) {
        console.log("sign jwt failed " + err);
        callback(Error(`${err}`), null);
    }
};
exports.default = signJWT;
