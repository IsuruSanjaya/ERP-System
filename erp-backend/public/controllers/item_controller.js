"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const item_service_1 = __importDefault(require("../services/item_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, item_service_1.default.getitems);
router.get("/:id", extractJWT_1.default, item_service_1.default.getitemById);
router.post("/", item_service_1.default.createitem);
router.put("/:id", item_service_1.default.updateitem);
router.delete("/:id", extractJWT_1.default, item_service_1.default.deleteitem);
module.exports = router;
