import express from "express"
import extractJWT from "../middlewares/extractJWT"
import registered_user_service from "../services/registered_user_service"

const router = express.Router()
/**
 * get by Id contraller
 */
router.get("/:id", extractJWT, registered_user_service.getRegisteredUser)
/**
 *  save contraller
 */
router.post("/", extractJWT, registered_user_service.createRegisteredUser)
/**
 * update contraller
 */
router.put("/:id", extractJWT, registered_user_service.updateRegisteredUser)
/**
 * delete contraller
 */
router.delete("/:id", extractJWT, registered_user_service.updateRegisteredUser)

export = router