const express = require("express");
const Invoice = require("../models/invoice");
var mongoose = require('mongoose');
const checkAuth = require('../Middleware/check-auth-admin');
const Payment = require('../models/payment');


const mongo = require('mongodb');

const router = express.Router();
ObjectID = mongo.ObjectID;

router.get("/get/:AId",checkAuth,(req, res, next) => {

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

router.post("/new", checkAuth,(req, res, next) => {
  console.log('server data', req.body);
  const payment = new Payment(req.body);

  payment.save().then(result => {
    res.status(201).json({
      message: 'success',
      payId: result._id
    });
  });

});

router.put("/addPayment/:id", checkAuth,(req, res, next) => {
  console.log('payment data', req.body, req.params.id);
  Payment.updateOne(
    {invoiceId: req.params.id},
    { $set: {
      paymentType: req.body.type,
      paymentAmount: req.body.amount,
      checkNumber: req.body.number
      }
    }
  )
  .then(result => {
    console.log('result:',result);
  })
  .catch(err => {
    console.log('err', err);
  });
});

module.exports = router;
