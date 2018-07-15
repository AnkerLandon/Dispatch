const express = require("express");
const Invoice = require("../models/invoice");
const Request = require("../models/request");
const Customer = require("../models/customer");
const Price = require("../models/price");
const Fee = require("../models/fee");


const router = express.Router();

function calculatePrices(animal, number, custId, otherPrice, otherTaxable,  callback) {

  var result = {plan: 0, fee: 0, Rtax: 0, Itax: 0, id: '', route: ''};

  Promise.all([
    Customer.findOne({_id: custId}),
    Price.findOne({}).sort({$natural:-1})
  ])
  .then(([custResult, priceResult]) => {
    console.log('calc results', custResult, priceResult);

    result.id = priceResult._id;
    result.route = custResult.route;

    if (custResult.currentPlan.toLowerCase() === 'cash') {
      result.plan = priceResult.pickup;
      result.Itax = ((priceResult.tax / 100) * result.plan).toFixed(2);
    }

    if (animal.toLowerCase() === 'other') {
      result.fee = otherPrice;
      if (otherTaxable) {
        result.Itax = ((priceResult.tax / 100) * otherPrice).toFixed(2);
      }
      console.log('results', result);
      callback(null, result);
    }

    for( let i = 0; i < priceResult.fees.length; i++) {
      const myFee = priceResult.fees[i];
      if (myFee.animal === animal) {
        if (myFee.appliesToo.toLowerCase() === custResult.currentPlan.toLowerCase() || myFee.appliesToo.toLowerCase() === 'both') {
          result.fee = myFee.feeAmount * number;

        }
        if (myFee.taxable) {
          result.Rtax += ((priceResult.tax / 100) * result.fee).toFixed(2);
        }
      }
    }
    console.log('results', result);
    callback(null, result);
  })
  .catch(err => {
    console.log('calc error', err);
    return callback(new Error('fuck'));
  });

}

router.post("", (req, res, next) => {
  calculatePrices(req.body.animal, req.body.number, req.body.accountId, req.body.price, req.body.taxable, function (err, prices) {
    console.log('test price', prices);
    var request = new Request({
      number: req.body.number,
      animal: req.body.animal,
      other: req.body.other,
      complete: false,
      price: prices.fee,
      tax: prices.Rtax,
      priceId: prices.id
    });
    var d = new Date();
    var datestring = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();

    var invoice = new Invoice({
      accountId: req.body.accountId,
      date: datestring,
      requests: [],
      pickupFee: prices.plan,
      tax: prices.Itax,
      route: prices.route
    });
    invoice.requests.push(request);

    invoice.save()
    .then(invResult => {
      console.log('test result', invResult);
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


});

router.put("/:id",(req, res, next) => {
  calculatePrices(
    req.body.animal,
    req.body.number,
    req.body.accountId,
    req.body.price,
    req.body.taxable,
    function (err, prices) {
      var newRequest = new Request ({
        number: req.body.number,
        animal: req.body.animal,
        other: req.body.other,
        complete: false,
        price: prices.fee,
        tax: prices.Rtax,
        priceId: prices.id
      });
      console.log('add',req.body);
        Invoice.updateOne(
        { _id: req.params.id },
        { $push: { requests: newRequest } })
        .then(results => {
          console.log('Total Updated', results);
          res.status(200).json({ message: "Update successful!" , request: newRequest});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({message: err})
        });
    });

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

router.get("/route/:route",(req, res, next) => {
  console.log('get route', req.params.route);
  Invoice.find({
    route: req.params.route,
    'requests.complete': false}).then(documents => {
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
