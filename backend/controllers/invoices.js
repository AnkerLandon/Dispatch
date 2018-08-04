const Invoice = require("../models/invoice");
const Request = require("../models/request");
const Customer = require("../models/customer");
const Price = require("../models/price");
const Bill = require("../models/bill")


function calculatePrices(animal, number, custId, otherPrice, otherTaxable,  callback) {

  var result = {plan: 0, fee: 0, Rtax: 0, Itax: 0, id: '', route: ''};

  Promise.all([
    Customer.findOne({_id: custId}),
    Price.findOne({}).sort({$natural:-1})
  ])
  .then(([custResult, priceResult]) => {

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
      return callback(null, result);
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
    callback(null, result);
  })
  .catch(err => {
    console.log('calc prices err:', err);
    return callback(new Error('Price Calculation Error'));

  });

}

function createBill(invoice, callback) {
  let bill = new Bill ({
    accountId: invoice.accountId,
    invoiceId: invoice._id,
    createdDate: invoice.date,
    amountDue: invoice.tax + invoice.pickupFee + invoice.requests[0].price,
    billType:  "invoice"
  });
  bill.save()
  .then(result => {
    return callback(null, 'bill success', bill._id);
  })
  .catch(err => {
    return callback(err, 'bill creation failure');
  });

}

function addToBill(invoiceId, amount, callback) {
  Bill.updateOne({invoiceId: invoiceId},
  {$inc: {amountDue: amount}})
  .then(result => {
    return callback(null, "Add to existing bill success");
  })
  .catch(err => {
    return callback(err, "Add to existing bill Failure");
  })
}

function editBill(invoiceId, callback) {
  let total = 0;
  Invoice.findOne({_id: invoiceId})
  .then(result => {
    for ( i = 0; i < result.requests.length; i++) {
      total += result.requests[i].price + result.requests[i].tax;
    }
    total += result.tax + result.pickupFee;
  })
  .then(result => {
    Bill.updateOne({invoiceId: invoiceId},
    {$set: {amountDue: total}})
    .then(billresult => {
      return callback(null, "Bill edit Success");
    })
    .catch(err => {
      console.log('Editbill result err:', err);
      return callback(err, "Bill edit Failure");
    })
  })
  .catch(err => {
    console.log("edit bill err:", err);
    return callback(err, "Bill edit error: unable to find invoice");
  })
}

exports.getInvoices = (req, res, next) => {
  Invoice.find({accountId: req.params.id})
    .then(documents => {
      res.status(200).json({documents});
    })
    .catch(err => {
      res.status(500).json({err: err, message: 'Id Not Found'});
    });
}

exports.getRouteInvoices = (req, res, next) => {
  Invoice.find({
    route: req.params.route,
    'requests.complete': false
  }).then(documents => {
    res.status(200).json({documents});
  }).catch(err => {
    console.log("get Route Invoices Err: ",err);
    res.status(500).json({err: err, message: "Error Retreiving Invoices for Route"})
  });
}

exports.createInvoice = (req, res, next) => {
  calculatePrices(
    req.body.animal,
    req.body.number,
    req.body.accountId,
    req.body.price,
    req.body.taxable,
    function (err, prices) {

      if (err) { return res.status(500).json({message: 'Calculated Price Error'}); }

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

      createBill(invoice, function(err, billMessage, billId) {
        if (err) { return res.status(500).json({message: billMessage}); }

        invoice.billId = billId;

        invoice.save()
        .then(invResult => {
          res.status(201).json({
            message: billMessage + "Invoice Success",
            newInvoice: invoice
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            message: billMessage + "Invcoice Creation Failure"
          });
        });
      });
    });
}

exports.addRequest = (req, res, next) => {
  calculatePrices(
    req.body.animal,
    req.body.number,
    req.body.accountId,
    req.body.price,
    req.body.taxable,
    function (err, prices) {
      if (err) { return res.status(500).json({message: 'Calculated Price Error'}); }
      var newRequest = new Request ({
        number: req.body.number,
        animal: req.body.animal,
        other: req.body.other,
        complete: req.body.complete,
        price: prices.fee,
        tax: prices.Rtax,
        priceId: prices.id
      });

      addToBill(req.params.id, newRequest.price + newRequest.tax, function(err, ATBMessage) {
        if (err) { return res.status(500).json({message: ATBMessage}); }
        Invoice.updateOne(
        { _id: req.params.id },
        { $push: { requests: newRequest } })
        .then(results => {
          res.status(200).json({ message: ATBMessage + " Add Request Success" , request: newRequest});
        })
        .catch(err => {
          console.log("add request Error: ",err);
          res.status(500).json({err: err, message: ATBMessage + " Adding Request Failure"})
        });
      });
    });
}

exports.editRequest = (req, res, next) => {
  calculatePrices(
    req.body.animal,
    req.body.number,
    req.body.accountId,
    req.body.price,
    req.body.taxable,
    function (err, prices) {
      var editedRequest = new Request ({
        number: req.body.number,
        animal: req.body.animal,
        other: req.body.other,
        complete: false,
        price: prices.fee,
        tax: prices.Rtax,
        priceId: prices.id
      });


      Invoice.updateOne(
        {_id: req.params.id, "requests._id": req.body._id },
        {$set: {"requests.$": editedRequest}})
      .exec()
      .then(result => {
        if (result.nModified === 1) {
          editBill(req.params.id, function(err, BillMessage) {
            if (err) { return res.status(500).json({message: BillMessage}); }
            res.status(200).json({message: BillMessage + " Request Update Success"})
          });
        } else {
          res.status(500).json({message: 'no changes detected'});
        }
      })
      .catch(err => {
        console.log('Request Update Err: ',err);
        res.status(500).json({message: BillMessage + " Request Update Failure"})
      });
    });
}

exports.driverUpdate = (req, res, next) => {
  Invoice.updateOne(
    {_id: req.params.id, "requests._id": req.body.requestId },
    {$set: {"requests.$.complete": req.body.checked}}
  )
  .exec()
  .then(result => {
    res.status(200).json({message: "Driver Update Success"})
  })
  .catch(err => {
    console.log("driver Update err: ",err);
    res.status(500).json({err: err, message: "Failed To Update Account"})
  });
}

exports.deleteInvoice = (req, res, next) => {
  Invoice.updateOne(
    { _id: req.params.invId },
    { $pull: { requests : { _id : req.params.reqId} } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
      res.status(200).json({message: "deleted request"});
    });
}

exports.deleteAllInvoicesForCustomer = (req, res, next) => {
  Invoice.deleteMany({accountId: req.params.accountId})
  .exec()
    .then(result => {
      res.status(200).json({message: "deleted all invoices pertaining to customer"})
    })
    .catch(err => {
      console.log("Error Deleting All Invoices");
      res.status(500).json({
        error: err,
        message: "Could not Delete All Invoices for Customer"
      })
    });

}

