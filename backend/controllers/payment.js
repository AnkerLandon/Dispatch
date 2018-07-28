const Payment = require('../models/payment');

exports.getPayment = (req, res, next) => {
  Payment
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
  const payment = new Payment(req.body);

  payment.save().then(result => {
    res.status(201).json({
      message: 'success',
      payId: result._id
    })
    .catch(err => {
      res.status(500).json({message: "Error Saving Bill"});
    });
  });
}

exports.addPaymentInfo = (req, res, next) => {
  Payment.updateOne(
    {invoiceId: req.params.id},
    { $set: {
      paymentType: req.body.type,
      paymentAmount: req.body.amount,
      checkNumber: req.body.number
    }
  })
  .then(result => {
    res.status(200).json({message: "Add Payment Success"});
  })
  .catch(err => {
    console.log("add Payment Error: ", err);
    res.status(500).json({message: "Add Payment Error"});
  });
}

