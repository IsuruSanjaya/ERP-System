import express from "express"
import extractJWT from "../middlewares/extractJWT";
import customer_service from "../services/customer_service";

const router = express.Router();
/**
 * get contraller 
 */
router.get("/:id/:offset/:page",extractJWT,customer_service.getcustomers)
/**
 *  get by id contraller
 */
router.get("/:id",extractJWT,customer_service.getcustomerById)
/**
 *  save contraller
 */
router.post("/create-customer",customer_service.createcustomer)
/**
 *  update contraller
 */
router.put("/update-customer/:id",customer_service.updatecustomer)
/**
 * delete contraller
 */
router.delete("/delete-customer/:id",extractJWT,customer_service.deletecustomer )


export = router   