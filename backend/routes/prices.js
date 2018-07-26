const express = require("express");
const mongo = require('mongodb');
const Price = require("../models/price");
const checkAuth = require('../Middleware/check-auth-admin');

const router = express.Router();

router.get("", checkAuth,(req, res, next) => {
  Price.find().then(documents => {
    res.status(200).json({documents});
  });

});

router.post("/new", checkAuth,(req, res, next) => {
  console.log(req.body);
  let price = new Price (req.body);
  var d = new Date();
  price.date = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  price.save().then(result => {
    res.status(201).json({
      message: 'success',
      priceId: result._id
    });
  });

});

module.exports = router;
