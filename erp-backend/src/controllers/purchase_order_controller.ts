import express from "express"
import extractJWT from "../middlewares/extractJWT";
import purchase_order_service from "../services/purchase_order_service";

const router = express.Router();
/**
 * get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,purchase_order_service.getPurchaseOrders)
/**
 *  get by id contraller
 */
router.get("/:id",extractJWT,purchase_order_service.getPurchaseOrderById)
/**
 * save contraller
 */
router.post("/create-purchase-order",purchase_order_service.createPurchaseOrder)
/**
 * update contraller
 */
router.put("/update-purchase-order/:id",purchase_order_service.updatePurchaseOrder)
/**
 * delete contraller
 */
router.delete("/delete-purchase-order/:id",extractJWT,purchase_order_service.deletePurchaseOrder)


export = router