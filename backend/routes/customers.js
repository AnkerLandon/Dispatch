const express = require("express");
const Customer = require("../models/customer");
const Invoice = require("../models/invoice");
var mongoose = require('mongoose');


const mongo = require('mongodb');

const router = express.Router();
ObjectID = mongo.ObjectID;

router.post("/new", (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    payment: req.body.payment
  });
  customer.save().then(result => {
    res.status(201).json({
      message: 'success',
      custId: result._id
    });
  });

});

router.get("",(req, res, next) => {
  Customer.find().then(documents => {
    res.status(200).json({documents});
  });

});

router.delete("/:id", (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});



router.put("/:id",(req, res, next) => {
  const cust = new Customer ({
    _id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    payment: req.body.payment
  });
  Customer.updateOne({_id: req.params.id}, cust)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "update success"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;
