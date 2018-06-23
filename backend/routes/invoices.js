const express = require("express");
const Invoice = require("../models/invoice");
const Request = require("../models/request");


const router = express.Router();

router.post("", (req, res, next) => {

  var request = new Request({
    number: req.body.number,
    animal: req.body.animal,
    other: req.body.other,
    complete: false,
    price: 0
  });

  var d = new Date();
  var datestring = (d.getMonth()+1) + "-" + d.getDate() + "-" + d.getFullYear();

  var invoice = new Invoice({
    accountId: req.body.accountId,
    date: datestring,
    requests: [],
    total: 0
  });

  invoice.requests.push(request);

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

router.put("/:id",(req, res, next) => {

  var newRequest = new Request ({
    number: req.body.number,
    animal: req.body.animal,
    other: req.body.other,
    complete: false,
    price: 0
  });
  // console.log(newRequest);
  Invoice.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { requests: newRequest } })
    .then(result => {
      res.status(200).json({ message: "Update successful!" , data: newRequest});
  });

});

router.get("/:id",(req, res, next) => {
  Invoice.find({accountId: req.params.id}).then(documents => {
    res.status(200).json({documents});
  });

});

router.delete("/destroy/:accountId", (req, res, next) => {
  Invoice.deleteMany({accountId: req.params.accountId})
  .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({message: "deleted all invoices pertaining to customer"})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });

});

module.exports = router;
