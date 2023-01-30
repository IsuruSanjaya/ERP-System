"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const registered_user_service_1 = __importDefault(require("../services/registered_user_service"));
const router = express_1.default.Router();
router.get("/:id", extractJWT_1.default, registered_user_service_1.default.getRegisteredUser);
router.post("/", extractJWT_1.default, registered_user_service_1.default.createRegisteredUser);
router.put("/:id", extractJWT_1.default, registered_user_service_1.default.updateRegisteredUser);
router.delete("/:id", extractJWT_1.default, registered_user_service_1.default.updateRegisteredUser);
module.exports = router;
