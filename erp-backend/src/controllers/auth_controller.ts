"use strict";
import express from "express"
import extractJWT from "../middlewares/extractJWT";
const router = express.Router();
import auth_service from "../services/auth_service";

/**
 * auth test contraller
 */
router.get("/",auth_service.test)
/***
 * validate contraller
 */
router.get("/validate", extractJWT,auth_service.validateToken);
/**
 * register contraller
 */
router.post("/register",auth_service.register);
/**
 * Login contraller
 */
router.post("/login",auth_service.login);

/**
 *  get-all-users contraller
 */
router.get("/get-all-users",extractJWT, auth_service.getAllUsers);

export = router