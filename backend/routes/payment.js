const express = require("express");
const checkAuth = require('../Middleware/check-auth-admin');
const PaymentController = require('../controllers/payment');

const router = express.Router();

router.get("/get/:AId",checkAuth, PaymentController.getPayment);

router.post("/new", checkAuth, PaymentController.createPayment);

router.put("/addPayment/:id", checkAuth, PaymentController.addPaymentInfo);

router.put("/edit/:BId/:PId", checkAuth, PaymentController.editPayment);

module.exports = router;
