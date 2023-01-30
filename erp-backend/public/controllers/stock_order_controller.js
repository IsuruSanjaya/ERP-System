"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const stock_order_service_1 = __importDefault(require("../services/stock_order_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, stock_order_service_1.default.getStockOrders);
router.get("/:id", extractJWT_1.default, stock_order_service_1.default.getStockOrderById);
router.post("/", stock_order_service_1.default.createStockOrder);
router.put("/:id", stock_order_service_1.default.updateStockOrder);
router.delete("/:id", extractJWT_1.default, stock_order_service_1.default.deleteStockOrder);
module.exports = router;
