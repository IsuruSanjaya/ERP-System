"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const purchase_order_service_1 = __importDefault(require("../services/purchase_order_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, purchase_order_service_1.default.getPurchaseOrders);
router.get("/:id", extractJWT_1.default, purchase_order_service_1.default.getPurchaseOrderById);
router.post("/create-purchase-order", purchase_order_service_1.default.createPurchaseOrder);
router.put("/update-purchase-order/:id", purchase_order_service_1.default.updatePurchaseOrder);
router.delete("/delete-purchase-order/:id", extractJWT_1.default, purchase_order_service_1.default.deletePurchaseOrder);
module.exports = router;
