const express = require("express");
const checkAuth = require('../Middleware/check-auth-admin');
const PriceController = require('../controllers/prices');

const router = express.Router();

router.get("", checkAuth, PriceController.getPrices);

router.post("/new", checkAuth, PriceController.createPrice);

module.exports = router;
