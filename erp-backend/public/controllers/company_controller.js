"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const company_service_1 = __importDefault(require("../services/company_service"));
const router = express_1.default.Router();
router.get("/:id", extractJWT_1.default, company_service_1.default.getRegisteredcompany);
router.post("/", extractJWT_1.default, company_service_1.default.createRegisteredcompany);
router.put("/:id", extractJWT_1.default, company_service_1.default.updateRegisteredcompany);
router.delete("/:id", extractJWT_1.default, company_service_1.default.deleteRegisteredcompany);
module.exports = router;
