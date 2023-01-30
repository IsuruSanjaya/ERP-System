import express from "express"
import extractJWT from "../middlewares/extractJWT";
import purchase_request_order_service from "../services/purchase_request_order_service";

const router = express.Router();
/**
 * get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,purchase_request_order_service.getPurchaseRequests)
/**
 * get by id contraller
 */
router.get("/:id",extractJWT,purchase_request_order_service.getPurchaseRequestById)
/**
 *  save contraller
 */
router.post("/create-purchase-request-order",purchase_request_order_service.createPurchaseRequest)
/**
 * update contraller
 */
router.put("/update-purchase-request-order/:id",purchase_request_order_service.updatePurchaseRequest)
/**
 * delete contraller
 */
router.delete("/delete-purchase-request-order/:id",extractJWT,purchase_request_order_service.deletePurchaseRequest)


export = router