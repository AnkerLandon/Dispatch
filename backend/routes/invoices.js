const express = require("express");
const Invoice = require("../models/invoice");
const Request = require("../models/request");


const router = express.Router();

router.post("", (req, res, next) => {

  const request = new Request({
    number: req.body.number,
    animal: req.body.animal,
    other: req.body.other,
    complete: false,
    price: 0
  });

  var d = new Date();
  var datestring = (d.getMonth()+1) + "-" + d.getDate() + "-" + d.getFullYear();

  const invoice = new Invoice({
    accountId: req.body.accountId,
    date: datestring,
    requests: [request],
    total: 0
  });

  /*
  if(invoice.requests){
    for(item in invoice.requests) {
      invoice.total += item.price;
    }
  }
  */
  invoice.save().then(result => {
    res.status(201).json({
      message: 'success',
      newInvoice: invoice
    });
  });

});

router.get("/:id",(req, res, next) => {
  Invoice.find({accountId: req.params.id}).then(documents => {
    res.status(200).json({documents});
  });

});

router.delete("/:id", (req, res, next) => {
  Invoice.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: "post deleted"});
});

module.exports = router;