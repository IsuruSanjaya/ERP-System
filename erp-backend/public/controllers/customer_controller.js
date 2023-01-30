"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const customer_service_1 = __importDefault(require("../services/customer_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, customer_service_1.default.getcustomers);
router.get("/:id", extractJWT_1.default, customer_service_1.default.getcustomerById);
router.post("/create-customer", customer_service_1.default.createcustomer);
router.put("/update-customer/:id", customer_service_1.default.updatecustomer);
router.delete("/delete-customer/:id", extractJWT_1.default, customer_service_1.default.deletecustomer);
module.exports = router;
