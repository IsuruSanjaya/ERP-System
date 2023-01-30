"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const sales_order_service_1 = __importDefault(require("../services/sales_order_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, sales_order_service_1.default.getSalesOrders);
router.get("/:id", extractJWT_1.default, sales_order_service_1.default.getSalesOrderById);
router.post("/create-sales-order", sales_order_service_1.default.createSalesOrder);
router.put("/update-sales-order/:id", sales_order_service_1.default.updateSalesOrder);
router.delete("/delete-sales-order/:id", extractJWT_1.default, sales_order_service_1.default.deleteSalesOrder);
module.exports = router;
