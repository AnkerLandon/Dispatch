const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();

router.post("", (req, res, next) => {
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
  Customer.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: "post deleted"});
});

module.exports = router;
