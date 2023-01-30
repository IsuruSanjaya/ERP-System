import express from "express"
import extractJWT from "../middlewares/extractJWT";
import item_service from "../services/item_service";

const router = express.Router();
/**
 * get by all contraller
 */
router.get("/:id/:offset/:page",extractJWT,item_service.getitems)
/**
 *  get by id contraller
 */
router.get("/:id",extractJWT,item_service.getitemById)
/**
 *  save item contraller
 */
router.post("/",item_service.createitem)
/**
 *  update item contraller
 */
router.put("/:id",item_service.updateitem)
/**
 * delete item contraller
 */
router.delete("/:id",extractJWT,item_service.deleteitem)


export = router