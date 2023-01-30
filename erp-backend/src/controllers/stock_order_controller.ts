import express from "express"
import extractJWT from "../middlewares/extractJWT";
import stock_order_service from "../services/stock_order_service";

const router = express.Router();
/**
 * get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,stock_order_service.getStockOrders)
/**
 * get by id contraller
 */
router.get("/:id",extractJWT,stock_order_service.getStockOrderById)
/**
 *  save contraller
 */
router.post("/",stock_order_service.createStockOrder)
/**
 * update contraller
 */
router.put("/:id",stock_order_service.updateStockOrder)
/**
 * delete contraller
 */
router.delete("/:id",extractJWT,stock_order_service.deleteStockOrder)


export = router