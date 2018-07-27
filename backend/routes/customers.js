const CustomerController = require('../controllers/customer');
const express = require("express");
const checkAuth = require('../Middleware/check-auth-admin');


const mongo = require('mongodb');

const router = express.Router();
ObjectID = mongo.ObjectID;

router.post("/new", checkAuth, CustomerController.createCustomer);

router.get("", CustomerController.getCustomers);

router.get("/:id", CustomerController.getCustomer);

router.delete("/:id", checkAuth, CustomerController.deleteCustomer);

router.put("/details/:id",checkAuth, CustomerController.editCustomer);

router.put("/addend/:id",checkAuth, CustomerController.addEndDate);

router.put("/addpaymentplan/:id",checkAuth, CustomerController.addPaymentPlan);

module.exports = router;
