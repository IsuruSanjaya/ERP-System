import express from "express"
import extractJWT from "../middlewares/extractJWT";
import sales_order_service from "../services/sales_order_service";

const router = express.Router();
/**
 * get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,sales_order_service.getSalesOrders)
/**
 * get by id contraller
 */
router.get("/:id",extractJWT,sales_order_service.getSalesOrderById)
/**
 * save contraller
 */
router.post("/create-sales-order",sales_order_service.createSalesOrder)
/**
 *  update contraller
 */
router.put("/update-sales-order/:id",sales_order_service.updateSalesOrder)
/**
 *  delete contraller
 */
router.delete("/delete-sales-order/:id",extractJWT,sales_order_service.deleteSalesOrder)


export = router