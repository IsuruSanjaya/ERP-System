import express from "express"
import extractJWT from "../middlewares/extractJWT";
import delivery_order_service from "../services/delivery_order_service";

const router = express.Router();

/**
 * get contraller
 */
router.get("/:id/:offset/:page",extractJWT,delivery_order_service.getDeliveryOrders)
/**
 * get by id contraller
 */
router.get("/:id",extractJWT,delivery_order_service.getDeliveryOrderById)
/**
 *  save contraller
 */
router.post("/create-delivery-order",delivery_order_service.createDeliveryOrder)
/**
 * update contraller
 */
router.put("/update-delivery-order/:id",delivery_order_service.updateDeliveryOrder)
/**
 *  delete contraller
 */
router.delete("/delete-delivery-order/:id",extractJWT,delivery_order_service.deleteDeliveryOrder)


export = router   