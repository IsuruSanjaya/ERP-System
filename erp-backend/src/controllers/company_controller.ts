import express from "express"
import extractJWT from "../middlewares/extractJWT";
import company_service from "../services/company_service";

const router = express.Router();

/**
 * get by id contraller
 */
router.get("/:id",extractJWT,company_service.getRegisteredcompany)

/**
 * save contraller
 */
router.post("/",extractJWT,company_service.createRegisteredcompany)

/**
 * update contraller
 */
router.put("/:id",extractJWT,company_service.updateRegisteredcompany)

/**
 * dlete contraller
 */
router.delete("/:id",extractJWT,company_service.deleteRegisteredcompany)


export = router