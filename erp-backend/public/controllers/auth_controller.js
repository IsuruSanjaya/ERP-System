"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const router = express_1.default.Router();
const auth_service_1 = __importDefault(require("../services/auth_service"));
router.get("/", auth_service_1.default.test);
router.get("/validate", extractJWT_1.default, auth_service_1.default.validateToken);
router.post("/register", auth_service_1.default.register);
router.post("/login", auth_service_1.default.login);
router.get("/get-all-users", extractJWT_1.default, auth_service_1.default.getAllUsers);
module.exports = router;
