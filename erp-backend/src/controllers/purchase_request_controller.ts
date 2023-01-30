import express from "express"
import extractJWT from "../middlewares/extractJWT";
import purchase_request_service from "../services/purchase_request_service";

const router = express.Router();
/**
 * get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,purchase_request_service.getPurchaseRequests)
/**
 * get by id contraller
 */
router.get("/:id",extractJWT,purchase_request_service.getPurchaseRequestById)
/**
 * save contraller
 */
router.post("/",purchase_request_service.createPurchaseRequest)
/**
 * update contraller
 */
router.put("/:id",purchase_request_service.updatePurchaseRequest)
/**
 * delete contraller
 */
router.delete("/:id",extractJWT,purchase_request_service.deletePurchaseRequest)


export = router