import express from "express"
import extractJWT from "../middlewares/extractJWT";
import employee_service from "../services/employee_service";

const router = express.Router();
/**
 *  get all contraller
 */
router.get("/:id/:offset/:page",extractJWT,employee_service.getemployees)
/**
 *  get by id contraller
 */
router.get("/:id",extractJWT,employee_service.getemployeeById)
/**
 * save contraller
 */
router.post("/create-employee",employee_service.createemployee)
/**
 * update contraller
 */
router.put("/update-employee/:id",employee_service.updateemployee)
/**
 * delete contraller
 */
router.delete("/delete-employee/:id",extractJWT,employee_service.deleteemployee )


export = router   