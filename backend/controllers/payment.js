const Bill = require('../models/bill');
const Payment = require('../models/payments');

exports.getPayment = (req, res, next) => {
  Bill
    .find({accountId: req.params.AId})
    .exec()
    .then(documents => {
      res.status(200).json({documents})
    })
    .catch(err => {
      console.log("Get Payment Error: ", err);
      res.status(500).json({
        error: err,
        message: "Error Retrieving Bills"
      })
    });
}

exports.createPayment = (req, res, next) => {
  if(!req.body.createdDate) {
    var d = new Date();
    var datestring = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    req.body.createdDate = datestring;
  }
  const bill = new Bill(req.body);

  bill.save()
  .then(result => {
    res.status(201).json({
      message: 'New bill success',
      payId: result._id
    });
  })
    .catch(err => {
      res.status(500).json({message: "Error Saving Bill"});
    });
}

exports.addPaymentInfo = (req, res, next) => {
  const payment = new Payment(req.body);
  Bill.updateOne(
    {_id: req.params.id},
    { $push: {payments: payment}
  })
  .then(result => {
    res.status(200).json({message: "Add Payment Success", newPayment: payment});
  })
  .catch(err => {
    console.log("add Payment Error: ", err);
    res.status(500).json({message: "Add Payment Error"});
  });
}

exports.editPayment = (req, res, next) => {
  console.log('testese', req.body, req.params.BId, req.params.PId);
  const payment = new Payment(req.body);
  Bill.updateOne(
    {_id: req.params.BId, "payments._id": req.params.PId},
    {$set: {"payments.$": payment}}
  )
  .then(result => {
    console.log(result);
    res.status(200).json({message: "Payment Update Success"});
  })
  .catch(err => {
    console.log("editPaymentError: ", err);
    res.status(500).json({message: "Payment Update Error"});
  });
}


