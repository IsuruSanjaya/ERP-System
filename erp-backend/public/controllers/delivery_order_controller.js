"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const delivery_order_service_1 = __importDefault(require("../services/delivery_order_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, delivery_order_service_1.default.getDeliveryOrders);
router.get("/:id", extractJWT_1.default, delivery_order_service_1.default.getDeliveryOrderById);
router.post("/create-delivery-order", delivery_order_service_1.default.createDeliveryOrder);
router.put("/update-delivery-order/:id", delivery_order_service_1.default.updateDeliveryOrder);
router.delete("/delete-delivery-order/:id", extractJWT_1.default, delivery_order_service_1.default.deleteDeliveryOrder);
module.exports = router;
