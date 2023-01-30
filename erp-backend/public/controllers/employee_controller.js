"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const employee_service_1 = __importDefault(require("../services/employee_service"));
const router = express_1.default.Router();
router.get("/:id/:offset/:page", extractJWT_1.default, employee_service_1.default.getemployees);
router.get("/:id", extractJWT_1.default, employee_service_1.default.getemployeeById);
router.post("/create-employee", employee_service_1.default.createemployee);
router.put("/update-employee/:id", employee_service_1.default.updateemployee);
router.delete("/delete-employee/:id", extractJWT_1.default, employee_service_1.default.deleteemployee);
module.exports = router;
