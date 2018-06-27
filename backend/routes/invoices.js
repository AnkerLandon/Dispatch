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
  invoice.save()
  .then(result => {
    res.status(201).json({
      message: 'success',
      newInvoice: invoice
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
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
   console.log('add',req.body);
  Invoice.updateOne(
    { _id: req.params.id },
    { $push: { requests: newRequest } })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" , data: newRequest});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: err})
    });;

});

router.put("/request/:id",(req, res, next) => {
  console.log('server', req.body, req.params.id, req.params.index);
  Invoice.updateOne(
    {_id: req.params.id, "requests._id": req.body._id },
    {$set: {"requests.$": req.body}}
  )
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({message: "update success"})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err})
  });
});

router.get("/:id",(req, res, next) => {
  Invoice.find({accountId: req.params.id}).then(documents => {
    res.status(200).json({documents});
  });

});

router.delete("/:invId/:reqId", (req, res, next) => {
  console.log('server',req.params.invId , req.params.reqId);
  Invoice.updateOne(
    { _id: req.params.invId },
    { $pull: { requests : { _id : req.params.reqId} } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
     console.log(obj);
      res.status(200).json({message: "deleted request"});
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
