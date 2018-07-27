const Invoice = require("../models/invoice");
const Request = require("../models/request");


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
    console.log('results', result);
    callback(null, result);
  })
  .catch(err => {
    console.log('calc error', err);
    return callback(new Error('fuck'));
  });

}

function createBill(invoice) {
  try{
    console.log('init: ');
    let bill = new Bill ({
      accountId: invoice.accountId,
      invoiceId: invoice._id,
      createdDate: invoice.date,
      amountDue: invoice.tax + invoice.pickupFee + invoice.requests[0].price,
      billType:  "invoice"
    });
    console.log('flag 2');
    bill.save()
    .then(result => {
      console.log('bill result: ', result);
      return;
    })
    .catch(err => {
      console.log('Bill Error', err);
      return;
    });
  }
  catch(err) {
    console.log('fuck', err);
    return;
  }

}

function addToBill(invoiceId, amount) {
  Bill.updateOne({invoiceId: invoiceId},
  {$inc: {amountDue: amount}})
  .then(result => {
    console.log('add bill success:', result);
    return;
  })
  .catch(err => {
    console.log("add bill err:", err);
    return;
  })
}

function editBill(invoiceId) {
  let total = 0;
  Invoice.findOne({_id: invoiceId})
  .then(result => {
    console.log('edit bill success:', result);
    for ( i = 0; i < result.requests.length; i++) {
      total += result.requests[i].price + result.requests[i].tax;
    }
    total += result.tax + result.pickupFee;
    Bill.updateOne({invoiceId: invoiceId},
    {$set: {amountDue: total}})
    .then(billresult => {
      console.log('bill result: ', billresult);
      return;
    })
    .catch(err => {
      console.log('bill result err', err);
      return;
    })
  })
  .catch(err => {
    console.log("edit bill err:", err);
    return;
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
  console.log('get route', req.params.route);
  Invoice.find({
    route: req.params.route,
    'requests.complete': false
  }).then(documents => {
    console.log('num', documents.length);
    res.status(200).json({documents});
  }).catch(err => {
    console.log(err);
    res.status(500).json({message: err})
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
      createBill(invResult);
      console.log(' bill shiit');
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


}

exports.addRequest = (req, res, next) => {
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
        complete: req.body.complete,
        price: prices.fee,
        tax: prices.Rtax,
        priceId: prices.id
      });
      console.log('add',req.body);
      addToBill(req.params.id, newRequest.price + newRequest.tax);
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
}

exports.editRequest = (req, res, next) => {
  console.log('server', req.body, req.params.id, req.params.index);
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
        console.log('success',result);
        editBill(req.params.id);
        res.status(200).json({message: "update success"})
      })
      .catch(err => {
        console.log('err',err);
        res.status(500).json({message: "Update Failure"})
      });
    });
}

exports.driverUpdate = (req, res, next) => {
  console.log('server', req.body, req.params.id, req.params.index);
  Invoice.updateOne(
    {_id: req.params.id, "requests._id": req.body.requestId },
    {$set: {"requests.$.complete": req.body.checked}}
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
}

exports.deleteInvoice = (req, res, next) => {
  console.log('server',req.params.invId , req.params.reqId);
  Invoice.updateOne(
    { _id: req.params.invId },
    { $pull: { requests : { _id : req.params.reqId} } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
     console.log(obj);
      res.status(200).json({message: "deleted request"});
    });
}

exports.deleteAllInvoicesForCustomer = (req, res, next) => {
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

}

