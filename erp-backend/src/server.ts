"use strict";
import express from "express"
import http from "http"
import mongoose from "mongoose"
import Logging from "./library/Loggin"
const cors = require("cors");
const router = express()
router.use(cors());
/**constorllers */
const authController = require("./controllers/auth_controller")
const deliveryControoler = require("./controllers/delivery_order_controller")
const registeredUserController = require("./controllers/registered_user_controller")
const companyController = require("./controllers/company_controller")
const salesOrder = require("./controllers/sales_order_controller")
const purchaseRequestController = require("./controllers/purchase_request_controller")
const purchaseOrderController = require("./controllers/purchase_order_controller")
const customerController = require("./controllers/customer_controller")
const itemController = require("./controllers/item_controller")
const stockOrder = require("./controllers/stock_order_controller")
const employeeController =  require("./controllers/employee_controller")
const purchaseRequestOrderController = require("./controllers/purchase_request_order_controller")
// 
//const db_url = "mongodb+srv://root:root123@cluster0.axvyf.mongodb.net/test"
const db_url = "mongodb://db-itp:u9i7EW85Ez9N2fZRFvHOXTZG8B5jbX5zzMrAcM0ciTYbU11fKVXbOHKiVZzkiQr54Qe8X4XdPqwlDPekPANqFw==@db-itp.mongo.cosmos.azure.com:10255/erp_2022?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@db-itp@";
const port = 5000
/* Connect to Mongo */
mongoose.connect(db_url)
   .then(() => {
      Logging.info('Mongo connected successfully.');
      StartServer();
   })
   .catch(err => {
      Logging.error(err)
   })


/** Onli start if the server if Mongo connects  */

const StartServer = () => {
   router.use((req, res, next) => {
      /** Log the request */
      Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
         /** Log the res */
         Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
      });

      next(); /**allow to pass through the middleware to next tasks */
   })

   router.use(express.urlencoded({ extended: true }));
   router.use(express.json());

   /** Rules of our API */
   router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
      }

      next();
   });

   /** Routes */
   router.use("/auth",authController)
   router.use("/delivery-order",deliveryControoler)
   router.use("/registered-user",registeredUserController)
   router.use("/company",companyController)
   router.use("/sales-order",salesOrder)
   router.use("/purchase-request",purchaseRequestController)
   router.use("/purchase-order",purchaseOrderController)
   router.use("/customer",customerController)
   router.use("/item-controller",itemController);
   router.use("/stock-order-controller",stockOrder);
   router.use("/employee-controller",employeeController)
   router.use("/purchase-request-order-controller",purchaseRequestOrderController)

   /** Healthcheck */
   router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

   /** Error handling */
   router.use((req, res, next) => {
      const error = new Error('Not found');

      Logging.error(error);

      res.status(404).json({
         message: error.message
      });
   });

  // http.createServer(router).listen(5000, () => Logging.info(`Server is running on port ${5000}`));
  router.set("port", process.env.PORT || 3000);

  router.listen(process.env.PORT,()=>{
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
}