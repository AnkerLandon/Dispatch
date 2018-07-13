const express = require("express");
const Invoice = require("../models/invoice");
var mongoose = require('mongoose');
const checkAuth = require('../Middleware/check-auth-admin');
const Payment = require('../models/payment');


const mongo = require('mongodb');

const router = express.Router();
ObjectID = mongo.ObjectID;

router.get("/get/:AId",(req, res, next) => {

  Payment
    .find({accountId: req.params.AId})
    .exec()
    .then(documents => {
      console.log(documents);
      res.status(200).json({documents})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });

});

router.post("/new", (req, res, next) => {
  console.log('server data', req.body);
  const payment = new Payment(req.body);

  payment.save().then(result => {
    res.status(201).json({
      message: 'success',
      payId: result._id
    });
  });

});

module.exports = router;
