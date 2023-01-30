"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const purchase_request_service_1 = __importDefault(require("../services/purchase_request_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, purchase_request_service_1.default.getPurchaseRequests);
router.get("/:id", extractJWT_1.default, purchase_request_service_1.default.getPurchaseRequestById);
router.post("/", purchase_request_service_1.default.createPurchaseRequest);
router.put("/:id", purchase_request_service_1.default.updatePurchaseRequest);
router.delete("/:id", extractJWT_1.default, purchase_request_service_1.default.deletePurchaseRequest);
module.exports = router;
